"use client";


import Footer from "../components/Footer";

export default function GuidesPage() {
  const guideCategories = [
    {
      id: "progression",
      title: "Progression System",
      icon: "⬆️",
      color: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
      guides: [
        { title: "Mastery System Explained", status: "NEW", content: true },
        { title: "Modules & Trade-offs", status: "NEW", content: true },
        { title: "Arachnium: How to Earn & Spend", status: "Coming Soon" },
        { title: "Unlocking Weapons & Bodies", status: "Coming Soon" },
      ],
    },
    {
      id: "beginner",
      title: "Beginner Guides",
      icon: "🎓",
      color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
      guides: [
        { title: "Getting Started with Spider Tanks", status: "Coming Soon" },
        { title: "Understanding Tank Stats", status: "Coming Soon" },
        { title: "Your First Match: What to Expect", status: "Coming Soon" },
        { title: "Basic Movement and Controls", status: "Coming Soon" },
      ],
    },
    {
      id: "intermediate",
      title: "Tank & Weapon Guides",
      icon: "⚔️",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      guides: [
        { title: "Best Tank Bodies for Each Playstyle", status: "Coming Soon" },
        { title: "Weapon Tier List & Rankings", status: "Coming Soon" },
        { title: "Ability Combinations Guide", status: "Coming Soon" },
        { title: "Building the Perfect Tank", status: "Coming Soon" },
      ],
    },
    {
      id: "advanced",
      title: "Advanced Strategies",
      icon: "🎯",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      guides: [
        { title: "Map Control & Positioning", status: "Coming Soon" },
        { title: "Team Composition Strategies", status: "Coming Soon" },
        { title: "Counter-Play & Adaptation", status: "Coming Soon" },
        { title: "Advanced Movement Techniques", status: "Coming Soon" },
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
        </div>

        {/* Mastery System Guide */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4 flex items-center gap-3">
              <span>⬆️</span> Mastery System Explained
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Every weapon and body in Spider Tanks has a <span className="text-yellow-400 font-semibold">Mastery Level</span> that
                you progress by playing matches with that item equipped.
              </p>

              <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/20">
                <h3 className="text-xl font-bold text-white mb-3">How Mastery Works</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">1.</span>
                    <span>Equip a weapon or body and play matches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">2.</span>
                    <span>Earn XP toward that item&apos;s mastery (e.g., 332/1000 XP per level)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">3.</span>
                    <span>Level up mastery (1-10) to unlock stat boosts and modules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">4.</span>
                    <span>Each mastery level increases your item&apos;s base stats</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-3">Speed Up with Arachnium</h3>
                <p>
                  Don&apos;t want to grind? You can spend <span className="text-cyan-400 font-semibold">Arachnium</span> to
                  instantly max out mastery levels. For example, the Cannon costs <span className="text-cyan-400 font-semibold">100 Arachnium</span> to
                  fully max out.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Guide */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-3xl font-bold text-purple-400 mb-4 flex items-center gap-3">
              <span>🔧</span> Modules & Trade-offs
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Modules are <span className="text-purple-400 font-semibold">weapon modifications</span> that change how your
                weapon performs. They&apos;re unlocked through the Mastery system.
              </p>

              <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-3">Trade-off System</h3>
                <p className="mb-3">
                  Modules aren&apos;t straight upgrades - they&apos;re <span className="text-purple-400 font-semibold">trade-offs</span>.
                  You gain something but lose something else. Choose based on your playstyle!
                </p>
              </div>

              <div className="bg-black/30 rounded-lg p-4 border border-green-500/20">
                <h3 className="text-xl font-bold text-white mb-3">Example: Cannon Modules</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h4 className="font-bold text-cyan-400">Calibrated Cannon</h4>
                    <p className="text-sm text-gray-400">Faster fire rate & projectile speed, but reduced damage</p>
                    <div className="flex gap-4 mt-1 text-sm">
                      <span className="text-green-400">+Reload: -0.37s</span>
                      <span className="text-green-400">+Speed: +4.5m/s</span>
                      <span className="text-red-400">-Damage</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-bold text-orange-400">Weakening Cannon</h4>
                    <p className="text-sm text-gray-400">Chance to weaken enemies, but slower reload</p>
                    <div className="flex gap-4 mt-1 text-sm">
                      <span className="text-green-400">+WEAKNESS effect</span>
                      <span className="text-green-400">+6% chance</span>
                      <span className="text-red-400">-Reload: +0.07s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
}
