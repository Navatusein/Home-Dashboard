package homedashboard.navatusein

import android.app.PendingIntent
import android.content.Intent
import androidx.media3.common.AudioAttributes
import androidx.media3.common.C
import androidx.media3.common.MediaItem
import androidx.media3.common.util.UnstableApi
import androidx.media3.datasource.DefaultHttpDataSource
import androidx.media3.datasource.cache.CacheDataSource
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.source.DefaultMediaSourceFactory
import androidx.media3.session.MediaSession
import androidx.media3.session.MediaSessionService
import com.google.common.util.concurrent.Futures
import com.google.common.util.concurrent.ListenableFuture

@UnstableApi
class PlaybackService : MediaSessionService() {
    private var session: MediaSession? = null

    override fun onCreate() {
        super.onCreate()

        val navidrome = Navidrome(this)

        val dataSource = CacheDataSource.Factory()
            .setCache(Downloads.cache(this))
            .setCacheWriteDataSinkFactory(null)
            .setUpstreamDataSourceFactory(
                CacheDataSource.Factory()
                    .setCache(MediaCache.get(this))
                    .setUpstreamDataSourceFactory(DefaultHttpDataSource.Factory())
            )

        val player = ExoPlayer.Builder(this)
            .setMediaSourceFactory(DefaultMediaSourceFactory(dataSource))
            .setAudioAttributes(
                AudioAttributes.Builder()
                    .setUsage(C.USAGE_MEDIA)
                    .setContentType(C.AUDIO_CONTENT_TYPE_MUSIC)
                    .build(),
                true
            )
            .setHandleAudioBecomingNoisy(true)
            .build()

        val activity = PendingIntent.getActivity(
            this,
            0,
            Intent(this, MainActivity::class.java),
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        session = MediaSession.Builder(this, player)
            .setSessionActivity(activity)
            .setCallback(object : MediaSession.Callback {
                override fun onAddMediaItems(
                    mediaSession: MediaSession,
                    controller: MediaSession.ControllerInfo,
                    mediaItems: MutableList<MediaItem>
                ): ListenableFuture<MutableList<MediaItem>> = Futures.immediateFuture(
                    mediaItems.map { item ->
                        val download = Downloads.completed(this@PlaybackService, item.mediaId)?.request
                        val cover = Downloads.cover(this@PlaybackService, item.mediaMetadata.artworkUri?.toString())

                        item.buildUpon()
                            .setUri(download?.uri ?: navidrome.streamUri(item.mediaId))
                            .setCustomCacheKey(download?.customCacheKey ?: navidrome.cacheKey(item.mediaId))
                            .setMediaMetadata(item.mediaMetadata.buildUpon().setArtworkUri(cover ?: item.mediaMetadata.artworkUri).build())
                            .build()
                    }.toMutableList()
                )
            })
            .build()
    }

    override fun onGetSession(controllerInfo: MediaSession.ControllerInfo) = session

    override fun onTaskRemoved(rootIntent: Intent?) {
        val player = session?.player

        if (player == null || !player.playWhenReady || player.mediaItemCount == 0)
            stopSelf()
    }

    override fun onDestroy() {
        session?.run {
            player.release()
            release()
        }
        session = null
        super.onDestroy()
    }
}
