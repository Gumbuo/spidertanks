"use client";


import Footer from "../components/Footer";
import { useHoverSound } from "../hooks/useHoverSound";

export default function IMXRewardsPage() {
  const playHoverSound = useHoverSound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Immutable Play Rewards
          </h1>
          <p className="text-xl text-gray-400">
            Earn Gems & win IMX tokens by playing Spider Tanks
          </p>
        </div>

        {/* Main IMX Rewards Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border-2 border-purple-500/50 rounded-lg p-8 relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">💎</span>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Earn Gems on Immutable Play!
                </h2>
                <span className="text-4xl">💎</span>
              </div>

              <p className="text-center text-gray-200 text-lg mb-6 max-w-2xl mx-auto">
                Join <span className="font-bold text-purple-400">Immutable Play</span> and earn
                <span className="font-bold text-blue-400"> Gems</span> by completing quests, spinning the Daily Wheel,
                following games, and watching videos. Redeem Gems for Keys in the Weekly Draw to win IMX tokens!
              </p>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-black/30 border border-purple-500/30 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="text-sm font-bold text-purple-400">Complete Quests</div>
                  <div className="text-xs text-gray-400 mt-1">Earn Gems from daily & weekly quests</div>
                </div>
                <div className="bg-black/30 border border-blue-500/30 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🎡</div>
                  <div className="text-sm font-bold text-blue-400">Daily Wheel</div>
                  <div className="text-xs text-gray-400 mt-1">Spin daily for free Gems</div>
                </div>
                <div className="bg-black/30 border border-pink-500/30 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🔑</div>
                  <div className="text-sm font-bold text-pink-400">Weekly Draw</div>
                  <div className="text-xs text-gray-400 mt-1">Redeem Gems for Keys to win IMX</div>
                </div>
                <div className="bg-black/30 border border-green-500/30 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">👁️</div>
                  <div className="text-sm font-bold text-green-400">Follow & Watch</div>
                  <div className="text-xs text-gray-400 mt-1">Follow games & watch videos for Gems</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 justify-center">
                <a
                  href="https://play.immutable.com/quests/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50"
                >
                  <span className="text-2xl">📋</span>
                  <div>
                    <div>Complete Quests</div>
                    <div className="text-xs font-normal opacity-90">Earn Gems Daily</div>
                  </div>
                  <span className="text-xl">→</span>
                </a>
                <a
                  href="https://play.immutable.com/rewards/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50"
                >
                  <span className="text-2xl">🎁</span>
                  <div>
                    <div>Weekly Draw</div>
                    <div className="text-xs font-normal opacity-90">Redeem Keys & Win IMX</div>
                  </div>
                  <span className="text-xl">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">How Immutable Play Rewards Work</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">1️⃣</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Create Immutable Passport</h3>
              <p className="text-gray-300 text-sm">Set up your Immutable Passport wallet to access Immutable Play and start earning Gems.</p>
            </div>
            <div className="bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">2️⃣</div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">Earn Gems</h3>
              <p className="text-gray-300 text-sm">Complete quests, spin the Daily Wheel, follow games, and watch videos to earn Gems.</p>
            </div>
            <div className="bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">3️⃣</div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">Redeem for Keys</h3>
              <p className="text-gray-300 text-sm">Use your Gems to get Keys for the Weekly Draw. Higher tier Keys = better chances to win!</p>
            </div>
            <div className="bg-gradient-to-b from-pink-500/10 to-transparent border border-pink-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">4️⃣</div>
              <h3 className="text-xl font-bold text-pink-400 mb-2">Win IMX Tokens</h3>
              <p className="text-gray-300 text-sm">Enter the Weekly Draw with your Keys to win IMX token rewards!</p>
            </div>
          </div>
        </div>

        {/* Marketplace Links */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Spider Tanks - Play & Collect</h2>

          {/* Mobile Apps - Featured */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <a
              href="https://play.google.com/store/apps/details?id=nl.gamedia.spidertanks&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6 hover:border-green-500/50 transition-all hover:scale-105 block"
            >
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Android App - NEW!</h3>
              <p className="text-gray-300 text-sm">Download Spider Tanks on Google Play - Available now!</p>
              <div className="mt-4 inline-block px-3 py-1 bg-green-500 text-white text-sm rounded-full font-bold">Get on Google Play →</div>
            </a>
            <a
              href="https://apps.apple.com/us/app/spider-tanks-cores-of-chaos/id6746262642"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/50 transition-all hover:scale-105 block"
            >
              <div className="text-4xl mb-3">🍎</div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">iOS App - NEW!</h3>
              <p className="text-gray-300 text-sm">Download Spider Tanks on App Store - Available now!</p>
              <div className="mt-4 inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded-full font-bold">Get on App Store →</div>
            </a>
          </div>

          {/* Other Links */}
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://market.immutable.com/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500/50 transition-all hover:scale-105 block"
            >
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">Immutable Marketplace</h3>
              <p className="text-gray-300 text-sm">Buy and sell Spider Tanks NFTs, tank bodies, weapons, and maps.</p>
              <div className="mt-4 inline-block px-3 py-1 bg-purple-500 text-white text-sm rounded-full font-bold">Visit Marketplace →</div>
            </a>
            <a
              href="https://play.immutable.com/games/spider-tanks-cores-of-chaos/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/50 transition-all hover:scale-105 block"
            >
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Immutable Play</h3>
              <p className="text-gray-300 text-sm">Access Spider Tanks: Cores of Chaos on the Immutable gaming platform.</p>
              <div className="mt-4 inline-block px-3 py-1 bg-cyan-500 text-black text-sm rounded-full font-bold">Play Now →</div>
            </a>
          </div>
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
      </div>

      <Footer />
    </div>
  );
}
