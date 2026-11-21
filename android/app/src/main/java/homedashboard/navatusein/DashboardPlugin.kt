package homedashboard.navatusein

import android.content.ComponentName
import androidx.core.content.ContextCompat
import androidx.media3.common.Player
import androidx.media3.session.MediaController
import androidx.media3.session.SessionToken
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

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
    fun start(call: PluginCall) {
        withController(call) { player ->
            player.play()
            call.resolve()
        }
    }

    @PluginMethod
    fun stop(call: PluginCall) {
        withController(call) { player ->
            player.stop()
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
        controller?.let {
            action(it)
            return
        }

        val token = SessionToken(context, ComponentName(context, PlaybackService::class.java))
        val future = MediaController.Builder(context, token).buildAsync()

        future.addListener({
            try {
                val created = future.get()
                created.addListener(listener)
                controller = created
                action(created)
            }
            catch (error: Exception) {
                call.reject("Unable to connect to the playback service", error)
            }
        }, ContextCompat.getMainExecutor(context))
    }

    private fun state(player: Player) = JSObject()
        .put("playing", player.playWhenReady)
        .put("active", player.playbackState != Player.STATE_IDLE)
        .put("title", player.mediaMetadata.title?.toString())
}
