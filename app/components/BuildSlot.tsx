"use client";

import { useDroppable } from "@dnd-kit/core";

interface BuildSlotProps {
  id: string;
  label: string;
  item: any;
  type: "body" | "weapon" | "ability" | "module";
  isActive?: boolean;
  onActivate?: () => void;
}

export function BuildSlot({ id, label, item, type, isActive, onActivate }: BuildSlotProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const handleClick = () => {
    if (type === "module" && item && onActivate) {
      onActivate();
    }
  };

  return (
    <div
      ref={setNodeRef}
      onClick={handleClick}
      className={`border-2 border-dashed rounded-lg p-4 transition-all ${
        isOver
          ? "border-cyan-400 bg-cyan-500/20"
          : isActive
          ? "border-green-400 bg-green-500/20 ring-2 ring-green-400"
          : item
          ? "border-cyan-500/50 bg-cyan-500/10"
          : "border-gray-600 bg-black/30"
      } ${type === "module" && item ? "cursor-pointer hover:border-cyan-400" : ""}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-bold text-gray-400">{label}</div>
        {isActive && <div className="text-xs font-bold text-green-400 px-2 py-0.5 bg-green-500/20 rounded">ACTIVE</div>}
      </div>

      {item ? (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`font-bold text-sm truncate ${isActive ? "text-green-400" : "text-cyan-400"}`}>{item.name}</div>
            <div className="text-xs text-gray-400 truncate">{item.description}</div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 text-sm">
          Drag a {type} here
        </div>
      )}
    </div>
  );
}
