"use client";

import maps from "../data/maps.json";
import Comments from "../components/Comments";
import Footer from "../components/Footer";

export default function MapsPage() {
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
          <p className="text-xl text-gray-400">
            Explore the 12 battlefields across 5 planets in Spider Tanks
          </p>
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

                    <h3 className="text-2xl font-bold text-white mb-2">{map.name}</h3>
                    <p className="text-gray-300 text-sm mb-3">{map.description}</p>

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="px-2 py-1 bg-black/30 rounded">
                        {planet}
                      </span>
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">
                        3v3 Arena
                      </span>
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
