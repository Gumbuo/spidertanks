"use client";

import { TankBuild } from "./TankBuilder";

interface StatsDisplayProps {
  build: TankBuild;
}

export function StatsDisplay({ build }: StatsDisplayProps) {
  const { body, weapon, bodyLevel, weaponLevel, selectedBodyModule, selectedWeaponModule } = build;

  // Get active modules from the part's built-in modules
  const activeBodyMod = selectedBodyModule !== null && body?.modules ? body.modules[selectedBodyModule] : null;
  const activeWeaponMod = selectedWeaponModule !== null && weapon?.modules ? weapon.modules[selectedWeaponModule] : null;

  // Scale stat based on part's individual level (assuming data is level 10)
  // Level 1 = 50% of stats, Level 10 = 100% of stats
  const scaleBodyStat = (baseStat: number) => {
    return baseStat * (0.5 + (bodyLevel / 10) * 0.5);
  };

  const scaleWeaponStat = (baseStat: number) => {
    return baseStat * (0.5 + (weaponLevel / 10) * 0.5);
  };

  // Calculate total stats with level scaling and module bonuses
  const totalArmor = scaleBodyStat(body?.armor || 0) + (activeBodyMod?.armorBonus || 0);
  const totalSpeed = scaleBodyStat(body?.speed || 0) + (activeBodyMod?.speedBonus || 0);
  const totalEnergy = scaleBodyStat(body?.energy || 0) + (activeBodyMod?.energyBonus || 0);
  const weaponDamage = scaleWeaponStat(weapon?.damage || 0) + (activeWeaponMod?.damageBonus || 0);
  const weaponRange = scaleWeaponStat(weapon?.range || 0) + (activeWeaponMod?.rangeBonus || 0);

  return (
    <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-6">
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          border: 2px solid #0e7490;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          border: 2px solid #0e7490;
        }
      `}</style>
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Build Stats</h2>

      {!body ? (
        <div className="text-center text-gray-500 py-8">
          Select a body to see stats
        </div>
      ) : (
        <div className="space-y-4">
          {/* Body Stats */}
          <div>
            <h3 className="text-sm font-bold text-gray-400 mb-2">BODY STATS</h3>
            <div className="space-y-2">
              <StatBar label="Armor" value={totalArmor} max={11000} color="red" />
              <StatBar label="Speed" value={totalSpeed} max={800} color="green" />
              <StatBar label="Energy/s" value={totalEnergy} max={0.35} color="blue" decimals={3} />
            </div>
          </div>

          {/* Weapon Stats */}
          {weapon && (
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-2">WEAPON STATS</h3>
              <div className="space-y-2">
                <StatBar label="Damage" value={weaponDamage} max={7000} color="orange" />
                <StatBar label="Range" value={weaponRange} max={30} color="purple" />
                <div className="text-xs text-gray-400">
                  <span className="font-bold">Type:</span> {weapon.type} |
                  <span className="font-bold ml-2">Damage Type:</span> {weapon.damageType}
                </div>
              </div>
            </div>
          )}

          {/* Build Summary */}
          <div className="pt-4 border-t border-cyan-500/20">
            <div className="text-xs text-gray-400 space-y-1">
              <div><span className="font-bold">Body Type:</span> {body.type}</div>
              {weapon && <div><span className="font-bold">Weapon:</span> {weapon.name}</div>}
            </div>
          </div>

          {/* Active Modules */}
          {(activeBodyMod || activeWeaponMod) && (
            <div className="pt-4 border-t border-cyan-500/20">
              <h3 className="text-sm font-bold text-green-400 mb-2">ACTIVE MODULES</h3>
              <div className="text-xs text-gray-400 space-y-2">
                {activeBodyMod && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <div className="font-bold text-green-400 mb-1">Body: {activeBodyMod.name}</div>
                    <div className="text-[10px] space-y-0.5">
                      {activeBodyMod.armorBonus !== 0 && <div>HP: {activeBodyMod.armorBonus > 0 ? '+' : ''}{activeBodyMod.armorBonus}</div>}
                      {activeBodyMod.speedBonus !== 0 && <div>Speed: {activeBodyMod.speedBonus > 0 ? '+' : ''}{activeBodyMod.speedBonus}</div>}
                      {activeBodyMod.energyBonus !== 0 && <div>Energy/s: {activeBodyMod.energyBonus > 0 ? '+' : ''}{activeBodyMod.energyBonus}</div>}
                    </div>
                  </div>
                )}
                {activeWeaponMod && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <div className="font-bold text-green-400 mb-1">Weapon: {activeWeaponMod.name}</div>
                    <div className="text-[10px] space-y-0.5">
                      {activeWeaponMod.damageBonus !== 0 && <div>Damage: {activeWeaponMod.damageBonus > 0 ? '+' : ''}{activeWeaponMod.damageBonus}</div>}
                      {activeWeaponMod.rangeBonus !== 0 && <div>Range: {activeWeaponMod.rangeBonus > 0 ? '+' : ''}{activeWeaponMod.rangeBonus}</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface StatBarProps {
  label: string;
  value: number;
  max: number;
  color: "red" | "green" | "blue" | "orange" | "purple";
  decimals?: number;
}

function StatBar({ label, value, max, color, decimals = 0 }: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClasses = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
  };

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-cyan-400 font-bold">{value.toFixed(decimals)}</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
