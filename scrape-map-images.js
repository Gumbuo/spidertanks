const https = require('https');
const fs = require('fs');
const path = require('path');

const mapsData = require('./app/data/maps.json');

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractMapImages(html) {
  // Look for any map-related image URLs
  const imagePattern = /https:\/\/static\.wikia\.nocookie\.net\/spider-tanks\/images\/[^"'\s]+\.(png|jpg|jpeg|webp)/gi;
  const matches = html.match(imagePattern) || [];

  // Filter for unique, high-quality images
  const uniqueUrls = [...new Set(matches)].filter(url => {
    // Prefer revision/latest for best quality
    return !url.includes('thumb') && !url.includes('avatar');
  });

  return uniqueUrls;
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Fetching Spider Tanks Maps page...\n');

  const html = await fetchHtml('https://spider-tanks.fandom.com/wiki/Maps');
  const imageUrls = extractMapImages(html);

  console.log(`Found ${imageUrls.length} potential map images:\n`);
  imageUrls.forEach((url, i) => console.log(`${i + 1}. ${url}`));

  if (imageUrls.length === 0) {
    console.log('\nNo map images found on wiki. Maps may not have individual screenshots uploaded.');
    return;
  }

  // Create maps directory
  const mapsDir = path.join(__dirname, 'public', 'images', 'maps');
  if (!fs.existsSync(mapsDir)) {
    fs.mkdirSync(mapsDir, { recursive: true });
  }

  console.log('\nDownloading images...\n');

  // Download each image
  for (let i = 0; i < imageUrls.length && i < 12; i++) {
    const url = imageUrls[i];
    const filename = `map-${i + 1}.png`;
    const filepath = path.join(mapsDir, filename);

    try {
      await downloadImage(url, filepath);
    } catch (err) {
      console.log(`✗ Failed: ${filename} - ${err.message}`);
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
