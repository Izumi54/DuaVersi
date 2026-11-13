/**
 * Loader ESM untuk script Node repo ini: memetakan alias `@/` ke `src/`
 * dan memuat file `.json` sebagai modul JSON, supaya `src/lib/data.js`
 * (yang ditulis untuk Next/webpack) bisa diimpor langsung oleh Node.
 *
 * Dipakai oleh: scripts/uji-pencarian.mjs (lihat scripts/register-loader.mjs).
 */
import { pathToFileURL, fileURLToPath } from 'node:url'
import path from 'node:path'
import { readFile } from 'node:fs/promises'

const root = path.resolve(import.meta.dirname, '..')

export async function resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
        const url = pathToFileURL(path.join(root, 'src', specifier.slice(2)))
        return { url: url.href, shortCircuit: true }
    }
    return nextResolve(specifier, context)
}

export async function load(url, context, nextLoad) {
    if (url.endsWith('.json')) {
        const source = await readFile(fileURLToPath(url), 'utf8')
        return { format: 'json', source, shortCircuit: true }
    }
    return nextLoad(url, context)
}
