/**
 * Mendaftarkan scripts/alias-loader.mjs untuk proses Node ini.
 * Dipakai via: node --import ./scripts/register-loader.mjs <script>
 */
import { register } from 'node:module'

register('./alias-loader.mjs', import.meta.url)
