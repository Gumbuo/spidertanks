"use client";

import { useDroppable } from "@dnd-kit/core";

interface BuildSlotProps {
  id: string;
  label: string;
  item: any;
  type: "body" | "weapon" | "ability";
}

export function BuildSlot({ id, label, item, type }: BuildSlotProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`border-2 border-dashed rounded-lg p-4 transition-all ${
        isOver
          ? "border-cyan-400 bg-cyan-500/20"
          : item
          ? "border-cyan-500/50 bg-cyan-500/10"
          : "border-gray-600 bg-black/30"
      }`}
    >
      <div className="text-sm font-bold text-gray-400 mb-2">{label}</div>

      {item ? (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-cyan-400 text-sm truncate">{item.name}</div>
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
