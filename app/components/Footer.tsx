"use client";

import { useHoverSound } from "../hooks/useHoverSound";

export default function Footer() {
  const playHoverSound = useHoverSound();

  return (
    <footer className="border-t border-cyan-500/20 mt-16 py-8 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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
