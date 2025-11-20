"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import bodies from "../data/bodies.json";
import weapons from "../data/weapons.json";
import abilities from "../data/abilities.json";
import { DraggablePart } from "./DraggablePart";
import { BuildSlot } from "./BuildSlot";
import { StatsDisplay } from "./StatsDisplay";
import Comments from "./Comments";

export interface TankBuild {
  body: typeof bodies[0] | null;
  weapon: typeof weapons[0] | null;
  ability1: typeof abilities[0] | null;
  ability2: typeof abilities[0] | null;
}

export default function TankBuilder() {
  const [build, setBuild] = useState<TankBuild>({
    body: null,
    weapon: null,
    ability1: null,
    ability2: null,
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"bodies" | "weapons" | "abilities">("bodies");
  const [activeItem, setActiveItem] = useState<any>(null);

  function handleDragStart(event: DragStartEvent) {
    const itemId = event.active.id as string;
    setActiveId(itemId);

    // Find and store the active item
    const body = bodies.find((b) => b.id === itemId);
    const weapon = weapons.find((w) => w.id === itemId);
    const ability = abilities.find((a) => a.id === itemId);

    setActiveItem(body || weapon || ability);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const itemId = active.id as string;
    const slotId = over.id as string;

    // Find the item being dragged
    const body = bodies.find((b) => b.id === itemId);
    const weapon = weapons.find((w) => w.id === itemId);
    const ability = abilities.find((a) => a.id === itemId);

    // Update build based on slot
    if (slotId === "body-slot" && body) {
      setBuild({ ...build, body });
    } else if (slotId === "weapon-slot" && weapon) {
      setBuild({ ...build, weapon });
    } else if (slotId === "ability1-slot" && ability) {
      setBuild({ ...build, ability1: ability });
    } else if (slotId === "ability2-slot" && ability) {
      setBuild({ ...build, ability2: ability });
    }

    setActiveId(null);
    setActiveItem(null);
  }

  // Determine active item type
  const getActiveType = () => {
    if (!activeItem) return null;
    if (bodies.find(b => b.id === activeId)) return "body";
    if (weapons.find(w => w.id === activeId)) return "weapon";
    if (abilities.find(a => a.id === activeId)) return "ability";
    return null;
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Tank Builder
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Parts Library */}
            <div className="lg:col-span-2">
              <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Parts Library</h2>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setActiveTab("bodies")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === "bodies"
                        ? "bg-cyan-500 text-black"
                        : "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                    }`}
                  >
                    Bodies ({bodies.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("weapons")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === "weapons"
                        ? "bg-cyan-500 text-black"
                        : "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                    }`}
                  >
                    Weapons ({weapons.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("abilities")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === "abilities"
                        ? "bg-cyan-500 text-black"
                        : "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                    }`}
                  >
                    Abilities ({abilities.length})
                  </button>
                </div>

                {/* Parts Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
                  {activeTab === "bodies" &&
                    bodies.map((body) => (
                      <DraggablePart key={body.id} id={body.id} data={body} type="body" />
                    ))}
                  {activeTab === "weapons" &&
                    weapons.map((weapon) => (
                      <DraggablePart key={weapon.id} id={weapon.id} data={weapon} type="weapon" />
                    ))}
                  {activeTab === "abilities" &&
                    abilities.map((ability) => (
                      <DraggablePart key={ability.id} id={ability.id} data={ability} type="ability" />
                    ))}
                </div>
              </div>
            </div>

            {/* Build Area */}
            <div className="space-y-6">
              {/* Build Slots */}
              <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Your Build</h2>

                <div className="space-y-4">
                  <BuildSlot id="body-slot" label="Body" item={build.body} type="body" />
                  <BuildSlot id="weapon-slot" label="Weapon" item={build.weapon} type="weapon" />
                  <BuildSlot id="ability1-slot" label="Ability 1" item={build.ability1} type="ability" />
                  <BuildSlot id="ability2-slot" label="Ability 2" item={build.ability2} type="ability" />
                </div>

                <button
                  onClick={() => setBuild({ body: null, weapon: null, ability1: null, ability2: null })}
                  className="w-full mt-4 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Clear Build
                </button>
              </div>

              {/* Stats Display */}
              <StatsDisplay build={build} />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <Comments
          url="https://spidertanks.xyz/builder"
          identifier="builder"
          title="Spider Tanks Guide - Tank Builder"
        />
      </div>

      <DragOverlay dropAnimation={null}>
        {activeId && activeItem ? (
          <div className="bg-gradient-to-b from-cyan-500/40 to-cyan-500/20 border-2 border-cyan-400 rounded-lg p-3 w-32 rotate-3 shadow-2xl">
            <div className="aspect-square bg-black/50 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs font-bold text-cyan-400 truncate">{activeItem.name}</div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
