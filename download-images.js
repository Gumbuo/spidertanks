const https = require('https');
const fs = require('fs');
const path = require('path');

// Image URL patterns from Spider Tanks Wiki
const baseUrl = 'https://static.wikia.nocookie.net/spider-tanks/images';

// Body name mappings (wiki name -> our ID)
const bodies = {
  'Bandit': 'bandit',
  'Delta': 'blink', // Blink is called Delta in wiki
  'Chicken': 'chicken',
  'Crab': 'crab',
  'Flea': 'flea',
  'Hurricane': 'hurricane',
  'Jacked_O_Lantern': 'jacked-o-lantern',
  'Junker': 'junker',
  'Maul': 'maul',
  'Muzzle': 'muzzle',
  'Nomad': 'nomad',
  'Octopus': 'octopus',
  'Rex': 'rex',
  'Santas_Slay': 'santas-slay',
  'Scorpion': 'scorpion',
  'Scout': 'scout',
  'Shark': 'shark',
  'Shepherd': 'shepherd',
  'Snoops_Lowrider': 'snoops-lowrider',
  'Tiger': 'tiger',
  'Titan': 'titan',
  'Tortoise': 'tortoise',
  'Tracks': 'tracks'
};

const weapons = {
  'Beat_Blaster': 'beat-blaster',
  'Blade_Spinner': 'blade-spinner',
  'Bouncer_Gun': 'bouncer-gun',
  'Cannon': 'cannon',
  'Crossbow': 'crossbow',
  'Eggxecutioner': 'eggxecutioner',
  'Finisher': 'finisher',
  'Gatling_Gun': 'gatling-gun',
  'Laser_Blaster': 'laser-blaster',
  'Lava_Launcher': 'lava-launcher',
  'Railgun': 'railgun',
  'Repair_Gun': 'repair-gun',
  'Ripper': 'ripper',
  'Shocker': 'shocker',
  'Shotgun': 'shotgun',
  'Sniper_Rifle': 'sniper-rifle',
  'Snowballer': 'snowballer',
  'Stinger': 'stinger',
  'Twin_Guns': 'twin-guns',
  'Brambler': 'brambler',
  'Fire_Artillery': 'fire-artillery',
  'Repair_Artillery': 'repair-artillery',
  'Rocket_Artillery': 'rocket-artillery',
  'Brainstormer': 'brainstormer',
  'Flamethrower': 'flamethrower',
  'T-Ray': 't-ray'
};

const abilities = {
  'Artillery_Turret': 'artillery-turret',
  'Cannon_Turret': 'cannon-turret',
  'Machine_Gun_Turret': 'machine-gun-turret',
  'Air_Strike': 'air-strike',
  'Cloak_Drone': 'cloak-drone',
  'Decoy': 'decoy',
  'Disguise_Drone': 'disguise-drone',
  'Grapnel_Launcher': 'grapnel-launcher',
  'Grenade': 'grenade',
  'Reactive_Plating': 'reactive-plating',
  'Relay_Drone': 'relay-drone',
  'Repair_Drone': 'repair-drone',
  'Repair_Zone': 'repair-zone',
  'Repulsor_Zone': 'repulsor-zone',
  'Shield_Drone': 'shield-drone',
  'Shield_Projector': 'shield-projector',
  'Smoke_Canister': 'smoke-canister',
  'Speed_Booster': 'speed-booster',
  'Stun_Grenade': 'stun-grenade',
  'Vortex_Zone': 'vortex-zone'
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        console.log(`✗ Failed (${response.statusCode}): ${path.basename(filepath)}`);
        resolve(); // Don't reject, just continue
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.log(`✗ Error: ${path.basename(filepath)} - ${err.message}`);
      resolve();
    });
  });
}

async function downloadAll() {
  console.log('Downloading Spider Tanks images from wiki...\n');

  // Download bodies
  console.log('Downloading bodies...');
  for (const [wikiName, ourId] of Object.entries(bodies)) {
    const url = `${baseUrl}/Body_${wikiName}.png/revision/latest`;
    const filepath = path.join(__dirname, 'public', 'images', 'bodies', `${ourId}.png`);
    await downloadImage(url, filepath);
  }

  // Download weapons
  console.log('\nDownloading weapons...');
  for (const [wikiName, ourId] of Object.entries(weapons)) {
    const url = `${baseUrl}/Weapon_${wikiName}.png/revision/latest`;
    const filepath = path.join(__dirname, 'public', 'images', 'weapons', `${ourId}.png`);
    await downloadImage(url, filepath);
  }

  // Download abilities
  console.log('\nDownloading abilities...');
  for (const [wikiName, ourId] of Object.entries(abilities)) {
    const url = `${baseUrl}/Ability_${wikiName}.png/revision/latest`;
    const filepath = path.join(__dirname, 'public', 'images', 'abilities', `${ourId}.png`);
    await downloadImage(url, filepath);
  }

  console.log('\nDone!');
}

downloadAll();
