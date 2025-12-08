"use client";

import { useEffect, useState } from "react";

import Footer from "./components/Footer";
import TankBuilder from "./components/TankBuilder";
import CommentSection from "./components/CommentSection";
import { useHoverSound } from "./hooks/useHoverSound";

export default function Home() {
  const playHoverSound = useHoverSound();
  const [showSplash, setShowSplash] = useState(true);
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
      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div
            className="text-center cursor-pointer p-12 rounded-2xl border-4 border-cyan-500 bg-gradient-to-b from-gray-900 to-black hover:border-cyan-400 transition-all transform hover:scale-105"
            onClick={() => setShowSplash(false)}
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              SPIDER TANKS
            </h1>
            <p className="text-3xl md:text-5xl font-bold text-white mb-8">
              December 8th
            </p>
            <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xl rounded-lg transition-colors">
              Enter Site
            </button>
          </div>
        </div>
      )}

      <header className="border-b border-cyan-500/20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cyan-400">Spider Tanks Guide</h1>
              <p className="text-xs text-gray-400">Community Guide - Not affiliated with GAMEDIA</p>
            </div>
            <nav className="hidden md:flex gap-3">
              <a
                href="https://gamedia.nl/spider-tanks-cores-of-chaos"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-all font-semibold"
              >
                Official Site ↗
              </a>
              <a
                href="/maps"
                onMouseEnter={playHoverSound}
                className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 transition-all"
              >
                Maps
              </a>
              <a
                href="/guides"
                onMouseEnter={playHoverSound}
                className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/20 transition-all"
              >
                Guides
              </a>
              <a
                href="/streams"
                onMouseEnter={playHoverSound}
                className="px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 hover:bg-orange-500/20 transition-all"
              >
                Streams
              </a>
              <div className="border-l border-gray-700 mx-2"></div>
              <a
                href="https://x.com/GAMEDIA_GAMES"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-all font-semibold"
              >
                Twitter
              </a>
            </nav>
          </div>
        </div>
        {/* Centered Stream Banner */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-b border-orange-500/30 py-2">
          <a
            href="/streams"
            onMouseEnter={playHoverSound}
            className="flex items-center justify-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
          >
            📺 Want your stream featured in our strategy guides? Submit here →
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative">
        {/* Random Tank Parts Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {/* Weapons - Left Side */}
          <img src="/images/weapons/bouncer-gun.png" alt="" className="absolute w-24 h-24 object-contain" style={{ top: "5%", left: "3%", transform: "rotate(15deg)" }} />
          <img src="/images/weapons/crossbow.png" alt="" className="absolute w-28 h-28 object-contain" style={{ top: "20%", left: "8%", transform: "rotate(45deg)" }} />
          <img src="/images/weapons/beat-blaster.png" alt="" className="absolute w-24 h-24 object-contain" style={{ top: "38%", left: "2%", transform: "rotate(60deg)" }} />
          <img src="/images/weapons/blade-spinner.png" alt="" className="absolute w-20 h-20 object-contain" style={{ top: "55%", left: "10%", transform: "rotate(-30deg)" }} />
          <img src="/images/weapons/cannon.png" alt="" className="absolute w-32 h-32 object-contain" style={{ top: "72%", left: "5%", transform: "rotate(-20deg)" }} />
          <img src="/images/weapons/crossbow.png" alt="" className="absolute w-20 h-20 object-contain" style={{ top: "88%", left: "8%", transform: "rotate(35deg)" }} />

          {/* Weapons - Right Side */}
          <img src="/images/weapons/cannon.png" alt="" className="absolute w-28 h-28 object-contain" style={{ top: "8%", right: "5%", transform: "rotate(-25deg)" }} />
          <img src="/images/weapons/bouncer-gun.png" alt="" className="absolute w-22 h-22 object-contain" style={{ top: "28%", right: "3%", transform: "rotate(40deg)" }} />
          <img src="/images/weapons/blade-spinner.png" alt="" className="absolute w-26 h-26 object-contain" style={{ top: "45%", right: "8%", transform: "rotate(-15deg)" }} />
          <img src="/images/weapons/beat-blaster.png" alt="" className="absolute w-20 h-20 object-contain" style={{ top: "62%", right: "2%", transform: "rotate(55deg)" }} />
          <img src="/images/weapons/crossbow.png" alt="" className="absolute w-24 h-24 object-contain" style={{ top: "78%", right: "6%", transform: "rotate(-45deg)" }} />
          <img src="/images/weapons/cannon.png" alt="" className="absolute w-18 h-18 object-contain" style={{ top: "92%", right: "4%", transform: "rotate(20deg)" }} />

          {/* Tank Bodies - Scattered */}
          <img src="/images/bodies/bandit.png" alt="" className="absolute w-32 h-32 object-contain" style={{ top: "12%", right: "18%", transform: "rotate(-15deg)" }} />
          <img src="/images/bodies/crab.png" alt="" className="absolute w-28 h-28 object-contain" style={{ top: "32%", left: "18%", transform: "rotate(25deg)" }} />
          <img src="/images/bodies/chicken.png" alt="" className="absolute w-24 h-24 object-contain" style={{ top: "48%", right: "20%", transform: "rotate(-40deg)" }} />
          <img src="/images/bodies/flea.png" alt="" className="absolute w-20 h-20 object-contain" style={{ top: "65%", left: "22%", transform: "rotate(10deg)" }} />
          <img src="/images/bodies/blink.png" alt="" className="absolute w-26 h-26 object-contain" style={{ top: "82%", right: "22%", transform: "rotate(-25deg)" }} />
          <img src="/images/bodies/bandit.png" alt="" className="absolute w-22 h-22 object-contain" style={{ top: "95%", left: "25%", transform: "rotate(30deg)" }} />
          <img src="/images/bodies/crab.png" alt="" className="absolute w-20 h-20 object-contain" style={{ top: "18%", left: "25%", transform: "rotate(-35deg)" }} />
          <img src="/images/bodies/chicken.png" alt="" className="absolute w-18 h-18 object-contain" style={{ top: "75%", right: "30%", transform: "rotate(50deg)" }} />
        </div>

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Spider Tanks: Cores of Chaos
          </h2>
          <p className="text-xl text-gray-400">Your complete guide to dominating the arena</p>
        </div>

        {/* Official Trailer */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🎬</span>
              <h2 className="text-3xl font-bold text-red-400">Watch the Official Trailer</h2>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              {!showSplash && (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/5Tyqhqp3GYI?autoplay=1&si=n__1tK32fqHmPqHs"
                  title="Spider Tanks: Cores of Chaos - Official Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-8 relative overflow-hidden">
            {/* Background Logo */}
            <div
              className="absolute inset-0 bg-center bg-no-repeat opacity-15"
              style={{
                backgroundImage: "url('/images/weapons/bouncer-gun.png')",
                backgroundSize: "400px"
              }}
            ></div>

            <div className="relative z-10">
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
              Until Spider Tanks launches on <span className="text-cyan-400 font-semibold">Epic Games</span> for{" "}
              <span className="text-cyan-400 font-semibold">PC and Mac</span>
            </p>

            {/* Download Buttons */}
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=nl.gamedia.spidertanks&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 border border-green-500 rounded-lg text-white font-bold hover:from-green-500 hover:to-green-600 transition-all transform hover:scale-105"
              >
                <span className="text-2xl">📱</span>
                <div className="text-left">
                  <div className="text-base">Android</div>
                  <div className="text-xs text-green-200 font-normal">Google Play • Now!</div>
                </div>
              </a>
              <a
                href="https://apps.apple.com/us/app/spider-tanks-cores-of-chaos/id6746262642"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-500 rounded-lg text-white font-bold hover:from-blue-500 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <div className="text-base">iOS</div>
                  <div className="text-xs text-blue-200 font-normal">App Store • Now!</div>
                </div>
              </a>
              <a
                href="https://store.epicgames.com/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 border border-gray-600 rounded-lg text-white font-bold hover:from-gray-600 hover:to-gray-800 transition-all transform hover:scale-105"
              >
                <span className="text-2xl">🎮</span>
                <div className="text-left">
                  <div className="text-base">PC</div>
                  <div className="text-xs text-gray-400 font-normal">Epic Games • Dec 8th</div>
                </div>
              </a>
            </div>
            </div>
          </div>
        </div>

        {/* Tank Builder */}
        <div className="mb-16">
          <TankBuilder />
        </div>

        {/* Stream Submission CTA */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">📺</span>
              <h3 className="text-2xl font-bold text-orange-400">Want Your Stream in Our Strategy Guides?</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Submit your stream URL and get featured in our community guides!
            </p>
            <a
              href="/streams"
              onMouseEnter={playHoverSound}
              className="inline-block px-6 py-3 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition-colors"
            >
              Submit to Streams →
            </a>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">The 5 Who Shaped This Guide</h3>
            <div className="rounded-lg overflow-hidden mb-4">
              <img
                src="/images/team.jpg"
                alt="The team behind Spider Tanks Guide"
                className="w-full max-w-2xl mx-auto rounded-lg"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Built by the community, for the community.
            </p>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mb-16">
          <CommentSection />
        </div>

      </main>

      <Footer />
    </div>
  );
}
