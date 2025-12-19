"use client";

import { useState } from "react";

// Parts with real game data (has modules with bonuses/penalties)
const verifiedBodies = [
  {
    id: "bandit",
    name: "Bandit",
    image: "/images/bodies/bandit.png",
    armor: 7755,
    speed: "8.398m/s",
    energy: "0.273/s",
    passive: "Damaging an enemy applies an anti-repair effect on them for a short duration",
    specialStat: "Anti Repair on Hit: -20%",
    maxOutCost: 100,
    type: "light",
    modules: [
      { name: "Graviton Attachment Core", desc: "+10% damage after picking up repair kit" },
      { name: "Energy Absorbing Dash Drive", desc: "Steal 20% energy on dash collision" },
      { name: "Optimized Grapnel Module", desc: "Less grapnel energy cost, -10% effect" }
    ]
  },
  {
    id: "muzzle",
    name: "Muzzle",
    image: "/images/bodies/muzzle.png",
    armor: 9440,
    speed: "7.92m/s",
    energy: "0.286/s",
    passive: "Your tank deals increased damage to distant enemies",
    specialStat: "Distant Damage: +10%",
    maxOutCost: 99,
    type: "medium",
    modules: [
      { name: "Titanium Lining", desc: "Your tank has increased armor" },
      { name: "Lightweight Repair Drones", desc: "Less repair energy cost, -20% effect" },
      { name: "Hybrid Propellant", desc: "Speed & reload boost on kill" }
    ]
  },
  {
    id: "hurricane",
    name: "Hurricane",
    image: "/images/bodies/hurricane.png",
    armor: 8217,
    speed: "8.052m/s",
    energy: "0.292/s",
    passive: "Pushes nearby enemies away upon damaging them",
    specialStat: "Knockback: 2.5m | +10% damage after ability",
    maxOutCost: 100,
    type: "medium",
    modules: [
      { name: "Energy Waste Actuators", desc: "+10% damage after deploying ability" },
      { name: "Graviton Affinity Regulators", desc: "Better Repulsor/Vortex zones" },
      { name: "Flux Excitors", desc: "-25% dash cooldown" }
    ]
  },
  {
    id: "pawn",
    name: "Pawn",
    image: "/images/bodies/pawn.webp",
    armor: 9372,
    speed: "7.392m/s",
    energy: "0.304/s",
    passive: "Provides increased repair effectiveness to itself and nearby allies",
    specialStat: "Repair Aura: +7% (16m radius)",
    maxOutCost: 100,
    type: "heavy",
    modules: [
      { name: "Repair Telemetry Processor", desc: "Stronger repairs on allies, weaker otherwise" },
      { name: "Scorite Implosion Inductor", desc: "Shield explodes on expire, less duration" },
      { name: "Flux Deployment Boosters", desc: "+35% speed on respawn" }
    ]
  },
  {
    id: "tracks",
    name: "Tracks",
    image: "/images/bodies/tracks.png",
    armor: 9834,
    speed: "7.12m/s",
    energy: "0.333/s",
    passive: "Your tank has increased projectile range",
    specialStat: "Grenade Damage: +29%",
    maxOutCost: 100,
    type: "heavy",
    modules: [
      { name: "Hyperfuel-Infused Grenades", desc: "+29% grenade damage, increased energy cost" },
      { name: "Kinetic Energy Transfer", desc: "Bonus damage when obstacle between you and enemy" },
      { name: "Combustible Dash Drive", desc: "Leave burning trail on dash, damages enemies" }
    ]
  },
  {
    id: "crab",
    name: "Crab",
    image: "/images/bodies/crab.png",
    armor: 8678,
    speed: "7.788m/s",
    energy: "0.29/s",
    passive: "Retaliates against damage received by applying it to nearby enemy tanks",
    specialStat: "Retaliation on Hit: 50%",
    maxOutCost: 100,
    type: "medium",
    modules: [
      { name: "Kinetic Conversion Core", desc: "+speed when hit recently, -9% speed otherwise" },
      { name: "Reclusive Shield Capacitor", desc: "+15% physical & elemental resistance when no allies nearby" },
      { name: "Brevite Plate Replacement", desc: "Reactive Plating costs less, detonates on death" }
    ]
  },
  {
    id: "titan",
    name: "Titan",
    image: "/images/bodies/titan.png",
    armor: 10758,
    speed: "6.6m/s",
    energy: "0.333/s",
    passive: "Your tank slows upon being hit to gain increased physical and elemental resistance",
    specialStat: "Slow on Damaged: -0% | Resistance on Damaged: +10%",
    maxOutCost: 100,
    type: "heavy",
    modules: [
      { name: "Kinetic Stabilizer", desc: "Increased damage at the cost of reduced movement speed" },
      { name: "Disruptive Relay Protocols", desc: "Relay Drone causes earthquake at final position, dealing damage and slowing enemies" },
      { name: "Equilibrium Plating", desc: "Tank explodes on death dealing % of max armor as damage" }
    ]
  },
  {
    id: "junker",
    name: "Junker",
    image: "/images/bodies/junker.png",
    armor: 7000,
    speed: "8.184m/s",
    energy: "0.211/s",
    passive: "All turrets placed by your tank deal increased damage",
    specialStat: "Turrets Damage: +20% | Improved Targeting for Artillery & Cannon Turrets",
    maxOutCost: 60,
    type: "medium",
    modules: [
      { name: "Plasma Shield Transfer", desc: "+15% turret duration, +300% turret armor, greatly increased energy cost" },
      { name: "Aftermarket Turrets", desc: "Increased fire rate, 0 energy cost briefly after placing, -20% damage, reduced duration" }
    ],
  {
    id: "blink",
    name: "Blink",
    image: "/images/bodies/blink.png",
    armor: 7062,
    speed: "8.72m/s",
    energy: "0.259/s",
    passive: "The Relay Drone ability grants your tank increased movement speed for a short duration",
    specialStat: "Speed on Deploy: -10%",
    maxOutCost: 100,
    type: "light",
    modules: [
      { name: "Realigning Relay Protocols", desc: "Less Relay Drone energy cost, +speed after ability" },
      { name: "Regenerative Propulsion", desc: "+speed when undamaged, -speed when damaged" },
      { name: "Repetitive Relay Protocols", desc: "Less Relay Drone energy cost, 0 cost briefly after use" }
    ]
  },
  {
    id: "chicken",
    name: "Chicken",
    image: "/images/bodies/chicken.png",
    armor: 7293,
    speed: "8.58m/s",
    energy: "0.264/s",
    passive: "Enemy tank bodies explode whenever you destroy them, dealing damage to enemies in a small radius",
    specialStat: "Body Explosion: 500 dmg | 5m radius",
    maxOutCost: 100,
    type: "light",
    modules: [
      { name: "Eggnite-Infused Payload", desc: "+range, -projectile speed" },
      { name: "Retributive Bots Compartment", desc: "Exploding bots deploy on death" },
      { name: "Eggnite Payload Replacement", desc: "+50% area of effect, -10% damage" }
    ]
  },
  {
    id: "shark",
    name: "Shark",
    image: "/images/bodies/shark.png",
    armor: 10065,
    speed: "6.99m/s",
    energy: "0.318/s",
    passive: "Your tank has increased area of effect",
    specialStat: "Area of Effect: increased",
    maxOutCost: 100,
    type: "heavy",
    modules: [
      { name: "Kinetic Actuator", desc: "+projectile speed" },
      { name: "Late Stage Propellant", desc: "+distant damage, -10% close damage" },
      { name: "Kinetic Potential Reporposer", desc: "+20% speed on kill" }
    ]
  }
];

const verifiedWeapons = [
  {
    id: "burstfire",
    name: "Burstfire",
    image: "/images/weapons/burstfire.png",
    damage: 950,
    damageType: "Physical",
    clipSize: 1,
    projectileAmount: 3,
    reloadTime: "1s",
    projectileSpeed: "22m/s",
    range: "19m",
    fireRate: "0.1/s",
    maxOutCost: 33,
    description: "Shoots quickfire bursts of fast projectiles",
    modules: [
      { name: "Classic", desc: "Standard burstfire configuration, no modifications" },
      { name: "Calibrated Burstfire", desc: "+200 last projectile damage, +4.4m/s first projectile speed, -4.8m/s last projectile speed" },
      { name: "Bombarding Burstfire", desc: "+2 projectile amount, -100 damage" }
    ]
  },
  {
    id: "cannon",
    name: "Cannon",
    image: "/images/weapons/cannon.png",
    damage: 1400,
    damageType: "Physical",
    clipSize: 3,
    reloadTime: "2.5s",
    projectileSpeed: "180m/s",
    range: "20m",
    maxOutCost: 100,
    description: "Can fire either a single shot or a quick burst of several rounds",
    modules: [
      { name: "Classic", desc: "Standard cannon configuration, no modifications" },
      { name: "Calibrated Cannon", desc: "-0.37s reload, +4.5m/s speed, reduced damage" },
      { name: "Weakening Cannon", desc: "6% WEAKNESS chance, +0.07s reload" }
    ]
  },
  {
    id: "gatling-gun",
    name: "Gatling Gun",
    image: "/images/weapons/gatling-gun.png",
    damage: 625,
    damageType: "Physical",
    clipSize: 30,
    reloadTime: "2.5s",
    projectileSpeed: "22m/s",
    range: "22m",
    fireRate: "0.167/s",
    windupTime: "0.6s",
    maxOutCost: 99,
    description: "Storm of bullets, requires warmup, slows while firing",
    modules: [
      { name: "Classic", desc: "Standard gatling gun configuration, no modifications" },
      { name: "Heavy Gatling Gun", desc: "+25% damage, +1s windup" },
      { name: "Rapid Gatling Gun", desc: "Faster fire, ELEMENTAL type, -100 damage" }
    ]
  },
  {
    id: "triple-threat",
    name: "Triple Threat",
    image: "/images/weapons/triple-threat.webp",
    damage: 650,
    damageType: "Physical",
    clipSize: 3,
    projectileAmount: 3,
    reloadTime: "1.8s",
    projectileSpeed: "27m/s",
    range: "19m",
    maxOutCost: 100,
    description: "Shoots quickfire bursts of fast projectiles",
    modules: [
      { name: "Classic", desc: "Standard triple threat configuration, no modifications" },
      { name: "Elemental Triple Threat", desc: "ELEMENTAL, variable projectile damage" },
      { name: "Deadly Triple Threat", desc: "Full ammo on kill, slower reload" }
    ]
  },
  {
    id: "rocket-artillery",
    name: "Rocket Artillery",
    image: "/images/weapons/rocket-artillery.png",
    damage: 666,
    damageType: "Physical",
    clipSize: 1,
    projectileAmount: 6,
    reloadTime: "1.95s",
    projectileSpeed: "50m/s",
    range: "19m",
    explosionDamage: 666,
    explosionRadius: "2.3m",
    maxOutCost: 100,
    description: "Launches a barrage of explosive rockets that descend on your enemies",
    modules: [
      { name: "Classic", desc: "Standard rocket artillery configuration, no modifications" },
      { name: "MLRS Rocket Artillery", desc: "+4 projectiles, -222 explosion dmg, can't move while firing" },
      { name: "Loaded Rocket Artillery", desc: "+1 clip size, +1.05s reload, can't move while firing" }
    ]
  },
  {
    id: "crossbow",
    name: "Crossbow",
    image: "/images/weapons/crossbow.png",
    damage: 2600,
    damageType: "Physical",
    clipSize: 1,
    chargeTime: "1.3s",
    reloadTime: "0.5s",
    projectileSpeed: "20.7m/s",
    range: "28m",
    maxOutCost: 100,
    description: "Fires large bolts that can pierce through enemies. Gets more powerful and longer range by drawing it back further.",
    modules: [
      { name: "Classic", desc: "Standard crossbow configuration, no modifications" },
      { name: "Static Crossbow", desc: "Fully charged fires static shocks at targets, +60 DoT/s, -243 direct damage" },
      { name: "Precise Crossbow", desc: "Fully charged +10.35m/s speed, uncharged -1.035m/s speed" }
    ]
  },
  {
    id: "repair-gun",
    name: "Repair Gun",
    image: "/images/weapons/repair-gun.png",
    damage: 750,
    damageType: "Elemental",
    clipSize: 6,
    reloadTime: "4s",
    projectileSpeed: "200m/s",
    range: "19m",
    projectileRepairing: 900,
    maxOutCost: 100,
    description: "Rapid fires healing energy at your allies. Can also be used to deal light damage to enemies.",
    modules: [
      { name: "Classic", desc: "Standard repair gun configuration, no modifications" },
      { name: "Vampiric Repair Gun", desc: "Projectiles have lifesteal, can no longer repair allies" },
      { name: "Explosive Repair Gun", desc: "AoE healing 2.5m radius, -100 repair, explosions can't self-repair" }
    ]
  },
  {
    id: "laser-blaster",
    name: "Laser Blaster",
    image: "/images/weapons/laser-blaster.png",
    damage: 550,
    damageType: "Elemental",
    clipSize: 4,
    reloadTime: "1.92s",
    projectileSpeed: "11m/s",
    range: "24m",
    maxOutCost: 100,
    description: "Projectiles get increasingly powerful per clip (1.15x increase)",
    modules: [
      { name: "Classic", desc: "Standard laser blaster configuration" },
      { name: "Temperamental Laser Blaster", desc: "80% DoT chance (1000/s for 2s), -10 damage" },
      { name: "Explosive Laser Blaster", desc: "Last shot explodes (+900 dmg, 3.35m), -900 projectile damage" }
    ]
  },
  {
    id: "finisher",
    name: "Finisher",
    image: "/images/weapons/finisher.png",
    damage: 2000,
    damageType: "Physical",
    clipSize: 1,
    reloadTime: "1.9s",
    projectileSpeed: "10m/s",
    range: "30m",
    explosionDamage: 2000,
    explosionRadius: "2.8m",
    maxOutCost: 100,
    description: "Auto-targets enemies with homing explosive torpedoes",
    modules: [
      { name: "Classic", desc: "Standard finisher configuration" },
      { name: "Seeking Finisher", desc: "Better homing, -400 projectile & explosion damage" },
      { name: "Deadly Finisher", desc: "+2.2m/s speed on kill, -range" }
    ]
  },
  {
    id: "eggxecutioner",
    name: "Eggxecutioner",
    image: "/images/weapons/eggxecutioner.png",
    damage: 1350,
    damageType: "Physical",
    clipSize: 3,
    reloadTime: "3.25s",
    projectileSpeed: "18.5m/s",
    range: "19m",
    explosionRadius: "2.5m",
    maxOutCost: 100,
    description: "Launches eggsplosive projectiles that detonate on impact or at max range",
    modules: [
      { name: "Classic", desc: "Standard eggxecutioner configuration" },
      { name: "Aggressive Eggxecutioner", desc: "+200 projectile damage, -200 explosion damage" },
      { name: "Persistent Eggxecutioner", desc: "Missed shots plant mines, -4.85m range" }
    ]
  },
  {
    id: "beat-blaster",
    name: "Beat Blaster",
    image: "/images/weapons/beat-blaster.png",
    damage: 750,
    damageType: "Physical",
    clipSize: 1,
    projectileAmount: 3,
    reloadTime: "1.25s",
    projectileSpeed: "18.9m/s",
    range: "19m",
    fireRate: "0.1/s",
    maxOutCost: 100,
    description: "Sound waves push enemies with thumping bass knockback",
    modules: [
      { name: "Classic", desc: "Standard beat blaster configuration" },
      { name: "Elemental Beat Blaster", desc: "ELEMENTAL type, DoT+Knockback, 97% status chance, -275 damage" },
      { name: "Stronger Beat Blaster", desc: "Single shot +1220 damage, +20% knockback chance" }
    ]
  }
];

export default function PartsDatabase() {
  const [activeTab, setActiveTab] = useState<"bodies" | "weapons">("bodies");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-orange-500 bg-clip-text text-transparent mb-2">
          Parts Database
        </h2>
        <p className="text-gray-400">Verified stats from Cores of Chaos - Updated as we unlock more!</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("bodies")}
          className={`px-6 py-3 rounded-lg font-bold transition-all ${
            activeTab === "bodies"
              ? "bg-cyan-500 text-black"
              : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30"
          }`}
        >
          Tank Bodies ({verifiedBodies.length})
        </button>
        <button
          onClick={() => setActiveTab("weapons")}
          className={`px-6 py-3 rounded-lg font-bold transition-all ${
            activeTab === "weapons"
              ? "bg-orange-500 text-black"
              : "bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30"
          }`}
        >
          Weapons ({verifiedWeapons.length})
        </button>
      </div>

      {/* Bodies Grid */}
      {activeTab === "bodies" && (
        <div className="grid md:grid-cols-2 gap-6">
          {verifiedBodies.map((body) => (
            <div
              key={body.id}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-cyan-500/30 rounded-lg overflow-hidden"
            >
              {/* Header */}
              <div className="bg-cyan-500/20 px-4 py-3 border-b border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-cyan-400">{body.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    body.type === "light" ? "bg-green-500/20 text-green-400" :
                    body.type === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {body.type.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4 space-y-3">
                {/* Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden border border-cyan-500/20">
                    <img
                      src={body.image}
                      alt={body.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-300 italic mb-3">{body.passive}</div>

                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-black/30 rounded p-2 text-center">
                    <div className="text-red-400 font-bold">{body.armor}</div>
                    <div className="text-xs text-gray-500">ARMOR</div>
                  </div>
                  <div className="bg-black/30 rounded p-2 text-center">
                    <div className="text-green-400 font-bold">{body.speed}</div>
                    <div className="text-xs text-gray-500">SPEED</div>
                  </div>
                  <div className="bg-black/30 rounded p-2 text-center">
                    <div className="text-blue-400 font-bold">{body.energy}</div>
                    <div className="text-xs text-gray-500">ENERGY</div>
                  </div>
                </div>

                <div className="text-sm text-cyan-300 bg-cyan-500/10 rounded px-3 py-2">
                  {body.specialStat}
                </div>

                {/* Modules */}
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="text-xs text-gray-500 mb-2">MODULES</div>
                  <div className="space-y-2">
                    {body.modules.map((mod, i) => (
                      <div key={i} className="bg-orange-500/10 border border-orange-500/20 rounded p-2">
                        <div className="text-sm font-semibold text-orange-400">{mod.name}</div>
                        <div className="text-xs text-gray-400">{mod.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-right">
                  Max Out: <span className="text-yellow-400">{body.maxOutCost} Arachnium</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Weapons Grid */}
      {activeTab === "weapons" && (
        <div className="grid md:grid-cols-2 gap-6">
          {verifiedWeapons.map((weapon) => (
            <div
              key={weapon.id}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-orange-500/30 rounded-lg overflow-hidden"
            >
              {/* Header */}
              <div className="bg-orange-500/20 px-4 py-3 border-b border-orange-500/30">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-orange-400">{weapon.name}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-orange-500/20 text-orange-400">
                    {weapon.damageType.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4 space-y-3">
                {/* Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden border border-orange-500/20">
                    <img
                      src={weapon.image}
                      alt={weapon.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-300 italic mb-3">{weapon.description}</div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-black/30 rounded p-2">
                    <span className="text-gray-500">Damage:</span>
                    <span className="text-orange-400 font-bold ml-2">{weapon.damage}</span>
                  </div>
                  <div className="bg-black/30 rounded p-2">
                    <span className="text-gray-500">Range:</span>
                    <span className="text-green-400 font-bold ml-2">{weapon.range}</span>
                  </div>
                  <div className="bg-black/30 rounded p-2">
                    <span className="text-gray-500">Clip:</span>
                    <span className="text-cyan-400 font-bold ml-2">{weapon.clipSize}</span>
                  </div>
                  <div className="bg-black/30 rounded p-2">
                    <span className="text-gray-500">Reload:</span>
                    <span className="text-yellow-400 font-bold ml-2">{weapon.reloadTime}</span>
                  </div>
                </div>

                {(weapon.fireRate || weapon.windupTime || weapon.projectileAmount) && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {weapon.projectileSpeed && (
                      <div className="bg-black/30 rounded p-2">
                        <span className="text-gray-500">Speed:</span>
                        <span className="text-blue-400 font-bold ml-2">{weapon.projectileSpeed}</span>
                      </div>
                    )}
                    {weapon.fireRate && (
                      <div className="bg-black/30 rounded p-2">
                        <span className="text-gray-500">Fire Rate:</span>
                        <span className="text-pink-400 font-bold ml-2">{weapon.fireRate}</span>
                      </div>
                    )}
                    {weapon.windupTime && (
                      <div className="bg-black/30 rounded p-2">
                        <span className="text-gray-500">Windup:</span>
                        <span className="text-red-400 font-bold ml-2">{weapon.windupTime}</span>
                      </div>
                    )}
                    {weapon.projectileAmount && (
                      <div className="bg-black/30 rounded p-2">
                        <span className="text-gray-500">Projectiles:</span>
                        <span className="text-orange-400 font-bold ml-2">{weapon.projectileAmount}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Modules */}
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="text-xs text-gray-500 mb-2">MODULES</div>
                  <div className="space-y-2">
                    {weapon.modules.map((mod, i) => (
                      <div key={i} className="bg-cyan-500/10 border border-cyan-500/20 rounded p-2">
                        <div className="text-sm font-semibold text-cyan-400">{mod.name}</div>
                        <div className="text-xs text-gray-400">{mod.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-right">
                  Max Out: <span className="text-yellow-400">{weapon.maxOutCost} Arachnium</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8 text-gray-500 text-sm">
        More parts coming as we unlock them! Help us by sharing screenshots.
      </div>
    </div>
  );
}
