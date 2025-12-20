"use client";

import { useState } from "react";

interface BuildAbility {
  name: string;
  reason: string;
}

interface Build {
  id: string;
  name: string;
  tier: string;
  playstyle: string;
  description: string;
  body: { name: string; module: string; reason: string };
  weapon: { name: string; module: string; reason: string };
  abilities: BuildAbility[];
  synergy: string;
}

const builds: Build[] = [
  {
    id: "turret-master",
    name: "Turret Master",
    tier: "S",
    playstyle: "Area Control",
    description: "Maximize turret damage with Junker's +20% turret damage passive.",
    body: { name: "Junker", module: "Aftermarket Turrets", reason: "+20% turret damage passive stacks with turret abilities" },
    weapon: { name: "Gatling Gun", module: "Heavy Gatling Gun", reason: "Sustained DPS while turrets provide area denial" },
    abilities: [
      { name: "Artillery Turret", reason: "Massive area damage boosted by Junker passive" },
      { name: "Machine Gun Turret", reason: "Sustained zone control" }
    ],
    synergy: "Junker's +20% turret damage applies to ALL placed turrets, making this the ultimate turret build."
  },
  {
    id: "vampire-support",
    name: "Vampire Support",
    tier: "S",
    playstyle: "Support/Sustain",
    description: "Heal yourself and allies while dealing damage with Repair Gun.",
    body: { name: "Titan", module: "Kinetic Stabilizer", reason: "High HP pool + increased damage output" },
    weapon: { name: "Repair Gun", module: "Vampiric Repair Gun", reason: "Damage enemies while healing yourself" },
    abilities: [
      { name: "Repair Zone", reason: "Area team healing for objective control" },
      { name: "Shield Projector", reason: "Protect teammates during pushes" }
    ],
    synergy: "Vampiric Repair Gun heals you for damage dealt, combined with Repair Zone creates unkillable support tank."
  },
  {
    id: "speed-assassin",
    name: "Speed Assassin",
    tier: "S",
    playstyle: "Flanker",
    description: "Hit and run tactics with extreme mobility.",
    body: { name: "Flea", module: "Speed Boost", reason: "Already fastest body becomes even faster" },
    weapon: { name: "Shotgun", module: "Damage Boost", reason: "High burst damage at close range" },
    abilities: [
      { name: "Speed Booster", reason: "Stack speed for insane mobility" },
      { name: "Cloak Drone", reason: "Invisible approach for ambushes" }
    ],
    synergy: "Flea's speed + Speed Booster + Cloak = invisible flanking nightmare that deletes squishies."
  },
  {
    id: "anti-healer",
    name: "Anti-Healer",
    tier: "S",
    playstyle: "Counter Pick",
    description: "Shut down enemy healing with Bandit's -20% anti-repair passive.",
    body: { name: "Bandit", module: "Energy Absorbing Dash Drive", reason: "Anti-repair on hit + steal 20% energy on dash" },
    weapon: { name: "Gatling Gun", module: "Rapid Gatling Gun", reason: "High hit rate to apply anti-repair constantly" },
    abilities: [
      { name: "Speed Booster", reason: "Chase down healers and supports" },
      { name: "Grapnel Launcher", reason: "Gap closer for aggressive plays" }
    ],
    synergy: "Bandit's -20% anti-repair debuff on EVERY hit counters heal-heavy teams. Energy theft dash denies ability usage."
  },
  {
    id: "chain-killer",
    name: "Chain Killer",
    tier: "S",
    playstyle: "Burst Damage",
    description: "Enemies explode on death, causing chain reactions in team fights.",
    body: { name: "Chicken", module: "Eggnite Payload Replacement", reason: "Body explosions + 50% increased AoE" },
    weapon: { name: "Rocket Artillery", module: "MLRS Rocket Artillery", reason: "10-rocket barrage for team wipes" },
    abilities: [
      { name: "Grenade", reason: "Burst damage to trigger explosions" },
      { name: "Air Strike", reason: "Massive AoE to set up chain kills" }
    ],
    synergy: "Kill one enemy, they explode for 500 damage. In team fights, one kill triggers chain explosions."
  },
  {
    id: "artillery-sniper",
    name: "Artillery Sniper",
    tier: "A",
    playstyle: "Long Range",
    description: "Maximum range damage dealer that zones entire areas.",
    body: { name: "Nomad", module: "Armor Boost", reason: "Good balance of speed and survivability" },
    weapon: { name: "Railgun", module: "Range Boost", reason: "6500 damage shots at extended range" },
    abilities: [
      { name: "Relay Drone", reason: "Extend weapon range even further" },
      { name: "Air Strike", reason: "Area denial for objective control" }
    ],
    synergy: "Relay Drone extends Railgun range to absurd levels. Air Strike zones enemies into your crosshairs."
  },
  {
    id: "crowd-controller",
    name: "Crowd Controller",
    tier: "A",
    playstyle: "Debuff/Control",
    description: "Lock down enemies and control the battlefield.",
    body: { name: "Titan", module: "Equilibrium Plating", reason: "Explode on death for last laugh" },
    weapon: { name: "Flamethrower", module: "Damage Boost", reason: "DoT damage while enemies are slowed" },
    abilities: [
      { name: "Stun Grenade", reason: "Hard CC for setup" },
      { name: "Vortex Zone", reason: "Pull enemies together for combos" }
    ],
    synergy: "Vortex pulls enemies together, Stun Grenade locks them in place, Flamethrower melts the group."
  },
  {
    id: "explosive-specialist",
    name: "Explosive Specialist",
    tier: "A",
    playstyle: "Burst Damage",
    description: "Everything explodes. Maximum chaos.",
    body: { name: "Junker", module: "Plasma Shield Transfer", reason: "+300% turret armor for durable explosives" },
    weapon: { name: "Eggxecutioner", module: "Persistent Eggxecutioner", reason: "Explosive projectiles + mine placement on miss" },
    abilities: [
      { name: "Grenade", reason: "More explosions" },
      { name: "Artillery Turret", reason: "Explosive turret with Junker bonus" }
    ],
    synergy: "Layer explosions: Eggxecutioner + Grenades + Artillery Turret = no safe zones for enemies."
  },
  {
    id: "graviton-pusher",
    name: "Graviton Pusher",
    tier: "A",
    playstyle: "Debuff/Control",
    description: "Control enemy positioning with Hurricane's knockback passive.",
    body: { name: "Hurricane", module: "Graviton Affinity Regulators", reason: "Push enemies on damage + cheaper/longer Vortex & Repulsor" },
    weapon: { name: "Beat Blaster", module: "Stronger Beat Blaster", reason: "Extra knockback chance on shots" },
    abilities: [
      { name: "Repulsor Zone", reason: "Push enemies off objectives" },
      { name: "Vortex Zone", reason: "Pull enemies into danger zones" }
    ],
    synergy: "Hurricane pushes on every hit. Vortex pulls enemies together, then Repulsor scatters them off cliffs."
  },
  {
    id: "distant-sniper",
    name: "Distant Sniper",
    tier: "A",
    playstyle: "Long Range",
    description: "Muzzle's +10% distant damage makes long-range weapons even deadlier.",
    body: { name: "Muzzle", module: "Hybrid Propellant", reason: "+10% distant damage + faster reload/projectiles on kill" },
    weapon: { name: "Crossbow", module: "Precise Crossbow", reason: "2600 damage bolts with increased projectile speed" },
    abilities: [
      { name: "Relay Drone", reason: "Extend already long crossbow range" },
      { name: "Smoke Canister", reason: "Cover for repositioning" }
    ],
    synergy: "Muzzle's distant damage bonus stacks with Crossbow's pierce. Kills boost reload speed for rapid follow-ups."
  },
  {
    id: "relay-speedster",
    name: "Relay Speedster",
    tier: "A",
    playstyle: "Flanker",
    description: "Blink's Relay Drone passive grants speed boost for hit-and-run.",
    body: { name: "Blink", module: "Realigning Relay Protocols", reason: "Speed boost after deploying ANY ability" },
    weapon: { name: "Laser Blaster", module: "Temperamental Laser Blaster", reason: "80% chance DoT stacks while you kite" },
    abilities: [
      { name: "Relay Drone", reason: "Triggers Blink's speed passive + extends range" },
      { name: "Speed Booster", reason: "Stack with Blink's passive for insane speed" }
    ],
    synergy: "Deploy Relay Drone for speed boost, kite with Laser Blaster DoT. Enemies can't catch you."
  },
  {
    id: "aoe-specialist",
    name: "AoE Specialist",
    tier: "A",
    playstyle: "Area Control",
    description: "Shark's increased AoE passive amplifies all splash damage.",
    body: { name: "Shark", module: "Late Stage Propellant", reason: "Increased AoE + bonus distant damage" },
    weapon: { name: "Fire Artillery", module: "Range Boost", reason: "Ground fire zones with extended AoE" },
    abilities: [
      { name: "Air Strike", reason: "Massive strike zone with Shark's AoE boost" },
      { name: "Grenade", reason: "Bigger explosion radius" }
    ],
    synergy: "Shark's AoE passive makes every explosion bigger. Fire Artillery zones become massive danger areas."
  },
  {
    id: "team-healer",
    name: "Team Healer",
    tier: "B",
    playstyle: "Support/Sustain",
    description: "Pawn's +7% repair aura boosts team sustain in 16m radius.",
    body: { name: "Pawn", module: "Flux Deployment Boosters", reason: "+7% repair effectiveness aura for team" },
    weapon: { name: "Repair Artillery", module: "Range Boost", reason: "Arced healing from safety" },
    abilities: [
      { name: "Repair Drone", reason: "Personal sustain while healing team" },
      { name: "Repair Zone", reason: "Stacking heal zones with aura" }
    ],
    synergy: "Pawn's +7% repair aura stacks with Repair Zone. Team receives amplified healing when grouped."
  },
  {
    id: "burning-trail",
    name: "Burning Trail",
    tier: "B",
    playstyle: "Flanker",
    description: "Tracks' Combustible Dash leaves fire behind as you move.",
    body: { name: "Tracks", module: "Combustible Dash Drive", reason: "Dash leaves burning trail damaging enemies" },
    weapon: { name: "Flamethrower", module: "Damage Boost", reason: "More fire theme, DoT stacking" },
    abilities: [
      { name: "Speed Booster", reason: "More dashes = more burning trails" },
      { name: "Grenade", reason: "Extra burst damage" }
    ],
    synergy: "Dash through enemies leaving fire. Flamethrower adds more DoT. Burning trail build for chaos."
  },
  {
    id: "homing-missile",
    name: "Homing Missile",
    tier: "B",
    playstyle: "Long Range",
    description: "Finisher's seeking missiles hunt down enemies automatically.",
    body: { name: "Shark", module: "Kinetic Actuator", reason: "High armor + faster projectiles for missiles" },
    weapon: { name: "Finisher", module: "Seeking Finisher", reason: "Enhanced homing effect tracks enemies" },
    abilities: [
      { name: "Relay Drone", reason: "Extended range for missile tracking" },
      { name: "Decoy", reason: "Distraction while missiles lock on" }
    ],
    synergy: "Fire and forget missiles that chase enemies. Decoy distracts while Finisher locks on targets."
  },
  {
    id: "acid-controller",
    name: "Acid Controller",
    tier: "B",
    playstyle: "Debuff/Control",
    description: "Stinger's acid slows and damages over time for area denial.",
    body: { name: "Titan", module: "Disruptive Relay Protocols", reason: "Relay Drone triggers earthquake + slow" },
    weapon: { name: "Stinger", module: "Damage Boost", reason: "Acid blobs slow + DoT enemies" },
    abilities: [
      { name: "Vortex Zone", reason: "Pull enemies into acid pools" },
      { name: "Relay Drone", reason: "Triggers earthquake for extra slow/damage" }
    ],
    synergy: "Vortex pulls enemies together, Stinger's acid melts them. Relay Drone earthquake adds more CC."
  }
];

