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
    image: "/images/bodies/pawn.png",
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
  }
];

const verifiedWeapons = [
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
    image: "/images/weapons/triple-threat.png",
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
  }
];

export default function PartsDatabase() {
  const [activeTab, setActiveTab] = useState<"bodies" | "weapons">("bodies");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
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
              ? "bg-purple-500 text-black"
              : "bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30"
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
                      <div key={i} className="bg-purple-500/10 border border-purple-500/20 rounded p-2">
                        <div className="text-sm font-semibold text-purple-400">{mod.name}</div>
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
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-purple-500/30 rounded-lg overflow-hidden"
            >
              {/* Header */}
              <div className="bg-purple-500/20 px-4 py-3 border-b border-purple-500/30">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-purple-400">{weapon.name}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-orange-500/20 text-orange-400">
                    {weapon.damageType.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4 space-y-3">
                {/* Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden border border-purple-500/20">
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
                        <span className="text-purple-400 font-bold ml-2">{weapon.projectileAmount}</span>
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
