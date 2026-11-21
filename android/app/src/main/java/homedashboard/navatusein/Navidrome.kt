package homedashboard.navatusein

import android.content.Context
import android.net.Uri
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.security.MessageDigest
import java.security.SecureRandom

class Navidrome(private val context: Context) {
    private val settings = AppSettings(context)

    fun streamUri(id: String): Uri? {
        val params = when (settings.navidromeQuality) {
            "raw" -> mapOf("format" to "raw")
            "opus192" -> mapOf("format" to "opus", "maxBitRate" to "192")
            else -> mapOf("format" to "opus", "maxBitRate" to "128")
        }

        return uri("stream.view", params + ("id" to id))
    }

    fun cacheKey(id: String) = "$id-${settings.navidromeQuality}"

    fun ping(): String? {
        val uri = uri("ping.view", mapOf("f" to "json")) ?: return "Navidrome is not configured"

        return try {
            val connection = URL(uri.toString()).openConnection() as HttpURLConnection
            connection.connectTimeout = TIMEOUT
            connection.readTimeout = TIMEOUT

            val response = JSONObject(connection.inputStream.bufferedReader().use { it.readText() })
                .getJSONObject("subsonic-response")

            if (response.getString("status") == "ok")
                null
            else
                response.optJSONObject("error")?.optString("message") ?: "Navidrome refused the request"
        }
        catch (error: Exception) {
            error.message ?: error.javaClass.simpleName
        }
    }

    private fun uri(method: String, params: Map<String, String>): Uri? {
        val url = settings.navidromeUrl?.takeIf { it.isNotBlank() } ?: return null
        val username = settings.navidromeUsername?.takeIf { it.isNotBlank() } ?: return null
        val password = SecretStore(context).get(PASSWORD_KEY) ?: return null

        val salt = ByteArray(8).also { SecureRandom().nextBytes(it) }.toHex()
        val token = MessageDigest.getInstance("MD5").digest((password + salt).toByteArray()).toHex()

        val builder = Uri.parse("${url.trimEnd('/')}/rest/$method").buildUpon()
            .appendQueryParameter("u", username)
            .appendQueryParameter("t", token)
            .appendQueryParameter("s", salt)
            .appendQueryParameter("v", API_VERSION)
            .appendQueryParameter("c", CLIENT_NAME)

        params.forEach { (name, value) -> builder.appendQueryParameter(name, value) }

        return builder.build()
    }

    private fun ByteArray.toHex() = joinToString("") { "%02x".format(it) }

    companion object {
        const val PASSWORD_KEY = "navidrome_password"

        private const val API_VERSION = "1.16.1"
        private const val CLIENT_NAME = "HomeDashboard"
        private const val TIMEOUT = 10_000
    }
}
