package homedashboard.navatusein

import android.content.ComponentName
import android.content.Context
import android.media.AudioManager
import android.net.Uri
import android.os.Looper
import androidx.core.content.ContextCompat
import androidx.media3.common.C
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.common.Player
import androidx.media3.session.MediaController
import androidx.media3.session.SessionToken
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import org.json.JSONObject

@CapacitorPlugin(name = "Dashboard")
class DashboardPlugin : Plugin() {
    private var controller: MediaController? = null

    private val listener = object : Player.Listener {
        override fun onEvents(player: Player, events: Player.Events) {
            notifyListeners("playerState", state(player))
        }
    }

    @PluginMethod
    fun getVersion(call: PluginCall) {
        call.resolve(JSObject().put("version", BuildConfig.VERSION_NAME))
    }

    @PluginMethod
    fun getServer(call: PluginCall) {
        val settings = AppSettings(context)

        call.resolve(
            JSObject()
                .put("dashboardUrl", settings.dashboardUrl)
                .put("homeAssistantHost", settings.homeAssistantHost)
        )
    }

    @PluginMethod
    fun saveServer(call: PluginCall) {
        val dashboardUrl = call.getString("dashboardUrl")

        if (dashboardUrl.isNullOrBlank()) {
            call.reject("dashboardUrl is required")
            return
        }

        val settings = AppSettings(context)
        settings.dashboardUrl = dashboardUrl.trim()
        settings.homeAssistantHost = call.getString("homeAssistantHost")?.trim()
        settings.isSetupRequested = false

        call.resolve()
        activity.runOnUiThread { activity.recreate() }
    }

    @PluginMethod
    fun openSetup(call: PluginCall) {
        AppSettings(context).isSetupRequested = true

        call.resolve()
        activity.runOnUiThread { activity.recreate() }
    }

    @PluginMethod
    fun getNavidrome(call: PluginCall) {
        val settings = AppSettings(context)

        call.resolve(
            JSObject()
                .put("url", settings.navidromeUrl)
                .put("username", settings.navidromeUsername)
                .put("quality", settings.navidromeQuality)
                .put("hasPassword", SecretStore(context).has(Navidrome.PASSWORD_KEY))
        )
    }

    @PluginMethod
    fun saveNavidrome(call: PluginCall) {
        val settings = AppSettings(context)
        settings.navidromeUrl = call.getString("url")?.trim()
        settings.navidromeUsername = call.getString("username")?.trim()
        settings.navidromeQuality = call.getString("quality") ?: settings.navidromeQuality

        call.getString("password")?.takeIf { it.isNotEmpty() }?.let { SecretStore(context).set(Navidrome.PASSWORD_KEY, it) }

        call.resolve()
    }

    @PluginMethod
    fun checkNavidrome(call: PluginCall) {
        Thread {
            val error = Navidrome(context).ping()
            call.resolve(JSObject().put("ok", error == null).put("error", error))
        }.start()
    }

    @PluginMethod
    fun play(call: PluginCall) {
        val tracks = call.getArray("tracks")?.toList<JSONObject>()

        if (tracks.isNullOrEmpty()) {
            call.reject("tracks are required")
            return
        }

        val items = tracks.map { track ->
            MediaItem.Builder()
                .setMediaId(track.getString("id"))
                .setMediaMetadata(
                    MediaMetadata.Builder()
                        .setTitle(track.optString("title"))
                        .setArtist(track.optString("artist"))
                        .setArtworkUri(if (track.isNull("image")) null else Uri.parse(track.getString("image")))
                        .build()
                )
                .build()
        }

        withController(call) { player ->
            player.setMediaItems(items, call.getInt("startIndex") ?: 0, 0)
            player.prepare()
            player.play()
            call.resolve()
        }
    }

    @PluginMethod
    fun stop(call: PluginCall) {
        withController(call) { player ->
            player.stop()
            player.clearMediaItems()
            call.resolve()
        }
    }

    @PluginMethod
    fun togglePlay(call: PluginCall) {
        withController(call) { player ->
            if (player.playWhenReady) player.pause() else player.play()
            call.resolve()
        }
    }

    @PluginMethod
    fun next(call: PluginCall) {
        withController(call) { player ->
            player.seekToNext()
            call.resolve()
        }
    }

    @PluginMethod
    fun previous(call: PluginCall) {
        withController(call) { player ->
            player.seekToPrevious()
            call.resolve()
        }
    }

