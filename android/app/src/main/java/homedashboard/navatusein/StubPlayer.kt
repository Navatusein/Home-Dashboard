package homedashboard.navatusein

import android.os.Looper
import androidx.media3.common.MediaMetadata
import androidx.media3.common.Player
import androidx.media3.common.SimpleBasePlayer
import androidx.media3.common.util.UnstableApi
import com.google.common.util.concurrent.Futures
import com.google.common.util.concurrent.ListenableFuture

@UnstableApi
class StubPlayer(looper: Looper) : SimpleBasePlayer(looper) {
    private var isActive = false
    private var isPlaying = false

    override fun getState(): State {
        val state = State.Builder()
            .setAvailableCommands(
                Player.Commands.Builder()
                    .addAll(
                        COMMAND_PLAY_PAUSE,
                        COMMAND_STOP,
                        COMMAND_GET_CURRENT_MEDIA_ITEM,
                        COMMAND_GET_METADATA,
                        COMMAND_GET_TIMELINE,
                    )
                    .build()
            )
            .setPlayWhenReady(isPlaying, PLAY_WHEN_READY_CHANGE_REASON_USER_REQUEST)

        if (!isActive)
            return state.setPlaybackState(STATE_IDLE).build()

        val metadata = MediaMetadata.Builder()
            .setTitle("Home Dashboard")
            .setArtist("Player service")
            .build()

        return state
            .setPlaylist(listOf(MediaItemData.Builder("stub").setMediaMetadata(metadata).build()))
            .setCurrentMediaItemIndex(0)
            .setPlaybackState(STATE_READY)
            .build()
    }

    override fun handleSetPlayWhenReady(playWhenReady: Boolean): ListenableFuture<*> {
        isActive = true
        isPlaying = playWhenReady
        return Futures.immediateVoidFuture()
    }

    override fun handleStop(): ListenableFuture<*> {
        isActive = false
        isPlaying = false
        return Futures.immediateVoidFuture()
    }
}
