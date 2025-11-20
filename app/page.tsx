"use client";

import { useEffect, useState } from "react";
import Comments from "./components/Comments";
import Footer from "./components/Footer";
import { useHoverSound } from "./hooks/useHoverSound";

export default function Home() {
  const playHoverSound = useHoverSound();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const launchDate = new Date("2025-12-08T11:00:00Z").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <header className="border-b border-cyan-500/20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cyan-400">Spider Tanks Guide</h1>
              <p className="text-xs text-gray-400">Community Guide - Not affiliated with GAMEDIA</p>
            </div>
            <nav className="hidden md:flex gap-6">
              <a
                href="https://gamedia.nl/spider-tanks-cores-of-chaos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
              >
                Official Site ↗
              </a>
              <a href="/builder" className="text-gray-300 hover:text-cyan-400 transition-colors">Tank Builder</a>
              <a href="/maps" className="text-gray-300 hover:text-cyan-400 transition-colors">Maps</a>
              <a href="/guides" className="text-gray-300 hover:text-cyan-400 transition-colors">Guides</a>
              <a href="/streams" className="text-gray-300 hover:text-cyan-400 transition-colors">Streams</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Spider Tanks: Cores of Chaos
          </h2>
          <p className="text-xl text-gray-400">Your complete guide to dominating the arena</p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-cyan-400 text-center mb-6">Launch Countdown</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/20">
                  <div className="text-4xl font-bold text-cyan-400">{timeLeft.days}</div>
                  <div className="text-sm text-gray-400 mt-2">Days</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/20">
                  <div className="text-4xl font-bold text-cyan-400">{timeLeft.hours}</div>
                  <div className="text-sm text-gray-400 mt-2">Hours</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/20">
                  <div className="text-4xl font-bold text-cyan-400">{timeLeft.minutes}</div>
                  <div className="text-sm text-gray-400 mt-2">Minutes</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/20">
                  <div className="text-4xl font-bold text-cyan-400">{timeLeft.seconds}</div>
                  <div className="text-sm text-gray-400 mt-2">Seconds</div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-400 mt-6 mb-6">
              Until Spider Tanks launches on <span className="text-cyan-400 font-semibold">Immutable X</span> and{" "}
              <span className="text-cyan-400 font-semibold">Epic Games</span>
            </p>

            {/* Epic Games Download Button */}
            <div className="text-center">
              <a
                href="https://store.epicgames.com/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 border border-gray-600 rounded-lg text-white font-bold text-lg hover:from-gray-600 hover:to-gray-800 transition-all transform hover:scale-105"
              >
                <span className="text-2xl">🎮</span>
                <div className="text-left">
                  <div>Download on Epic Games</div>
                  <div className="text-xs text-gray-400 font-normal">Free-to-Play • Available December 8th</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Official Trailer */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🎬</span>
              <h2 className="text-3xl font-bold text-red-400">Watch the Official Trailer</h2>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/5Tyqhqp3GYI?si=n__1tK32fqHmPqHs"
                title="Spider Tanks: Cores of Chaos - Official Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* IMX Diamonds Rewards */}
        <div className="max-w-4xl mx-auto mb-16">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <a href="/builder" onMouseEnter={playHoverSound} className="bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all hover:scale-105 block">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-blue-400 mb-3">Tank Builder</h3>
            <p className="text-gray-400 text-sm">Create custom tank builds with drag-and-drop. See real-time stats and perfect your loadout.</p>
            <div className="mt-4 inline-block px-3 py-1 bg-blue-500 text-black text-sm rounded-full font-bold">Build Now!</div>
          </a>

          <a href="/maps" onMouseEnter={playHoverSound} className="bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20 rounded-lg p-6 hover:border-green-500/40 transition-all hover:scale-105 block">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-green-400 mb-3">Battle Maps</h3>
            <p className="text-gray-400 text-sm">Explore all 12 maps across 5 planets. Learn terrain, strategies, and map control.</p>
            <div className="mt-4 inline-block px-3 py-1 bg-green-500 text-black text-sm rounded-full font-bold">Explore Maps</div>
          </a>

          <a href="/guides" onMouseEnter={playHoverSound} className="bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/40 transition-all hover:scale-105 block">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-purple-400 mb-3">Strategy Guides</h3>
            <p className="text-gray-400 text-sm">Master the meta with beginner to advanced guides. Tips, builds, and winning strategies.</p>
            <div className="mt-4 inline-block px-3 py-1 bg-purple-500 text-black text-sm rounded-full font-bold">Read Guides</div>
          </a>

          <a href="/streams" onMouseEnter={playHoverSound} className="bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20 rounded-lg p-6 hover:border-orange-500/40 transition-all hover:scale-105 block">
            <div className="text-4xl mb-4">📹</div>
            <h3 className="text-xl font-bold text-orange-400 mb-3">Community Streams</h3>
            <p className="text-gray-400 text-sm">Watch and share Spider Tanks gameplay. Submit your best moments and epic battles!</p>
            <div className="mt-4 inline-block px-3 py-1 bg-orange-500 text-black text-sm rounded-full font-bold">Watch Streams</div>
          </a>
        </div>

        <div className="max-w-3xl mx-auto bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-orange-400 mb-4">About Spider Tanks: Cores of Chaos</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Spider Tanks is an intense 3v3 PvP brawler where you pilot customizable tanks in fast-paced arena battles.
            Choose from a wide variety of tank bodies, weapons, and abilities to create your perfect loadout.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            Launching December 8th, 2025 on <span className="text-orange-400 font-semibold">Immutable X</span> blockchain
            and available for download on <span className="text-orange-400 font-semibold">Epic Games</span>.
            Earn Arachnium through victories and quests to upgrade your tanks and dominate the battlefield.
          </p>
          <div className="text-center">
            <a
              href="https://gamedia.nl/spider-tanks-cores-of-chaos"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105"
            >
              <span className="text-xl">🌐</span>
              Visit Official Website
              <span className="text-sm">↗</span>
            </a>
          </div>
        </div>

        {/* Comments Section */}
        <Comments
          url="https://spidertanks.xyz"
          identifier="home"
          title="Spider Tanks Guide - Home"
        />
      </main>

      <Footer />
    </div>
  );
}
