"use client";

import Comments from "../components/Comments";
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
            IMX Diamonds Rewards
          </h1>
          <p className="text-xl text-gray-400">
            Earn rewards by playing Spider Tanks on Immutable X
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
                  Earn IMX Diamonds!
                </h2>
                <span className="text-4xl">💎</span>
              </div>

              <p className="text-center text-gray-200 text-lg mb-6 max-w-2xl mx-auto">
                Participate in the <span className="font-bold text-purple-400">Immutable X Campaign</span> and earn
                <span className="font-bold text-blue-400"> IMX Diamonds</span> by playing Spider Tanks,
                trading NFTs, and completing challenges!
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/30 border border-purple-500/30 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🎮</div>
                  <div className="text-sm font-bold text-purple-400">Play & Earn</div>
                  <div className="text-xs text-gray-400 mt-1">Win matches to earn diamonds</div>
                </div>
                <div className="bg-black/30 border border-blue-500/30 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🛒</div>
                  <div className="text-sm font-bold text-blue-400">Trade NFTs</div>
                  <div className="text-xs text-gray-400 mt-1">Buy & sell on Immutable marketplace</div>
                </div>
                <div className="bg-black/30 border border-pink-500/30 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm font-bold text-pink-400">Complete Challenges</div>
                  <div className="text-xs text-gray-400 mt-1">Finish quests for bonus rewards</div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://www.immutable.com/zkevm-rewards"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50"
                >
                  <span className="text-2xl">💎</span>
                  <div>
                    <div>Earn Rewards on Immutable Play</div>
                    <div className="text-xs font-normal opacity-90">Complete Quests & Claim IMX Rewards</div>
                  </div>
                  <span className="text-xl">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">How IMX Rewards Work</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">1️⃣</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Connect Your Wallet</h3>
              <p className="text-gray-300 text-sm">Link your Immutable X wallet to your Spider Tanks account to start earning.</p>
            </div>
            <div className="bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">2️⃣</div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">Play & Complete Quests</h3>
              <p className="text-gray-300 text-sm">Win matches, complete daily challenges, and participate in events to earn diamonds.</p>
            </div>
            <div className="bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">3️⃣</div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">Collect Diamonds</h3>
              <p className="text-gray-300 text-sm">IMX Diamonds accumulate in your account as you play and trade.</p>
            </div>
            <div className="bg-gradient-to-b from-pink-500/10 to-transparent border border-pink-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">4️⃣</div>
              <h3 className="text-xl font-bold text-pink-400 mb-2">Claim Rewards</h3>
              <p className="text-gray-300 text-sm">Redeem your diamonds for exclusive NFTs, tokens, and in-game items!</p>
            </div>
          </div>
        </div>

        {/* Marketplace Links */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Spider Tanks NFT Marketplace</h2>
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

        {/* Comments Section */}
        <Comments
          url="https://spidertanks.xyz/builder"
          identifier="imx-rewards"
          title="Spider Tanks Guide - IMX Rewards"
        />
      </div>

      <Footer />
    </div>
  );
}
