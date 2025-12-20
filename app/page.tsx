"use client";

import { useEffect, useState } from "react";

import Footer from "./components/Footer";
import TankBuilder from "./components/TankBuilder";
import PartsDatabase from "./components/PartsDatabase";
import FactoriesSection from "./components/FactoriesSection";
import CommentSection from "./components/CommentSection";
import { useHoverSound } from "./hooks/useHoverSound";

const backgrounds = [
  "/images/bg-spidergang.jpg",
  "/images/bg-gumbuo.jpg",
  "/images/bg-spidergang2.jpg",
  "/images/bg-gmb-ape.jpg",
  "/images/bg-gmb-frog.jpg"
];

export default function Home() {
  const playHoverSound = useHoverSound();
  const [showSplash, setShowSplash] = useState(true);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-white relative">
      {/* Rotating Background */}
      {backgrounds.map((bg, i) => (
        <div
          key={bg}
          className={`fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            i === bgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})`, zIndex: -2 }}
        />
      ))}
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }} />

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
              OUT NOW
            </p>
            <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xl rounded-lg transition-colors">
              Enter Site
            </button>
          </div>
        </div>
      )}

      <header className="border-b border-cyan-500/20 bg-black/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cyan-400">Spider Tanks Guide</h1>
              <p className="text-xs text-gray-400">Community Guide - Not affiliated with GAMEDIA</p>
            </div>
            <nav className="hidden md:flex gap-3">
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

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Spider Tanks: Cores of Chaos
          </h2>
          <p className="text-xl text-gray-400">Your complete guide to dominating the arena</p>
        </div>

        {/* Official Trailer */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🎬</span>
              <h2 className="text-3xl font-bold text-red-400">Watch the Official Trailer</h2>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              {!showSplash && (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/MLokMJ_m454?autoplay=1"
                  title="Spider Tanks: Cores of Chaos"
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

        {/* Tank Builder */}
        <div className="mb-16">
          <TankBuilder />
        </div>

        {/* Parts Database */}
        <div className="mb-16">
          <PartsDatabase />
        </div>

        {/* Factories */}
        <div className="mb-16">
          <FactoriesSection />
        </div>

        {/* Stream Submission CTA */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-6 text-center backdrop-blur-sm">
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

        {/* Comment Section */}
        <div className="mb-16">
          <CommentSection />
        </div>

      </main>

      <Footer />
    </div>
  );
}
