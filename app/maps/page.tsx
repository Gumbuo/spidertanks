"use client";

import maps from "../data/maps.json";
import Comments from "../components/Comments";
import Footer from "../components/Footer";
import { useHoverSound } from "../hooks/useHoverSound";

export default function MapsPage() {
  const playHoverSound = useHoverSound();
  // Group maps by planet
  const mapsByPlanet = maps.reduce((acc, map) => {
    if (!acc[map.planet]) {
      acc[map.planet] = [];
    }
    acc[map.planet].push(map);
    return acc;
  }, {} as Record<string, typeof maps>);

  const planets = Object.keys(mapsByPlanet);

  const planetColors: Record<string, string> = {
    Salacia: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    Chione: "from-cyan-400/20 to-blue-300/20 border-cyan-400/30",
    Cacus: "from-orange-500/20 to-red-500/20 border-orange-500/30",
    Silvanus: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    Earth: "from-gray-500/20 to-slate-500/20 border-gray-500/30",
  };

  const planetEmojis: Record<string, string> = {
    Salacia: "🌊",
    Chione: "❄️",
    Cacus: "🌋",
    Silvanus: "🌿",
    Earth: "🌍",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Battle Maps
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Explore the 12 battlefields across 5 planets in Spider Tanks
          </p>

          {/* NFT Maps Info */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">💎</span>
              <h3 className="text-xl font-bold text-purple-400">Player-Owned NFT Maps</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              5 maps are available as NFTs on <span className="text-purple-400 font-semibold">Immutable X</span>:
              Safe Haven, Arctic Base, Dragon Cave, Jungle Temple, and Death Canyon.
              Map owners earn rewards when matches are played on their maps!
            </p>
            <div className="text-center">
              <a
                href="https://market.immutable.com/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-colors"
              >
                <span>🛒</span>
                View on Immutable Marketplace
              </a>
              <p className="text-xs text-purple-300 mt-2">Available after December 8th launch</p>
            </div>
          </div>
        </div>

        {/* Maps by Planet */}
        <div className="space-y-12">
          {planets.map((planet) => (
            <div key={planet}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{planetEmojis[planet]}</span>
                <h2 className="text-3xl font-bold text-cyan-400">{planet}</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {mapsByPlanet[planet].map((map) => (
                  <div
                    key={map.id}
                    className={`bg-gradient-to-br ${planetColors[planet]} border rounded-lg p-6 hover:scale-[1.02] transition-transform`}
                  >
                    {/* Map Image Placeholder */}
                    <div className="aspect-video bg-black/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <div className="text-6xl opacity-30">{planetEmojis[planet]}</div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-white">{map.name}</h3>
                      {map.nft && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded text-xs text-purple-300">
                          💎 NFT
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{map.description}</p>

                    <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
                      <span className="px-2 py-1 bg-black/30 rounded">
                        {planet}
                      </span>
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">
                        3v3 Arena
                      </span>
                      {map.nft && map.rarity && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                          {map.rarity}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <a
            href="/"
            onMouseEnter={playHoverSound}
            className="inline-block px-6 py-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-colors"
          >
            ← Back to Home
          </a>
        </div>

        {/* Comments Section */}
        <Comments
          url="https://spidertanks.xyz/maps"
          identifier="maps"
          title="Spider Tanks Guide - Battle Maps"
        />
      </div>

      <Footer />
    </div>
  );
}
