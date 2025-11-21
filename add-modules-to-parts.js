const fs = require('fs');
const path = require('path');

// Read the current data
const bodies = require('./app/data/bodies.json');
const weapons = require('./app/data/weapons.json');

// Generic module templates
const bodyModuleTemplates = [
  {
    name: "Armor Boost",
    armorBonus: 500,
    speedBonus: 0,
    energyBonus: 0,
    description: "Increases armor protection"
  },
  {
    name: "Speed Boost",
    armorBonus: 0,
    speedBonus: 30,
    energyBonus: 0,
    description: "Increases movement speed"
  },
  {
    name: "Energy Boost",
    armorBonus: 0,
    speedBonus: 0,
    energyBonus: 0.03,
    description: "Increases energy regeneration"
  }
];

const weaponModuleTemplates = [
  {
    name: "Damage Boost",
    damageBonus: 150,
    rangeBonus: 0,
    description: "Increases weapon damage"
  },
  {
    name: "Range Boost",
    damageBonus: 0,
    rangeBonus: 3,
    description: "Increases weapon range"
  },
  {
    name: "Balanced Boost",
    damageBonus: 75,
    rangeBonus: 1,
    description: "Balanced damage and range increase"
  }
];

// Add modules to each body
const updatedBodies = bodies.map(body => ({
  ...body,
  modules: bodyModuleTemplates.map((template, index) => ({
    id: `${body.id}-module-${index + 1}`,
    ...template
  }))
}));

// Add modules to each weapon
const updatedWeapons = weapons.map(weapon => ({
  ...weapon,
  modules: weaponModuleTemplates.map((template, index) => ({
    id: `${weapon.id}-module-${index + 1}`,
    ...template
  }))
}));

// Write updated data
fs.writeFileSync(
  path.join(__dirname, 'app/data/bodies.json'),
  JSON.stringify(updatedBodies, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, 'app/data/weapons.json'),
  JSON.stringify(updatedWeapons, null, 2)
);

console.log('✅ Added 3 modules to each body');
console.log('✅ Added 3 modules to each weapon');
console.log(`Total: ${updatedBodies.length} bodies, ${updatedWeapons.length} weapons`);
