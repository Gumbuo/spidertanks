const https = require('https');
const fs = require('fs');
const path = require('path');

const bodies = require('./app/data/bodies.json');
const weapons = require('./app/data/weapons.json');
const abilities = require('./app/data/abilities.json');

// Wiki name mappings
const bodyWikiNames = {
  'bandit': 'Bandit',
  'blink': 'Blink',
  'chicken': 'Chicken',
  'crab': 'Crab',
  'flea': 'Flea',
  'hurricane': 'Hurricane',
  'jacked-o-lantern': 'Jacked_%27O_Lantern',
  'junker': 'Junker',
  'maul': 'Maul',
  'muzzle': 'Muzzle',
  'nomad': 'Nomad',
  'octopus': 'Octopus',
  'rex': 'Rex',
  'santas-slay': 'Santa%27s_Slay',
  'scorpion': 'Scorpion',
  'scout': 'Scout',
  'shark': 'Shark',
  'shepherd': 'Shepherd',
  'snoops-lowrider': 'Snoop%27s_Bumpin%27_Lowrider',
  'tiger': 'Tiger',
  'titan': 'Titan',
  'tortoise': 'Tortoise',
  'tracks': 'Tracks'
};

const weaponWikiNames = {
  'beat-blaster': 'Beat_Blaster',
  'blade-spinner': 'Blade_Spinner',
  'bouncer-gun': 'Bouncer_Gun',
  'cannon': 'Cannon',
  'crossbow': 'Crossbow',
  'eggxecutioner': 'Eggxecutioner',
  'finisher': 'Finisher',
  'gatling-gun': 'Gatling_Gun',
  'laser-blaster': 'Laser_Blaster',
  'lava-launcher': 'Lava_Launcher',
  'railgun': 'Railgun',
  'repair-gun': 'Repair_Gun',
  'ripper': 'Ripper',
  'shocker': 'Shocker',
  'shotgun': 'Shotgun',
  'sniper-rifle': 'Sniper_Rifle',
  'snowballer': 'Snowballer',
  'stinger': 'Stinger',
  'twin-guns': 'Twin_Guns',
  'brambler': 'Brambler',
  'fire-artillery': 'Fire_Artillery',
  'repair-artillery': 'Repair_Artillery',
  'rocket-artillery': 'Rocket_Artillery',
  'brainstormer': 'Brainstormer',
  'flamethrower': 'Flamethrower',
  't-ray': 'T-Ray'
};

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

function extractImageUrl(html, type) {
  // Look for specific image types (Body_, Weapon_, Ability_)
  const typePrefix = type === 'Bodies' ? 'Body_' : type === 'Weapons' ? 'Weapon_' : 'Ability_';

  // Pattern to find images with the specific prefix
  const pattern = new RegExp(`https:\\/\\/static\\.wikia\\.nocookie\\.net\\/spider-tanks\\/images\\/[^\\/]+\\/[^\\/]+\\/${typePrefix}[^"'\\s]+\\.png[^"'\\s]*`, 'g');

  const matches = html.match(pattern);
  if (matches && matches.length > 0) {
    // Return the first match (should be the main image)
    let url = matches[0];
    // Ensure it has revision/latest for best quality
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

async function scrapeImages(type, wikiNames, outputDir) {
  console.log(`\nScraping ${type}...`);
  let success = 0;
  let failed = 0;

  for (const [id, wikiName] of Object.entries(wikiNames)) {
    try {
      console.log(`Fetching ${wikiName}...`);
      const html = await fetchWikiPage(wikiName);
      const imageUrl = extractImageUrl(html, type);

      if (imageUrl) {
        const filepath = path.join(outputDir, `${id}.png`);
        await downloadImage(imageUrl, filepath);
        console.log(`✓ ${id} - ${imageUrl.substring(0, 80)}...`);
        success++;
      } else {
        console.log(`✗ ${id} - No ${type} image found`);
        failed++;
      }

      // Rate limit: wait 500ms between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.log(`✗ ${id} - ${error.message}`);
      failed++;
    }
  }

  console.log(`${type}: ${success} success, ${failed} failed`);
}

async function main() {
  console.log('Starting Spider Tanks Wiki image scraper...');

  await scrapeImages('Bodies', bodyWikiNames, path.join(__dirname, 'public', 'images', 'bodies'));
  await scrapeImages('Weapons', weaponWikiNames, path.join(__dirname, 'public', 'images', 'weapons'));
  await scrapeImages('Abilities', abilityWikiNames, path.join(__dirname, 'public', 'images', 'abilities'));

  console.log('\nDone!');
}

main();
