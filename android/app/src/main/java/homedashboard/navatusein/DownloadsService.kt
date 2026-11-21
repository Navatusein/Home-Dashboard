package homedashboard.navatusein

import android.app.Notification
import androidx.media3.common.util.UnstableApi
import androidx.media3.exoplayer.offline.Download
import androidx.media3.exoplayer.offline.DownloadNotificationHelper
import androidx.media3.exoplayer.offline.DownloadService
import androidx.media3.exoplayer.scheduler.Scheduler

@UnstableApi
class DownloadsService : DownloadService(
    NOTIFICATION_ID,
    DEFAULT_FOREGROUND_NOTIFICATION_UPDATE_INTERVAL,
    CHANNEL_ID,
    R.string.downloads_channel,
    0
) {
    override fun getDownloadManager() = Downloads.manager(this)

    override fun getScheduler(): Scheduler? = null

    override fun getForegroundNotification(downloads: MutableList<Download>, notMetRequirements: Int): Notification =
        DownloadNotificationHelper(this, CHANNEL_ID).buildProgressNotification(
            this,
            android.R.drawable.stat_sys_download,
            null,
            null,
            downloads,
            notMetRequirements
        )

    companion object {
        private const val NOTIFICATION_ID = 2
        private const val CHANNEL_ID = "downloads"
    }
}
