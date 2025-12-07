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
            <h3 className="text-lg font-bold text-cyan-400 mb-4">Check Out Our Other Projects</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <a
                href="https://univershole.xyz"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="px-4 py-3 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors block"
              >
                <div className="text-purple-400 font-bold">* UniversHole.xyz</div>
                <div className="text-gray-400 text-xs mt-1">Pixel Art Sales</div>
              </a>
              <a
                href="https://univershole.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors block"
              >
                <div className="text-green-400 font-bold">* UniversHole.com</div>
                <div className="text-gray-400 text-xs mt-1">Cool Online Tools</div>
              </a>
              <a
                href="https://gamehole.ink"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="px-4 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-colors block"
              >
                <div className="text-cyan-400 font-bold">~ Gamehole.ink</div>
                <div className="text-gray-400 text-xs mt-1">Free Game Hosting</div>
              </a>
              <a
                href="https://gamehole.games"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="px-4 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-colors block"
              >
                <div className="text-cyan-400 font-bold">! Gamehole.games</div>
                <div className="text-gray-400 text-xs mt-1">Free Games to Play</div>
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              These projects have no relation to Spider Tanks or GAMEDIA. For any issues, contact Foxhole, not GAMEDIA.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-cyan-500/10 pt-6 text-center text-gray-400 text-sm">
            <p className="mb-3 text-cyan-400 font-semibold">
              Community Fan Site for Spider Tanks
            </p>
            <p className="mb-3">
              <a
                href="https://x.com/GAMEDIA_GAMES"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Follow GAMEDIA on X/Twitter</span>
                <span>→</span>
              </a>
            </p>
            <p className="mb-2 leading-relaxed">
              This is an unofficial fan-made tool created with respect and appreciation for Spider Tanks and GAMEDIA.
              We aim to help the Spider Tanks community with tank building, strategy planning, and game resources.
            </p>
            <p className="mb-2 text-xs leading-relaxed">
              Spider Tanks, all tank designs, game assets, and related content are the property of GAMEDIA.
              All tank images are sourced from the publicly available Spider Tanks Fandom Wiki.
            </p>
            <p className="text-xs text-gray-500">
              Not officially affiliated with, endorsed by, or sponsored by GAMEDIA. All trademarks and copyrights belong to their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
