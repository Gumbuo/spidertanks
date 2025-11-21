"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useHoverSound } from "../hooks/useHoverSound";

interface DraggablePartProps {
  id: string;
  data: any;
  type: "body" | "weapon" | "ability" | "module";
}

export function DraggablePart({ id, data, type }: DraggablePartProps) {
  const playHoverSound = useHoverSound();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseEnter={playHoverSound}
      className="bg-gradient-to-b from-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-cyan-500/50 transition-all"
    >
      {/* Part image */}
      <div className="aspect-square bg-black/50 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-xs font-bold text-cyan-400 mb-1 truncate">{data.name}</div>

      {type === "body" && (
        <div className="text-[10px] text-gray-400 space-y-0.5">
          <div>HP: {data.armor}</div>
          <div>SPD: {data.speed}</div>
        </div>
      )}

      {type === "weapon" && (
        <div className="text-[10px] text-gray-400 space-y-0.5">
          <div>DMG: {data.damage}</div>
          <div>RNG: {data.range}</div>
        </div>
      )}

      {type === "ability" && (
        <div className="text-[10px] text-gray-400 space-y-0.5">
          <div>Energy: {data.energy}</div>
          {data.damage > 0 && <div>DMG: {data.damage}</div>}
        </div>
      )}

      {type === "module" && (
        <div className="text-[10px] text-gray-400 space-y-0.5">
          {data.armorBonus !== 0 && <div>HP: {data.armorBonus > 0 ? '+' : ''}{data.armorBonus}</div>}
          {data.speedBonus !== 0 && <div>SPD: {data.speedBonus > 0 ? '+' : ''}{data.speedBonus}</div>}
          {data.energyBonus !== 0 && <div>NRG: {data.energyBonus > 0 ? '+' : ''}{data.energyBonus}</div>}
          {data.damageBonus !== 0 && <div>DMG: {data.damageBonus > 0 ? '+' : ''}{data.damageBonus}</div>}
          {data.rangeBonus !== 0 && <div>RNG: {data.rangeBonus > 0 ? '+' : ''}{data.rangeBonus}</div>}
        </div>
      )}
    </div>
  );
}
