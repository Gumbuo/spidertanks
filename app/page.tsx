"use client";

import { useEffect, useState, useRef } from "react";
import Comments from "./components/Comments";
import Footer from "./components/Footer";
import TankBuilder from "./components/TankBuilder";
import { useHoverSound } from "./hooks/useHoverSound";

export default function Home() {
  const playHoverSound = useHoverSound();
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Show video popup on page load
  useEffect(() => {
    setShowVideo(true);
  }, []);

  // Handle video autoplay with unmute
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const video = videoRef.current;
      // Start muted for autoplay
      video.muted = true;
      video.play().then(() => {
        // Once playing, unmute it
        video.muted = false;
      }).catch(() => {
        // If autoplay fails, keep it muted
        video.muted = true;
      });
    }
  }, [showVideo]);

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

  const closeVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Video Popup Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl mx-4">
            {/* Video Container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-cyan-500">
              <video
                ref={videoRef}
                autoPlay
                controls
                className="w-full h-auto"
                onEnded={closeVideo}
              >
                <source src="/Fox_Fights_Alien_Wins_Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
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
                href="/builder"
                onMouseEnter={playHoverSound}
                className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/20 transition-all"
              >
                IMX Rewards
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
                href="http://discord.gg/spidertanks"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-400 hover:bg-indigo-500/20 transition-all font-semibold"
              >
                Discord
              </a>
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

        {/* What's New Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            What's New in Cores of Chaos
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Free to Play */}
            <div className="bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🎮</span>
                <h3 className="text-2xl font-bold text-green-400">Free to Play for Everyone</h3>
              </div>
              <p className="text-gray-300 mb-4">
                No barriers to entry. No complicated web3 accounts required. No need to own rare digital assets.
              </p>
              <p className="text-gray-400 text-sm">
                Jump straight into the action on your favorite platform and start battling immediately!
              </p>
            </div>

            {/* Progression System */}
            <div className="bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🏆</span>
                <h3 className="text-2xl font-bold text-purple-400">New Progression System</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Unlock every tank body and weapon by conquering the competition.
              </p>
              <p className="text-gray-400 text-sm">
                Prove you're the best in the solar system and customize your arsenal!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Tank Variations */}
            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3 text-center">⚙️</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2 text-center">Tank Variations</h3>
              <p className="text-gray-400 text-sm text-center">
                Customize your tank with unique variations for personalized destruction and death-defying escapes.
              </p>
            </div>

            {/* New Mobility */}
            <div className="bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3 text-center">🚀</div>
              <h3 className="text-xl font-bold text-blue-400 mb-2 text-center">Enhanced Mobility</h3>
              <p className="text-gray-400 text-sm text-center">
                New mobility options that will completely change the way you see the arena.
              </p>
            </div>

            {/* Arena Forces */}
            <div className="bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3 text-center">⚡</div>
              <h3 className="text-xl font-bold text-orange-400 mb-2 text-center">Arena Hazards</h3>
              <p className="text-gray-400 text-sm text-center">
                Powerful forces now hide within the arenas. Surviving other tankers may not be enough!
              </p>
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

        {/* Tank Builder */}
        <div className="mb-16">
          <TankBuilder />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <a href="/builder" onMouseEnter={playHoverSound} className="bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/40 transition-all hover:scale-105 block">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-bold text-purple-400 mb-3">IMX Rewards</h3>
            <p className="text-gray-400 text-sm">Earn IMX Diamonds by playing Spider Tanks. Complete quests and claim rewards!</p>
            <div className="mt-4 inline-block px-3 py-1 bg-purple-500 text-white text-sm rounded-full font-bold">Earn Now!</div>
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

      </main>

      {/* Comments Section - Below Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <Comments
          url="https://spidertanks.xyz"
          identifier="home"
          title="Spider Tanks Guide - Home"
        />
      </div>

      <Footer />
    </div>
  );
}
