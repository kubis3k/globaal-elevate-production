// Generates brand asset variants (wordmark, mark, favicons, OG image) from
// public/logo-source.png (2000x2000, white background, generous margins).
//
// Usage: node scripts/generate-assets.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SOURCE = path.join(root, 'public/logo-source.png');
const ASSETS_DIR = path.join(root, 'src/assets');
const PUBLIC_DIR = path.join(root, 'public');

const ACCENT = '#7606FF';
const WHITE = '#ffffff';

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function generateWordmark() {
  // Trim the generous white margin around the wordmark, add a small
  // consistent padding back, then resize to a standard width.
  const trimmed = sharp(SOURCE).trim({ background: WHITE, threshold: 10 });
  const padded = await trimmed
    .extend({ top: 24, bottom: 24, left: 24, right: 24, background: WHITE })
    .png()
    .toBuffer();

  const out = path.join(ASSETS_DIR, 'logo-wordmark.png');
  await sharp(padded).resize({ width: 1200 }).png().toFile(out);
  return out;
}

async function generateMark() {
  // The planet icon sits between "GLOBAAL" and "ELEVATE", roughly at the
  // horizontal/vertical center of the source canvas. Extract a generous
  // square region around it, then trim + resize.
  const extractRegion = { left: 895, top: 865, width: 208, height: 270 };

  const extracted = await sharp(SOURCE).extract(extractRegion).png().toBuffer();

  const trimmed = await sharp(extracted)
    .trim({ background: WHITE, threshold: 10 })
    .png()
    .toBuffer();

  const out = path.join(ASSETS_DIR, 'logo-mark.png');
  await sharp(trimmed)
    .resize({
      width: 512,
      height: 512,
      fit: 'contain',
      background: WHITE,
    })
    .png()
    .toFile(out);
  return { out, extractRegion };
}

async function generateFavicons(markPath) {
  const favicon32 = path.join(PUBLIC_DIR, 'favicon-32.png');
  const favicon180 = path.join(PUBLIC_DIR, 'favicon-180.png');

  await sharp(markPath).resize(32, 32).png().toFile(favicon32);
  await sharp(markPath).resize(180, 180).png().toFile(favicon180);
}

async function generateOgImage(wordmarkPath) {
  const width = 1200;
  const height = 630;
  const barHeight = 16;

  const wordmarkMeta = await sharp(wordmarkPath).metadata();
  const targetWordmarkWidth = 760;
  const scale = targetWordmarkWidth / (wordmarkMeta.width ?? targetWordmarkWidth);
  const targetWordmarkHeight = Math.round((wordmarkMeta.height ?? 200) * scale);

  const resizedWordmark = await sharp(wordmarkPath)
    .resize({ width: targetWordmarkWidth })
    .png()
    .toBuffer();

  const accentBar = await sharp({
    create: {
      width,
      height: barHeight,
      channels: 4,
      background: ACCENT,
    },
  })
    .png()
    .toBuffer();

  const canvas = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: WHITE,
    },
  });

  const wordmarkLeft = Math.round((width - targetWordmarkWidth) / 2);
  const wordmarkTop = Math.round((height - targetWordmarkHeight) / 2) - 20;

  const out = path.join(PUBLIC_DIR, 'og-default.png');
  await canvas
    .composite([
      { input: resizedWordmark, left: wordmarkLeft, top: wordmarkTop },
      { input: accentBar, left: 0, top: height - barHeight },
    ])
    .png()
    .toFile(out);
  return out;
}

async function main() {
  await ensureDir(ASSETS_DIR);
  await ensureDir(PUBLIC_DIR);

  const wordmarkPath = await generateWordmark();
  console.log('✓ wordmark ->', path.relative(root, wordmarkPath));

  const { out: markPath, extractRegion } = await generateMark();
  console.log('✓ mark ->', path.relative(root, markPath), JSON.stringify(extractRegion));

  await generateFavicons(markPath);
  console.log('✓ favicons -> public/favicon-32.png, public/favicon-180.png');

  const ogPath = await generateOgImage(wordmarkPath);
  console.log('✓ og image ->', path.relative(root, ogPath));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
