const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const bodies = require('./app/data/bodies.json');
const weapons = require('./app/data/weapons.json');
const abilities = require('./app/data/abilities.json');

function generateImage(name, type, outputPath) {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 200, 200);
  if (type === 'body') {
    gradient.addColorStop(0, '#06b6d4');
    gradient.addColorStop(1, '#0284c7');
  } else if (type === 'weapon') {
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

  const emoji = type === 'body' ? '🕷️' : type === 'weapon' ? '⚔️' : '✨';
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

console.log('Generating placeholder images...\n');

// Generate body images
console.log('Generating bodies...');
bodies.forEach(body => {
  const outputPath = path.join(__dirname, 'public', 'images', 'bodies', `${body.id}.png`);
  generateImage(body.name, 'body', outputPath);
});

// Generate weapon images
console.log('\nGenerating weapons...');
weapons.forEach(weapon => {
  const outputPath = path.join(__dirname, 'public', 'images', 'weapons', `${weapon.id}.png`);
  generateImage(weapon.name, 'weapon', outputPath);
});

// Generate ability images
console.log('\nGenerating abilities...');
abilities.forEach(ability => {
  const outputPath = path.join(__dirname, 'public', 'images', 'abilities', `${ability.id}.png`);
  generateImage(ability.name, 'ability', outputPath);
});

console.log('\nDone! Generated images for all parts.');
