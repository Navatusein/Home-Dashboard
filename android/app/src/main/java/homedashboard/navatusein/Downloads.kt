package homedashboard.navatusein

import android.content.Context
import android.net.Uri
import androidx.media3.common.util.UnstableApi
import androidx.media3.datasource.DefaultHttpDataSource
import androidx.media3.datasource.cache.NoOpCacheEvictor
import androidx.media3.datasource.cache.SimpleCache
import androidx.media3.exoplayer.offline.Download
import androidx.media3.exoplayer.offline.DownloadManager
import androidx.media3.exoplayer.offline.DownloadRequest
import androidx.media3.exoplayer.offline.DownloadService
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.net.URL
import java.security.MessageDigest
import java.util.concurrent.Executors

@UnstableApi
object Downloads {
    private const val PARALLEL_DOWNLOADS = 2

    private var cache: SimpleCache? = null
    private var manager: DownloadManager? = null

    @Synchronized
    fun cache(context: Context) = cache ?: SimpleCache(
        File(context.filesDir, "downloads"),
        NoOpCacheEvictor(),
        MediaCache.database(context)
    ).also { cache = it }

    @Synchronized
    fun manager(context: Context) = manager ?: DownloadManager(
        context.applicationContext,
        MediaCache.database(context),
        cache(context),
        DefaultHttpDataSource.Factory(),
        Executors.newFixedThreadPool(PARALLEL_DOWNLOADS)
    ).also {
        it.maxParallelDownloads = PARALLEL_DOWNLOADS
        manager = it
    }

    fun completed(context: Context, id: String) =
        manager(context).downloadIndex.getDownload(id)?.takeIf { it.state == Download.STATE_COMPLETED }

    fun states(context: Context): Map<String, Int> {
        val states = mutableMapOf<String, Int>()

        manager(context).downloadIndex.getDownloads().use { cursor ->
            while (cursor.moveToNext())
                states[cursor.download.request.id] = cursor.download.state
        }

        return states
    }

    @Synchronized
    fun collections(context: Context): List<JSONObject> {
        val file = collectionsFile(context)

        if (!file.exists())
            return emptyList()

        val array = JSONArray(file.readText())
        return (0 until array.length()).map { array.getJSONObject(it) }
    }

    @Synchronized
    fun save(context: Context, id: String, name: String?, tracks: List<JSONObject>) {
        val navidrome = Navidrome(context)
        val collections = collections(context)
        val previous = collections.find { it.getString("id") == id }
        val states = states(context)

        val requests = tracks
            .map { it.getString("id") }
            .filter { states[it] != Download.STATE_COMPLETED }
            .map { trackId ->
                val uri = navidrome.streamUri(trackId) ?: throw IllegalStateException("Navidrome is not configured")

                DownloadRequest.Builder(trackId, uri)
                    .setCustomCacheKey(navidrome.cacheKey(trackId))
                    .build()
            }

        writeCollections(
            context,
            collections.filter { it != previous } + JSONObject().put("id", id).put("name", name).put("tracks", JSONArray(tracks))
        )

        requests.forEach { DownloadService.sendAddDownload(context, DownloadsService::class.java, it, false) }
        previous?.let { removeUnused(context, trackIds(it) - tracks.map { track -> track.getString("id") }.toSet()) }
        tracks.forEach { track -> if (!track.isNull("image")) saveCover(context, track.getString("image")) }
    }

    @Synchronized
    fun remove(context: Context, id: String) {
        val collections = collections(context)
        val removed = collections.find { it.getString("id") == id } ?: return

        writeCollections(context, collections - removed)
        removeUnused(context, trackIds(removed))
    }

    fun cover(context: Context, url: String?): Uri? {
        if (url == null)
            return null

        val file = coverFile(context, url)
        return if (file.exists()) Uri.fromFile(file) else null
    }

    private fun removeUnused(context: Context, ids: Set<String>) {
        val used = collections(context).flatMap { trackIds(it) }.toSet()

        (ids - used).forEach { DownloadService.sendRemoveDownload(context, DownloadsService::class.java, it, false) }
    }

    private fun saveCover(context: Context, url: String) {
        val file = coverFile(context, url)

        if (file.exists())
            return

        try {
            file.parentFile?.mkdirs()
            val temp = File(file.path + ".tmp")
            URL(url).openStream().use { input -> temp.outputStream().use { input.copyTo(it) } }
            temp.renameTo(file)
        }
        catch (_: Exception) {
        }
    }

    private fun trackIds(collection: JSONObject): Set<String> {
        val tracks = collection.getJSONArray("tracks")
        return (0 until tracks.length()).map { tracks.getJSONObject(it).getString("id") }.toSet()
    }

    private fun writeCollections(context: Context, collections: List<JSONObject>) {
        collectionsFile(context).writeText(JSONArray(collections).toString())
    }

    private fun collectionsFile(context: Context) = File(context.filesDir, "downloads.json")

    private fun coverFile(context: Context, url: String): File {
        val hash = MessageDigest.getInstance("MD5").digest(url.toByteArray()).joinToString("") { "%02x".format(it) }
        return File(File(context.filesDir, "covers"), "$hash.jpg")
    }
}
