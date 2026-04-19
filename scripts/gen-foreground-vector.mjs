import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Dynamically import opentype (ESM wrapper)
const opentype = await import('opentype.js')
const font = opentype.default.loadSync('C:/Windows/Fonts/georgiab.ttf')

// We want "AoS" centered in a 108x108 viewport
// Android adaptive icon: 108dp total, safe zone 72dp centred (18dp margin each side)
const text = 'AoS'
const fontSize = 44
const x = 54
const y = 66  // baseline

const path = font.getPath(text, 0, 0, fontSize)
const bb = path.getBoundingBox()
const textW = bb.x2 - bb.x1
const textH = bb.y2 - bb.y1

// Offset so text is centred at (54, 54)
const dx = x - textW / 2 - bb.x1
const dy = y - textH / 2 - bb.y1

const centeredPath = font.getPath(text, dx, dy + textH / 2, fontSize)
const pathData = centeredPath.toPathData(2)

const xml = `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportHeight="108"
    android:viewportWidth="108">
    <path
        android:fillColor="#C9A84C"
        android:pathData="${pathData}" />
</vector>`

const dest = resolve(__dirname, '../android/app/src/main/res/drawable-v24/ic_launcher_foreground.xml')
writeFileSync(dest, xml)
console.log('Written foreground vector XML')
console.log('BBox:', bb, '  textW:', textW.toFixed(1), '  textH:', textH.toFixed(1))
