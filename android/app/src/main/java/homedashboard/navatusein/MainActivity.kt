package homedashboard.navatusein

import android.os.Bundle
import com.getcapacitor.BridgeActivity
import com.getcapacitor.CapConfig

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(DashboardPlugin::class.java)
        config = dashboardConfig()
        super.onCreate(savedInstanceState)
    }

    private fun dashboardConfig(): CapConfig? {
        val settings = AppSettings(this)
        val url = settings.dashboardUrl
        val host = settings.homeAssistantHost

        if (settings.isSetupRequested || url.isNullOrEmpty())
            return null

        return CapConfig.Builder(this)
            .setServerUrl(url)
            .setAllowNavigation(listOfNotNull(host?.takeIf { it.isNotEmpty() }).toTypedArray())
            .create()
    }
}
