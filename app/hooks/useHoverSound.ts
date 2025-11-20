"use client";

import { useCallback, useRef } from "react";

export function useHoverSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playHoverSound = useCallback(() => {
    try {
      // Create audio context lazily (only on first use)
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configure sound - subtle sci-fi beep
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Higher pitch
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Low volume
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      // Play
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Silently fail if audio context is not supported
      console.warn("Audio not supported:", error);
    }
  }, []);

  return playHoverSound;
}
