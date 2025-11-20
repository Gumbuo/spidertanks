"use client";

import { useEffect, useState } from "react";

export default function Home() {
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
              <a href="#tanks" className="text-gray-300 hover:text-cyan-400 transition-colors">Tanks</a>
              <a href="#builds" className="text-gray-300 hover:text-cyan-400 transition-colors">Builds</a>
              <a href="#guides" className="text-gray-300 hover:text-cyan-400 transition-colors">Guides</a>
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
            <p className="text-center text-gray-400 mt-6">
              Until Spider Tanks launches on <span className="text-cyan-400 font-semibold">Immutable X</span> and{" "}
              <span className="text-cyan-400 font-semibold">Epic Games</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/40 transition-colors">
            <div className="text-4xl mb-4">🕷️</div>
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Tank Database</h3>
            <p className="text-gray-400">Complete stats and details for all tank bodies, weapons, and abilities. Plan your loadout with comprehensive data.</p>
            <div className="mt-4 inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">Coming Soon</div>
          </div>

          <a href="/builder" className="bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-colors block">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-blue-400 mb-3">Build Calculator</h3>
            <p className="text-gray-400">Create and share custom tank builds. Test different combinations of bodies, weapons, and abilities.</p>
            <div className="mt-4 inline-block px-3 py-1 bg-blue-500 text-black text-sm rounded-full font-bold">Try It Now!</div>
          </a>

          <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/40 transition-colors">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Strategy Guides</h3>
            <p className="text-gray-400">Master the meta with in-depth guides. Learn map strategies, team compositions, and advanced tactics.</p>
            <div className="mt-4 inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">Coming Soon</div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-orange-400 mb-4">About Spider Tanks: Cores of Chaos</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Spider Tanks is an intense 3v3 PvP brawler where you pilot customizable tanks in fast-paced arena battles.
            Choose from a wide variety of tank bodies, weapons, and abilities to create your perfect loadout.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Launching December 8th, 2025 on <span className="text-orange-400 font-semibold">Immutable X</span> blockchain
            and available for download on <span className="text-orange-400 font-semibold">Epic Games</span>.
            Earn Arachnium through victories and quests to upgrade your tanks and dominate the battlefield.
          </p>
        </div>
      </main>

      <footer className="border-t border-cyan-500/20 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p className="mb-2">This is a community-created fan site and is not affiliated with, endorsed by, or associated with GAMEDIA or Spider Tanks.</p>
          <p>All trademarks and copyrights belong to their respective owners.</p>
        </div>
      </footer>
    </div>
  );
}
