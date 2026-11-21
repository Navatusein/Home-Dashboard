package homedashboard.navatusein

import android.content.Context
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import androidx.core.content.edit
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

class SecretStore(context: Context) {
    private val preferences = context.getSharedPreferences("secrets", Context.MODE_PRIVATE)

    fun get(name: String): String? {
        val stored = preferences.getString(name, null) ?: return null
        val bytes = Base64.decode(stored, Base64.NO_WRAP)

        val cipher = Cipher.getInstance(TRANSFORMATION)
        cipher.init(Cipher.DECRYPT_MODE, key(), GCMParameterSpec(TAG_LENGTH, bytes, 0, IV_LENGTH))

        return String(cipher.doFinal(bytes, IV_LENGTH, bytes.size - IV_LENGTH))
    }

    fun set(name: String, value: String?) {
        if (value == null) {
            preferences.edit { remove(name) }
            return
        }

        val cipher = Cipher.getInstance(TRANSFORMATION)
        cipher.init(Cipher.ENCRYPT_MODE, key())

        val encrypted = cipher.iv + cipher.doFinal(value.toByteArray())
        preferences.edit { putString(name, Base64.encodeToString(encrypted, Base64.NO_WRAP)) }
    }

    fun has(name: String) = preferences.contains(name)

    private fun key(): SecretKey {
        val keyStore = KeyStore.getInstance(KEYSTORE).apply { load(null) }

        (keyStore.getKey(KEY_ALIAS, null) as SecretKey?)?.let { return it }

        val generator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, KEYSTORE)
        generator.init(
            KeyGenParameterSpec.Builder(KEY_ALIAS, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .build()
        )

        return generator.generateKey()
    }

    private companion object {
        const val KEYSTORE = "AndroidKeyStore"
        const val KEY_ALIAS = "secrets"
        const val TRANSFORMATION = "AES/GCM/NoPadding"
        const val IV_LENGTH = 12
        const val TAG_LENGTH = 128
    }
}
