package homedashboard.navatusein

import android.content.Context
import androidx.core.content.edit
import com.getcapacitor.CapConfig

class AppSettings(context: Context) {
    private val preferences = context.getSharedPreferences("settings", Context.MODE_PRIVATE)
    private val defaults = CapConfig.loadDefault(context).getPluginConfiguration("Dashboard")

    var dashboardUrl: String?
        get() = preferences.getString("dashboard_url", null) ?: defaults.getString("dashboardUrl")
        set(value) = preferences.edit { putString("dashboard_url", value) }

    var homeAssistantHost: String?
        get() = preferences.getString("home_assistant_host", null) ?: defaults.getString("homeAssistantHost")
        set(value) = preferences.edit { putString("home_assistant_host", value) }

    var isSetupRequested: Boolean
        get() = preferences.getBoolean("setup_requested", false)
        set(value) = preferences.edit { putBoolean("setup_requested", value) }

    var navidromeUrl: String?
        get() = preferences.getString("navidrome_url", null)
        set(value) = preferences.edit { putString("navidrome_url", value) }

    var navidromeUsername: String?
        get() = preferences.getString("navidrome_username", null)
        set(value) = preferences.edit { putString("navidrome_username", value) }

    var navidromeQuality: String
        get() = preferences.getString("navidrome_quality", "opus128")!!
        set(value) = preferences.edit { putString("navidrome_quality", value) }
}
