"use client";

import { useState } from "react";
import { TankBuild } from "./TankBuilder";

interface StatsDisplayProps {
  build: TankBuild;
}

export function StatsDisplay({ build }: StatsDisplayProps) {
  const { body, weapon } = build;
  const [level, setLevel] = useState(10);

  // Scale stat based on level (assuming data is level 10)
  // Level 1 = 50% of stats, Level 10 = 100% of stats
  const scaleStat = (baseStat: number) => {
    return baseStat * (0.5 + (level / 10) * 0.5);
  };

  // Calculate total stats with level scaling
  const totalArmor = scaleStat(body?.armor || 0);
  const totalSpeed = scaleStat(body?.speed || 0);
  const totalEnergy = scaleStat(body?.energy || 0);
  const weaponDamage = scaleStat(weapon?.damage || 0);
  const weaponRange = scaleStat(weapon?.range || 0);

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

      {/* Level Slider */}
      {body && (
        <div className="mb-6 pb-4 border-b border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-gray-400">LEVEL</label>
            <span className="text-2xl font-bold text-cyan-400">{level}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(level - 1) * 11.11}%, #1f2937 ${(level - 1) * 11.11}%, #1f2937 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
      )}

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