const tierColors: Record<string, string> = {
  S: "from-yellow-400 to-orange-500",
  A: "from-blue-400 to-cyan-500",
  B: "from-gray-400 to-gray-500"
};

const tierBorderColors: Record<string, string> = {
  S: "border-yellow-500/50",
  A: "border-cyan-500/50",
  B: "border-gray-500/50"
};

const playstyleColors: Record<string, string> = {
  "Area Control": "bg-purple-500/20 text-purple-400",
  "Support/Sustain": "bg-green-500/20 text-green-400",
  "Flanker": "bg-red-500/20 text-red-400",
  "Long Range": "bg-blue-500/20 text-blue-400",
  "Debuff/Control": "bg-orange-500/20 text-orange-400",
  "Burst Damage": "bg-pink-500/20 text-pink-400",
  "Counter Pick": "bg-yellow-500/20 text-yellow-400"
};

export default function BuildsSection() {
  const [expandedBuild, setExpandedBuild] = useState<string | null>(null);
  const [filterTier, setFilterTier] = useState<string>("all");

  const filteredBuilds = filterTier === "all"
    ? builds
    : builds.filter(b => b.tier === filterTier);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Recommended Builds
        </h2>
        <p className="text-gray-400">Optimized tank builds for different playstyles</p>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        {["all", "S", "A", "B"].map((tier) => (
          <button
            key={tier}
            onClick={() => setFilterTier(tier)}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              filterTier === tier
                ? tier === "all"
                  ? "bg-cyan-500 text-black"
                  : `bg-gradient-to-r ${tierColors[tier]} text-black`
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {tier === "all" ? "All Tiers" : `${tier} Tier`}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuilds.map((build) => (
          <div
            key={build.id}
            className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 border ${tierBorderColors[build.tier]} rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-[1.02]`}
            onClick={() => setExpandedBuild(expandedBuild === build.id ? null : build.id)}
          >
            <div className={`bg-gradient-to-r ${tierColors[build.tier]} px-4 py-3`}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-black">{build.name}</h3>
                <span className="text-xs px-2 py-1 rounded bg-black/20 text-black font-bold">
                  {build.tier} TIER
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${playstyleColors[build.playstyle]}`}>
                  {build.playstyle}
                </span>
              </div>

              <p className="text-sm text-gray-300">{build.description}</p>

              {expandedBuild !== build.id && (
                <div className="text-xs text-gray-500 text-center pt-2">
                  Click to expand details
                </div>
              )}

              {expandedBuild === build.id && (
                <div className="space-y-3 border-t border-gray-700 pt-3">
                  <div className="bg-black/30 rounded p-3">
                    <div className="text-xs text-gray-500 mb-1">BODY</div>
                    <div className="text-cyan-400 font-bold">{build.body.name}</div>
                    <div className="text-xs text-gray-400">Module: {build.body.module}</div>
                    <div className="text-xs text-green-400 mt-1">{build.body.reason}</div>
                  </div>

                  <div className="bg-black/30 rounded p-3">
                    <div className="text-xs text-gray-500 mb-1">WEAPON</div>
                    <div className="text-red-400 font-bold">{build.weapon.name}</div>
                    <div className="text-xs text-gray-400">Module: {build.weapon.module}</div>
                    <div className="text-xs text-green-400 mt-1">{build.weapon.reason}</div>
                  </div>

                  <div className="bg-black/30 rounded p-3">
                    <div className="text-xs text-gray-500 mb-1">ABILITIES</div>
                    {build.abilities.map((ability, i) => (
                      <div key={i} className="mb-2 last:mb-0">
                        <div className="text-purple-400 font-bold">{ability.name}</div>
                        <div className="text-xs text-green-400">{ability.reason}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded p-3">
                    <div className="text-xs text-yellow-500 mb-1">SYNERGY</div>
                    <div className="text-sm text-yellow-200">{build.synergy}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 text-gray-500 text-sm">
        These builds are based on community experience. Meta may shift with balance updates!
      </div>
    </div>
  );
}
