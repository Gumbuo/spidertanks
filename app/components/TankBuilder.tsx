"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import bodies from "../data/bodies.json";
import weapons from "../data/weapons.json";
import abilities from "../data/abilities.json";
import { DraggablePart } from "./DraggablePart";
import { BuildSlot } from "./BuildSlot";
import { StatsDisplay } from "./StatsDisplay";
import { SavedBuildsPanel } from "./SavedBuildsPanel";
import { useHoverSound } from "../hooks/useHoverSound";

interface BuildData {
  bodyId: string | null;
  weaponId: string | null;
  ability1Id: string | null;
  ability2Id: string | null;
  bodyLevel: number;
  weaponLevel: number;
  selectedBodyModule: number | null;
  selectedWeaponModule: number | null;
}

export interface TankBuild {
  body: typeof bodies[0] | null;
  weapon: typeof weapons[0] | null;
  ability1: typeof abilities[0] | null;
  ability2: typeof abilities[0] | null;
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
    ability1: null,
    ability2: null,
    bodyLevel: 10,
    weaponLevel: 10,
    selectedBodyModule: null,
    selectedWeaponModule: null,
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"bodies" | "weapons" | "abilities">("bodies");
  const [activeItem, setActiveItem] = useState<any>(null);
  const [showSavedBuilds, setShowSavedBuilds] = useState(false);

  // Serialize current build to IDs for saving
  const serializeBuild = (): BuildData => ({
    bodyId: build.body?.id || null,
    weaponId: build.weapon?.id || null,
    ability1Id: build.ability1?.id || null,
    ability2Id: build.ability2?.id || null,
    bodyLevel: build.bodyLevel,
    weaponLevel: build.weaponLevel,
    selectedBodyModule: build.selectedBodyModule,
    selectedWeaponModule: build.selectedWeaponModule,
  });

  // Load a saved build from IDs
  const loadSavedBuild = (savedBuild: BuildData) => {
    const body = savedBuild.bodyId ? bodies.find(b => b.id === savedBuild.bodyId) || null : null;
    const weapon = savedBuild.weaponId ? weapons.find(w => w.id === savedBuild.weaponId) || null : null;
    const ability1 = savedBuild.ability1Id ? abilities.find(a => a.id === savedBuild.ability1Id) || null : null;
    const ability2 = savedBuild.ability2Id ? abilities.find(a => a.id === savedBuild.ability2Id) || null : null;

    setBuild({
      body,
      weapon,
      ability1,
      ability2,
      bodyLevel: savedBuild.bodyLevel,
      weaponLevel: savedBuild.weaponLevel,
      selectedBodyModule: savedBuild.selectedBodyModule,
      selectedWeaponModule: savedBuild.selectedWeaponModule,
    });
  };

  // Check if current build has any parts
  const hasCurrentBuild = !!(build.body || build.weapon);

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
      // Don't allow same ability in both slots
      if (build.ability2?.id === ability.id) {
        setBuild({ ...build, ability1: ability, ability2: null });
      } else {
        setBuild({ ...build, ability1: ability });
      }
    } else if (slotId === "ability2-slot" && ability) {
      // Don't allow same ability in both slots
      if (build.ability1?.id === ability.id) {
        setBuild({ ...build, ability2: ability, ability1: null });
      } else {
        setBuild({ ...build, ability2: ability });
      }
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

  // Calculate total energy cost
  const totalEnergyCost = (build.ability1?.energy || 0) + (build.ability2?.energy || 0);

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
                        ? "bg-purple-500 text-black"
                        : "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
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

                  {/* Body Level Slider */}
                  {build.body && (
                    <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-bold text-gray-400">BODY MASTERY</label>
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
                        <label className="text-sm font-bold text-gray-400">WEAPON MASTERY</label>
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

                  {/* Ability Slots */}
                  <div className="pt-4 border-t border-purple-500/30">
                    <h3 className="text-lg font-bold text-purple-400 mb-3">Abilities (2 slots)</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <BuildSlot id="ability1-slot" label="Ability 1" item={build.ability1} type="ability" />
                      <BuildSlot id="ability2-slot" label="Ability 2" item={build.ability2} type="ability" />
                    </div>
                    {(build.ability1 || build.ability2) && (
                      <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total Energy Cost:</span>
                          <span className="text-purple-400 font-bold">{totalEnergyCost}</span>
                        </div>
                      </div>
                    )}
                  </div>
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

                {/* Save/Load Buttons */}
                <div className="mt-6 pt-6 border-t border-cyan-500/30 space-y-3">
                  <button
                    onClick={() => setShowSavedBuilds(true)}
                    onMouseEnter={playHoverSound}
                    className="w-full px-4 py-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-colors font-bold flex items-center justify-center gap-2"
                  >
                    <span>My Builds</span>
                  </button>
                </div>

                <button
                  onClick={() => setBuild({
                    body: null,
                    weapon: null,
                    ability1: null,
                    ability2: null,
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

      {/* Saved Builds Panel */}
      <SavedBuildsPanel
        isOpen={showSavedBuilds}
        onClose={() => setShowSavedBuilds(false)}
        onLoadBuild={loadSavedBuild}
        currentBuild={serializeBuild()}
        hasCurrentBuild={hasCurrentBuild}
      />
    </DndContext>
  );
}
