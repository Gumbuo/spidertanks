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
import Footer from "./Footer";

export interface TankBuild {
  body: typeof bodies[0] | null;
  weapon: typeof weapons[0] | null;
}

export default function TankBuilder() {
  const [build, setBuild] = useState<TankBuild>({
    body: null,
    weapon: null,
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

    // Update build based on slot
    if (slotId === "body-slot" && body) {
      setBuild({ ...build, body });
    } else if (slotId === "weapon-slot" && weapon) {
      setBuild({ ...build, weapon });
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
          <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Tank Builder
          </h1>

          {/* NFT Tank Parts Info */}
          <div className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">💎</span>
              <h3 className="text-lg font-bold text-purple-400">Own Your Tank Parts as NFTs</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4 text-center">
              All tank bodies, weapons, and abilities are available as NFTs on <span className="text-purple-400 font-semibold">Immutable X</span>.
              Buy, sell, and trade parts to build your perfect loadout!
            </p>
            <div className="text-center">
              <a
                href="https://market.immutable.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-colors"
              >
                <span>🛒</span>
                Browse NFT Parts on Immutable
              </a>
              <p className="text-xs text-purple-300 mt-2">Available after December 8th launch</p>
            </div>
          </div>

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
                    Abilities Reference ({abilities.length})
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
                  {activeTab === "abilities" && (
                    <div className="col-span-full space-y-3">
                      {abilities.map((ability) => (
                        <div
                          key={ability.id}
                          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-black/50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                              <img
                                src={ability.image}
                                alt={ability.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-bold text-purple-400 mb-1">{ability.name}</h4>
                              <p className="text-sm text-gray-300 mb-2">{ability.description}</p>
                              <div className="flex gap-3 text-xs text-gray-400">
                                <span>⚡ Energy: <span className="text-cyan-400 font-bold">{ability.energy}</span></span>
                                <span>⏱️ Duration: <span className="text-cyan-400 font-bold">{ability.lifetime}s</span></span>
                                {ability.damage > 0 && (
                                  <span>💥 Damage: <span className="text-orange-400 font-bold">{ability.damage}</span></span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                </div>

                <button
                  onClick={() => setBuild({ body: null, weapon: null })}
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

        {/* Back Button */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>

      <Footer />

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
