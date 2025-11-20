const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const abilities = require('./app/data/abilities.json');

function generateImage(name, type, outputPath) {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 200, 200);
  if (type === 'weapon') {
    gradient.addColorStop(0, '#f59e0b');
    gradient.addColorStop(1, '#d97706');
  } else {
    gradient.addColorStop(0, '#a78bfa');
    gradient.addColorStop(1, '#7c3aed');
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 200, 200);

  // Icon
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';

  const emoji = type === 'weapon' ? '⚔️' : '✨';
  ctx.fillText(emoji, 100, 80);

  // Name
  ctx.font = 'bold 16px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(name, 100, 150);

  // Type label
  ctx.font = '12px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText(type.toUpperCase(), 100, 175);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ Generated: ${path.basename(outputPath)}`);
}

console.log('Fixing missing images...\n');

// Fix Bouncer Gun
console.log('Generating Bouncer Gun placeholder...');
const bouncerPath = path.join(__dirname, 'public', 'images', 'weapons', 'bouncer-gun.png');
generateImage('Bouncer Gun', 'weapon', bouncerPath);

// Fix all abilities
console.log('\nGenerating ability placeholders...');
abilities.forEach(ability => {
  const outputPath = path.join(__dirname, 'public', 'images', 'abilities', `${ability.id}.png`);
  generateImage(ability.name, 'ability', outputPath);
});

console.log('\nDone! Fixed missing images.');
