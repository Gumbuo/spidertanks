"use client";

import { TankBuild } from "./TankBuilder";

interface StatsDisplayProps {
  build: TankBuild;
}

export function StatsDisplay({ build }: StatsDisplayProps) {
  const { body, weapon, ability1, ability2 } = build;

  // Calculate total stats
  const totalArmor = body?.armor || 0;
  const totalSpeed = body?.speed || 0;
  const totalEnergy = body?.energy || 0;
  const weaponDamage = weapon?.damage || 0;
  const weaponRange = weapon?.range || 0;

  const ability1Energy = ability1?.energy || 0;
  const ability2Energy = ability2?.energy || 0;
  const totalAbilityEnergy = ability1Energy + ability2Energy;

  return (
    <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-6">
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

          {/* Ability Stats */}
          {(ability1 || ability2) && (
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-2">ABILITIES</h3>
              <div className="space-y-2">
                {ability1 && (
                  <div className="text-xs bg-cyan-500/10 border border-cyan-500/20 rounded p-2">
                    <div className="font-bold text-cyan-400">{ability1.name}</div>
                    <div className="text-gray-400">Energy: {ability1.energy} | Duration: {ability1.lifetime}s</div>
                  </div>
                )}
                {ability2 && (
                  <div className="text-xs bg-cyan-500/10 border border-cyan-500/20 rounded p-2">
                    <div className="font-bold text-cyan-400">{ability2.name}</div>
                    <div className="text-gray-400">Energy: {ability2.energy} | Duration: {ability2.lifetime}s</div>
                  </div>
                )}
                <div className="text-xs text-gray-400 font-bold">
                  Total Ability Energy: {totalAbilityEnergy}
                </div>
              </div>
            </div>
          )}

          {/* Build Summary */}
          <div className="pt-4 border-t border-cyan-500/20">
            <div className="text-xs text-gray-400 space-y-1">
              <div><span className="font-bold">Body Type:</span> {body.type}</div>
              {weapon && <div><span className="font-bold">Weapon:</span> {weapon.name}</div>}
              <div><span className="font-bold">Abilities:</span> {ability1 && ability2 ? 2 : ability1 || ability2 ? 1 : 0}/2</div>
            </div>
          </div>
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
