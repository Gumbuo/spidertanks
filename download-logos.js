const https = require('https');
const fs = require('fs');
const path = require('path');

const abilities = require('./app/data/abilities.json');

function fetchWikiPage(wikiName) {
  return new Promise((resolve, reject) => {
    const url = `https://spider-tanks.fandom.com/wiki/${wikiName}`;
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractFirstImageUrl(html) {
  const pattern = /https:\/\/static\.wikia\.nocookie\.net\/spider-tanks\/images\/[^"']+\.png/g;
  const matches = html.match(pattern);
  if (matches && matches.length > 0) {
    let url = matches[0];
    if (!url.includes('/revision/latest')) {
      url = url.split('?')[0] + '/revision/latest';
    }
    return url;
  }
  return null;
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading Spider Tanks logos...\n');

  // Download Bouncer Gun logo
  try {
    console.log('Fetching Bouncer_Gun...');
    const html = await fetchWikiPage('Bouncer_Gun');
    const imageUrl = extractFirstImageUrl(html);
    if (imageUrl) {
      const filepath = path.join(__dirname, 'public', 'images', 'weapons', 'bouncer-gun.png');
      await downloadImage(imageUrl, filepath);
      console.log('✓ bouncer-gun');
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    console.log('✗ bouncer-gun -', error.message);
  }

  // Download ability logos
  const abilityWikiNames = {
    'artillery-turret': 'Artillery_Turret',
    'cannon-turret': 'Cannon_Turret',
    'machine-gun-turret': 'Machine_Gun_Turret',
    'air-strike': 'Air_Strike',
    'cloak-drone': 'Cloak_Drone',
    'decoy': 'Decoy',
    'disguise-drone': 'Disguise_Drone',
    'grapnel-launcher': 'Grapnel_Launcher',
    'grenade': 'Grenade',
    'reactive-plating': 'Reactive_Plating',
    'relay-drone': 'Relay_Drone',
    'repair-drone': 'Repair_Drone',
    'repair-zone': 'Repair_Zone',
    'repulsor-zone': 'Repulsor_Zone',
    'shield-drone': 'Shield_Drone',
    'shield-projector': 'Shield_Projector',
    'smoke-canister': 'Smoke_Canister',
    'speed-booster': 'Speed_Booster',
    'stun-grenade': 'Stun_Grenade',
    'vortex-zone': 'Vortex_Zone'
  };

  console.log('\nFetching abilities...');
  for (const [id, wikiName] of Object.entries(abilityWikiNames)) {
    try {
      console.log(`Fetching ${wikiName}...`);
      const html = await fetchWikiPage(wikiName);
      const imageUrl = extractFirstImageUrl(html);
      if (imageUrl) {
        const filepath = path.join(__dirname, 'public', 'images', 'abilities', `${id}.png`);
        await downloadImage(imageUrl, filepath);
        console.log(`✓ ${id}`);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.log(`✗ ${id} - ${error.message}`);
    }
  }

  console.log('\nDone!');
}

main();
