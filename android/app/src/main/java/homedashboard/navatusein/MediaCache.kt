package homedashboard.navatusein

import android.content.Context
import androidx.media3.common.util.UnstableApi
import androidx.media3.database.StandaloneDatabaseProvider
import androidx.media3.datasource.cache.LeastRecentlyUsedCacheEvictor
import androidx.media3.datasource.cache.SimpleCache
import java.io.File

@UnstableApi
object MediaCache {
    private const val MAX_SIZE = 1024L * 1024 * 1024

    private var cache: SimpleCache? = null

    @Synchronized
    fun get(context: Context) = cache ?: SimpleCache(
        File(context.cacheDir, "media"),
        LeastRecentlyUsedCacheEvictor(MAX_SIZE),
        StandaloneDatabaseProvider(context)
    ).also { cache = it }
}
