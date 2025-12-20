"use client";

import { useState, useEffect, useCallback } from "react";
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

interface SavedBuild {
  id: string;
  username: string;
  buildName: string;
  build: BuildData;
  createdAt: number;
}

interface SavedBuildsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadBuild: (build: BuildData) => void;
  currentBuild: BuildData;
  hasCurrentBuild: boolean;
}

export function SavedBuildsPanel({
  isOpen,
  onClose,
  onLoadBuild,
  currentBuild,
  hasCurrentBuild,
}: SavedBuildsPanelProps) {
  const playHoverSound = useHoverSound();

  const [username, setUsername] = useState("");
  const [buildName, setBuildName] = useState("");
  const [savedBuilds, setSavedBuilds] = useState<SavedBuild[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"load" | "save">("load");

  // Load username from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("spidertanks-username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch builds when username changes
  const fetchBuilds = useCallback(async () => {
    if (!username.trim()) {
      setSavedBuilds([]);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/builds?username=${encodeURIComponent(username.trim())}`);
      const data = await response.json();

      if (data.success) {
        setSavedBuilds(data.builds);
      } else {
        setError(data.error || "Failed to fetch builds");
      }
    } catch (err) {
      setError("Failed to fetch builds");
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  // Fetch builds when panel opens or username changes
  useEffect(() => {
    if (isOpen && username.trim()) {
      fetchBuilds();
    }
  }, [isOpen, fetchBuilds]);

  // Save username to localStorage when it changes
  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (value.trim()) {
      localStorage.setItem("spidertanks-username", value.trim());
    }
  };

  // Save a new build
  const handleSaveBuild = async () => {
    if (!username.trim() || !buildName.trim()) {
      setError("Please enter both username and build name");
      return;
    }

    if (!hasCurrentBuild) {
      setError("Please add at least a body or weapon to save");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/builds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          buildName: buildName.trim(),
          build: currentBuild,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Build saved!");
        setBuildName("");
        fetchBuilds();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(data.error || "Failed to save build");
      }
    } catch (err) {
      setError("Failed to save build");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete a build
  const handleDeleteBuild = async (buildId: string) => {
    if (!username.trim()) return;

    try {
      const response = await fetch(
        `/api/builds?id=${buildId}&username=${encodeURIComponent(username.trim())}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (data.success) {
        setSavedBuilds(prev => prev.filter(b => b.id !== buildId));
      } else {
        setError(data.error || "Failed to delete build");
      }
    } catch (err) {
      setError("Failed to delete build");
    }
  };

  // Load a build
  const handleLoadBuild = (build: BuildData) => {
    onLoadBuild(build);
    onClose();
  };

  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-gray-900 border-2 border-cyan-500/50 rounded-xl w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/30">
          <h2 className="text-xl font-bold text-cyan-400">Saved Builds</h2>
          <button
            onClick={onClose}
            onMouseEnter={playHoverSound}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Username Input */}
        <div className="p-4 border-b border-cyan-500/30">
          <label className="block text-sm text-gray-400 mb-2">Your Username</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder="Enter your username..."
              maxLength={20}
              className="flex-1 bg-black/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={fetchBuilds}
              onMouseEnter={playHoverSound}
              disabled={!username.trim() || isLoading}
              className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
            >
              {isLoading ? "..." : "Load"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-cyan-500/30">
          <button
            onClick={() => setActiveTab("load")}
            onMouseEnter={playHoverSound}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${
              activeTab === "load"
                ? "bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-400 hover:text-cyan-400"
            }`}
          >
            My Builds ({savedBuilds.length})
          </button>
          <button
            onClick={() => setActiveTab("save")}
            onMouseEnter={playHoverSound}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${
              activeTab === "save"
                ? "bg-green-500/20 text-green-400 border-b-2 border-green-400"
                : "text-gray-400 hover:text-green-400"
            }`}
          >
            Save Current Build
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[40vh]">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
              {successMessage}
            </div>
          )}

          {/* Load Tab */}
          {activeTab === "load" && (
            <div className="space-y-3">
              {!username.trim() ? (
                <p className="text-gray-500 text-center py-8">
                  Enter your username above to load your builds
                </p>
              ) : isLoading ? (
                <p className="text-gray-500 text-center py-8">Loading...</p>
              ) : savedBuilds.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No saved builds found for "{username}"
                </p>
              ) : (
                savedBuilds.map((saved) => (
                  <div
                    key={saved.id}
                    className="bg-black/50 border border-cyan-500/30 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-cyan-400">{saved.buildName}</div>
                        <div className="text-xs text-gray-500">{formatDate(saved.createdAt)}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLoadBuild(saved.build)}
                          onMouseEnter={playHoverSound}
                          className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-500/30 transition-colors text-sm"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleDeleteBuild(saved.id)}
                          onMouseEnter={playHoverSound}
                          className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded hover:bg-red-500/30 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 space-x-3">
                      {saved.build.bodyId && <span>Body: {saved.build.bodyId}</span>}
                      {saved.build.weaponId && <span>Weapon: {saved.build.weaponId}</span>}
                      {saved.build.ability1Id && <span>A1: {saved.build.ability1Id}</span>}
                      {saved.build.ability2Id && <span>A2: {saved.build.ability2Id}</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Save Tab */}
          {activeTab === "save" && (
            <div className="space-y-4">
              {!hasCurrentBuild ? (
                <p className="text-gray-500 text-center py-8">
                  Add at least a body or weapon to your build first
                </p>
              ) : (
                <>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Build Name</label>
                    <input
                      type="text"
                      value={buildName}
                      onChange={(e) => setBuildName(e.target.value)}
                      placeholder="e.g., My Sniper Build..."
                      maxLength={30}
                      className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <div className="text-xs text-gray-400 mb-2">Current Build Preview:</div>
                    <div className="text-sm text-cyan-400 space-x-3">
                      {currentBuild.bodyId && <span>Body: {currentBuild.bodyId}</span>}
                      {currentBuild.weaponId && <span>Weapon: {currentBuild.weaponId}</span>}
                      {currentBuild.ability1Id && <span>A1: {currentBuild.ability1Id}</span>}
                      {currentBuild.ability2Id && <span>A2: {currentBuild.ability2Id}</span>}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Body Mastery: {currentBuild.bodyLevel} | Weapon Mastery: {currentBuild.weaponLevel}
                    </div>
                  </div>

                  <button
                    onClick={handleSaveBuild}
                    onMouseEnter={playHoverSound}
                    disabled={isSaving || !username.trim() || !buildName.trim()}
                    className="w-full py-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors font-bold disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Build"}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Max 10 builds per username
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
