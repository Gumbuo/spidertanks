"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import bodies from "../data/bodies.json";
import weapons from "../data/weapons.json";
import abilities from "../data/abilities.json";
import { DraggablePart } from "./DraggablePart";
import { BuildSlot } from "./BuildSlot";
import { StatsDisplay } from "./StatsDisplay";
import { useHoverSound } from "../hooks/useHoverSound";

export interface TankBuild {
  body: typeof bodies[0] | null;
  weapon: typeof weapons[0] | null;
  bodyLevel: number;
  weaponLevel: number;
  selectedBodyModule: number | null;
  selectedWeaponModule: number | null;
}

export default function TankBuilder() {
  const playHoverSound = useHoverSound();

  const [build, setBuild] = useState<TankBuild>({
    body: null,
    weapon: null,
    bodyLevel: 10,
    weaponLevel: 10,
    selectedBodyModule: null,
    selectedWeaponModule: null,
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

  // Handle module selection
  const handleModuleSelection = (partType: "body" | "weapon", moduleIndex: number) => {
    if (partType === "body") {
      setBuild({ ...build, selectedBodyModule: moduleIndex });
    } else {
      setBuild({ ...build, selectedWeaponModule: moduleIndex });
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
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
                    onMouseEnter={playHoverSound}
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
                    onMouseEnter={playHoverSound}
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
                    onMouseEnter={playHoverSound}
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

                  {/* Body Level Slider */}
                  {build.body && (
                    <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-bold text-gray-400">BODY LEVEL</label>
                        <span className="text-xl font-bold text-cyan-400">{build.bodyLevel}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={build.bodyLevel}
                        onChange={(e) => setBuild({ ...build, bodyLevel: Number(e.target.value) })}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(build.bodyLevel - 1) * 11.11}%, #1f2937 ${(build.bodyLevel - 1) * 11.11}%, #1f2937 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>10</span>
                      </div>
                    </div>
                  )}

                  <BuildSlot id="weapon-slot" label="Weapon" item={build.weapon} type="weapon" />

                  {/* Weapon Level Slider */}
                  {build.weapon && (
                    <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-bold text-gray-400">WEAPON LEVEL</label>
                        <span className="text-xl font-bold text-cyan-400">{build.weaponLevel}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={build.weaponLevel}
                        onChange={(e) => setBuild({ ...build, weaponLevel: Number(e.target.value) })}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(build.weaponLevel - 1) * 11.11}%, #1f2937 ${(build.weaponLevel - 1) * 11.11}%, #1f2937 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>10</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Body Modules - Show at Level 10 */}
                {build.body && build.bodyLevel === 10 && (
                  <div className="mt-6 pt-6 border-t border-cyan-500/30">
                    <h3 className="text-lg font-bold text-cyan-400 mb-3">Body Modules (Select 1)</h3>
                    <div className="space-y-2">
                      {build.body.modules.map((module: any, index: number) => (
                        <div
                          key={`body-module-${index}`}
                          onClick={() => handleModuleSelection("body", index)}
                          onMouseEnter={playHoverSound}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            build.selectedBodyModule === index
                              ? "border-green-400 bg-green-500/20 ring-2 ring-green-400/50"
                              : "border-cyan-500/30 bg-cyan-500/10 hover:border-cyan-500/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-bold text-sm text-cyan-400">{module.name}</div>
                            {build.selectedBodyModule === index && (
                              <div className="text-xs font-bold text-green-400 px-2 py-0.5 bg-green-500/20 rounded">ACTIVE</div>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 mb-2">{module.description}</div>
                          <div className="flex gap-3 text-xs">
                            {module.armorBonus !== 0 && <span className="text-cyan-400">HP: +{module.armorBonus}</span>}
                            {module.speedBonus !== 0 && <span className="text-cyan-400">Speed: +{module.speedBonus}</span>}
                            {module.energyBonus !== 0 && <span className="text-cyan-400">Energy/s: +{module.energyBonus}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Weapon Modules - Show at Level 10 */}
                {build.weapon && build.weaponLevel === 10 && (
                  <div className="mt-6 pt-6 border-t border-cyan-500/30">
                    <h3 className="text-lg font-bold text-cyan-400 mb-3">Weapon Modules (Select 1)</h3>
                    <div className="space-y-2">
                      {build.weapon.modules.map((module: any, index: number) => (
                        <div
                          key={`weapon-module-${index}`}
                          onClick={() => handleModuleSelection("weapon", index)}
                          onMouseEnter={playHoverSound}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            build.selectedWeaponModule === index
                              ? "border-green-400 bg-green-500/20 ring-2 ring-green-400/50"
                              : "border-cyan-500/30 bg-cyan-500/10 hover:border-cyan-500/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-bold text-sm text-cyan-400">{module.name}</div>
                            {build.selectedWeaponModule === index && (
                              <div className="text-xs font-bold text-green-400 px-2 py-0.5 bg-green-500/20 rounded">ACTIVE</div>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 mb-2">{module.description}</div>
                          <div className="flex gap-3 text-xs">
                            {module.damageBonus !== 0 && <span className="text-cyan-400">Damage: +{module.damageBonus}</span>}
                            {module.rangeBonus !== 0 && <span className="text-cyan-400">Range: +{module.rangeBonus}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setBuild({
                    body: null,
                    weapon: null,
                    bodyLevel: 10,
                    weaponLevel: 10,
                    selectedBodyModule: null,
                    selectedWeaponModule: null,
                  })}
                  onMouseEnter={playHoverSound}
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
