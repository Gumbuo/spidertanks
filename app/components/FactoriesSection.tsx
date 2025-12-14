"use client";

const factories = [
  {
    id: "island-factory",
    name: "Island Factory",
    planet: "Island",
    image: "/images/factories/island-factory.png",
    description: "This factory will manufacture components",
    maxOutCost: 100,
    productionTime: "24h",
    produces: ["Bolts", "Scrap Metal", "Chips", "Hydraulics"],
    masteryLevels: 30,
    masteryBenefit: "Higher mastery levels allow your factory to produce more efficiently"
  }
];

export default function FactoriesSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
          Factories
        </h2>
        <p className="text-gray-400">Each planet has a factory that produces components for upgrading and unlocking parts</p>
      </div>

      {/* Factory Info */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🏭</span>
          <div>
            <h3 className="text-2xl font-bold text-yellow-400">How Factories Work</h3>
            <p className="text-gray-400 text-sm">Passive component generation system</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⏱️</div>
            <div className="text-yellow-400 font-bold">24h Production Cycle</div>
            <div className="text-xs text-gray-500">Factories run automatically</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📦</div>
            <div className="text-yellow-400 font-bold">Collect Components</div>
            <div className="text-xs text-gray-500">Claim when ready to restart</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⬆️</div>
            <div className="text-yellow-400 font-bold">Level Up Mastery</div>
            <div className="text-xs text-gray-500">Increase production efficiency</div>
          </div>
        </div>

        <div className="text-sm text-gray-300">
          <strong className="text-yellow-400">Tip:</strong> Play matches with items equipped to earn progress towards the next Mastery Level, which will allow your factory to produce more efficiently.
        </div>
      </div>

      {/* Factories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {factories.map((factory) => (
          <div
            key={factory.id}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-yellow-500/30 rounded-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-yellow-500/20 px-4 py-3 border-b border-yellow-500/30">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-yellow-400">{factory.name}</h3>
                <span className="text-xs px-2 py-1 rounded bg-orange-500/20 text-orange-400">
                  {factory.planet}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="text-sm text-gray-300 italic">{factory.description}</div>

              {/* Production Time */}
              <div className="bg-black/30 rounded p-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Production Cycle:</span>
                  <span className="text-yellow-400 font-bold">{factory.productionTime}</span>
                </div>
              </div>

              {/* Components Produced */}
              <div className="border-t border-gray-700 pt-3">
                <div className="text-xs text-gray-500 mb-2">PRODUCES</div>
                <div className="flex flex-wrap gap-2">
                  {factory.produces.map((component, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs"
                    >
                      {component}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mastery */}
              <div className="border-t border-gray-700 pt-3">
                <div className="text-xs text-gray-500 mb-2">MASTERY</div>
                <div className="text-sm text-gray-300">
                  Level 0 - {factory.masteryLevels} max
                </div>
                <div className="text-xs text-gray-500 mt-1">{factory.masteryBenefit}</div>
              </div>

              <div className="text-xs text-gray-500 text-right">
                Max Out: <span className="text-yellow-400">{factory.maxOutCost} Arachnium</span>
              </div>
            </div>
          </div>
        ))}

        {/* Coming Soon Placeholder */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/30 border-dashed rounded-lg overflow-hidden flex items-center justify-center min-h-[300px]">
          <div className="text-center p-6">
            <div className="text-4xl mb-3 opacity-50">🔒</div>
            <div className="text-gray-500 font-bold">More Factories</div>
            <div className="text-xs text-gray-600">Unlock more planets to discover their factories</div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-500 text-sm">
        More factories coming as we unlock new planets!
      </div>
    </div>
  );
}
