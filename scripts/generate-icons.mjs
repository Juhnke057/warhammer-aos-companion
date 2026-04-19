import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// White background, gold "AOS" lettering
// Gold color: #C9A84C (warm AoS-style gold)
const GOLD = '#C9A84C'

function makeSvg(size) {
  const pad = size * 0.1
  const inner = size - pad * 2
  // Font size: roughly 45% of icon size, bold
  const fontSize = Math.round(size * 0.42)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="white"/>
  <text
    x="${size / 2}"
    y="${size / 2 + fontSize * 0.36}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${fontSize}"
    font-weight="bold"
    text-anchor="middle"
    fill="${GOLD}"
    letter-spacing="${Math.round(fontSize * 0.04)}"
  >AoS</text>
</svg>`
}

// Foreground layer for adaptive icon (108dp canvas, safe zone is 72dp centred)
// The foreground SVG is 108x108 but content should stay within the inner 72x72
function makeForegroundSvg(size) {
  const fontSize = Math.round(size * 0.42)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <text
    x="${size / 2}"
    y="${size / 2 + fontSize * 0.36}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${fontSize}"
    font-weight="bold"
    text-anchor="middle"
    fill="${GOLD}"
    letter-spacing="${Math.round(fontSize * 0.04)}"
  >AoS</text>
</svg>`
}

const sizes = [
  { folder: 'mipmap-mdpi',    size: 48  },
  { folder: 'mipmap-hdpi',    size: 72  },
  { folder: 'mipmap-xhdpi',   size: 96  },
  { folder: 'mipmap-xxhdpi',  size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
]

const resDir = resolve(root, 'android/app/src/main/res')

async function run() {
  for (const { folder, size } of sizes) {
    const svg = Buffer.from(makeSvg(size))
    const png = await sharp(svg).png().toBuffer()
    const dest = resolve(resDir, folder)

    writeFileSync(resolve(dest, 'ic_launcher.png'), png)
    writeFileSync(resolve(dest, 'ic_launcher_round.png'), png)

    // Foreground layer — text on transparent background, same density size
    const fgPng = await sharp(Buffer.from(makeForegroundSvg(size))).png().toBuffer()
    writeFileSync(resolve(dest, 'ic_launcher_foreground.png'), fgPng)

    console.log(`✓ ${folder} (${size}px)`)
  }
  console.log('Done!')
}

run().catch(e => { console.error(e); process.exit(1) })
