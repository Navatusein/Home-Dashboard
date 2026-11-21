package homedashboard.navatusein

import android.content.ComponentName
import android.net.Uri
import android.os.Looper
import androidx.core.content.ContextCompat
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.common.Player
import androidx.media3.session.MediaController
import androidx.media3.session.SessionToken
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

    private fun state(player: Player) = JSObject()
        .put("playing", player.playWhenReady && player.playbackState != Player.STATE_IDLE)
        .put("active", player.playbackState != Player.STATE_IDLE)
        .put("title", player.mediaMetadata.title?.toString())
        .put("artist", player.mediaMetadata.artist?.toString())
}