    @PluginMethod
    fun seek(call: PluginCall) {
        val position = call.getDouble("position") ?: return call.reject("position is required")

        withController(call) { player ->
            player.seekTo((position * 1000).toLong())
            call.resolve()
        }
    }

    @PluginMethod
    fun setShuffle(call: PluginCall) {
        withController(call) { player ->
            player.shuffleModeEnabled = call.getBoolean("shuffle") ?: false
            call.resolve()
        }
    }

    @PluginMethod
    fun setRepeat(call: PluginCall) {
        withController(call) { player ->
            player.repeatMode = when (call.getString("repeat")) {
                "one" -> Player.REPEAT_MODE_ONE
                "all" -> Player.REPEAT_MODE_ALL
                else -> Player.REPEAT_MODE_OFF
            }
            call.resolve()
        }
    }

    @PluginMethod
    fun setVolume(call: PluginCall) {
        val volume = call.getInt("volume") ?: return call.reject("volume is required")
        val audio = context.getSystemService(Context.AUDIO_SERVICE) as AudioManager
        val max = audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC)

        audio.setStreamVolume(AudioManager.STREAM_MUSIC, Math.round(volume / 100f * max), 0)

        withController(call) { player ->
            notifyListeners("playerState", state(player))
            call.resolve()
        }
    }

    @PluginMethod
    fun getQueue(call: PluginCall) {
        withController(call) { player ->
            val items = JSArray()

            for (index in 0 until player.mediaItemCount) {
                val item = player.getMediaItemAt(index)

                items.put(
                    JSObject()
                        .put("id", item.mediaId)
                        .put("title", item.mediaMetadata.title?.toString())
                        .put("artist", item.mediaMetadata.artist?.toString())
                        .put("image", item.mediaMetadata.artworkUri?.toString())
                )
            }

            call.resolve(JSObject().put("items", items).put("index", player.currentMediaItemIndex))
        }
    }

    @PluginMethod
    fun playIndex(call: PluginCall) {
        val index = call.getInt("index") ?: return call.reject("index is required")

        withController(call) { player ->
            player.seekTo(index, 0)
            player.play()
            call.resolve()
        }
    }

    @PluginMethod
    fun status(call: PluginCall) {
        withController(call) { player -> call.resolve(state(player)) }
    }

    override fun handleOnDestroy() {
        controller?.release()
        controller = null
    }

    private fun withController(call: PluginCall, action: (MediaController) -> Unit) {
        val mainExecutor = ContextCompat.getMainExecutor(context)

        controller?.let {
            mainExecutor.execute { action(it) }
            return
        }

        val token = SessionToken(context, ComponentName(context, PlaybackService::class.java))
        val future = MediaController.Builder(context, token)
            .setApplicationLooper(Looper.getMainLooper())
            .buildAsync()

        future.addListener({
            val created = try {
                future.get()
            }
            catch (error: Exception) {
                call.reject("Unable to connect to the playback service", error)
                return@addListener
            }

            created.addListener(listener)
            controller = created
            action(created)
        }, mainExecutor)
    }

    private fun state(player: Player): JSObject {
        val audio = context.getSystemService(Context.AUDIO_SERVICE) as AudioManager
        val metadata = player.mediaMetadata

        return JSObject()
            .put("playing", player.playWhenReady && player.playbackState != Player.STATE_IDLE)
            .put("active", player.playbackState != Player.STATE_IDLE)
            .put("title", metadata.title?.toString())
            .put("artist", metadata.artist?.toString())
            .put("album", metadata.albumTitle?.toString())
            .put("image", metadata.artworkUri?.toString())
            .put("position", player.currentPosition / 1000.0)
            .put("positionAt", System.currentTimeMillis())
            .put("duration", if (player.duration == C.TIME_UNSET) 0.0 else player.duration / 1000.0)
            .put("shuffle", player.shuffleModeEnabled)
            .put("repeat", when (player.repeatMode) {
                Player.REPEAT_MODE_ONE -> "one"
                Player.REPEAT_MODE_ALL -> "all"
                else -> "off"
            })
            .put("index", player.currentMediaItemIndex)
            .put("count", player.mediaItemCount)
            .put("volume", Math.round(audio.getStreamVolume(AudioManager.STREAM_MUSIC) * 100f / audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC)))
    }
}
