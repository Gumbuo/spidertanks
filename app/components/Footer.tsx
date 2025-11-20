"use client";

import { useHoverSound } from "../hooks/useHoverSound";

export default function Footer() {
  const playHoverSound = useHoverSound();

  return (
    <footer className="border-t border-cyan-500/20 mt-16 py-8 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Other Projects */}
          <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-cyan-400 mb-3">Check Out Our Other Projects</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://gumbuo.io"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-colors"
              >
                🎮 Gumbuo.io
              </a>
              <a
                href="https://gamehole.ink"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-colors"
              >
                🎯 Gamehole.ink
              </a>
              <a
                href="https://gamehole.games"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-colors"
              >
                🕹️ Gamehole.games
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-cyan-500/10 pt-6 text-center text-gray-400 text-sm">
            <p className="mb-2 font-semibold text-orange-400">
              ⚠️ Not Affiliated with GAMEDIA
            </p>
            <p className="mb-2">
              This is a community-created fan site and is not affiliated with, endorsed by, or associated with GAMEDIA or Spider Tanks.
            </p>
            <p>All trademarks and copyrights belong to their respective owners.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
