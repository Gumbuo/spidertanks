"use client";

import Comments from "../components/Comments";

export default function GuidesPage() {
  const guideCategories = [
    {
      id: "beginner",
      title: "Beginner Guides",
      icon: "🎓",
      color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
      guides: [
        { title: "Getting Started with Spider Tanks", status: "Available Dec 8th" },
        { title: "Understanding Tank Stats", status: "Available Dec 8th" },
        { title: "Your First Match: What to Expect", status: "Available Dec 8th" },
        { title: "Basic Movement and Controls", status: "Available Dec 8th" },
      ],
    },
    {
      id: "intermediate",
      title: "Tank & Weapon Guides",
      icon: "⚔️",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      guides: [
        { title: "Best Tank Bodies for Each Playstyle", status: "Available Dec 8th" },
        { title: "Weapon Tier List & Rankings", status: "Available Dec 8th" },
        { title: "Ability Combinations Guide", status: "Available Dec 8th" },
        { title: "Building the Perfect Tank", status: "Available Dec 8th" },
      ],
    },
    {
      id: "advanced",
      title: "Advanced Strategies",
      icon: "🎯",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      guides: [
        { title: "Map Control & Positioning", status: "Available Dec 8th" },
        { title: "Team Composition Strategies", status: "Available Dec 8th" },
        { title: "Counter-Play & Adaptation", status: "Available Dec 8th" },
        { title: "Advanced Movement Techniques", status: "Available Dec 8th" },
      ],
    },
    {
      id: "meta",
      title: "Meta & Economy",
      icon: "💎",
      color: "from-orange-500/20 to-yellow-500/20 border-orange-500/30",
      guides: [
        { title: "Current Meta Analysis", status: "Available Dec 8th" },
        { title: "Earning Arachnium Guide", status: "Available Dec 8th" },
        { title: "NFT Trading Tips", status: "Available Dec 8th" },
        { title: "Progression & Leveling", status: "Available Dec 8th" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Strategy Guides
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Master the arena with comprehensive guides and strategies
          </p>
          <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400">
            📅 Full guides available after December 8th launch
          </div>
        </div>

        {/* Guide Categories */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {guideCategories.map((category) => (
            <div
              key={category.id}
              className={`bg-gradient-to-br ${category.color} border rounded-lg p-6`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
              </div>

              <div className="space-y-3">
                {category.guides.map((guide, index) => (
                  <div
                    key={index}
                    className="bg-black/30 border border-white/10 rounded-lg p-3 hover:bg-black/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{guide.title}</span>
                      <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">
                        {guide.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-cyan-400 mb-3">Want to Contribute?</h3>
          <p className="text-gray-300 mb-4">
            After the December 8th launch, we'll be adding comprehensive guides based on real gameplay.
            Check back here for expert strategies, tips, and meta analysis!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/builder"
              className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Try Tank Builder
            </a>
            <a
              href="/"
              className="px-6 py-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>

        {/* Comments Section */}
        <Comments
          url="https://spidertanks.xyz/guides"
          identifier="guides"
          title="Spider Tanks Guide - Strategy Guides"
        />
      </div>
    </div>
  );
}
