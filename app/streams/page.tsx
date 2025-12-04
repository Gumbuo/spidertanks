"use client";

import { useState, useEffect } from "react";

import Footer from "../components/Footer";
import { useHoverSound } from "../hooks/useHoverSound";

interface Stream {
  id: string;
  title: string;
  url: string;
  username: string;
  platform: "youtube" | "twitch";
  submittedAt: number;
}

export default function StreamsPage() {
  const playHoverSound = useHoverSound();
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    username: "",
    platform: "youtube" as "youtube" | "twitch",
  });

  // Load streams
  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      const response = await fetch("/api/streams");
      if (response.ok) {
        const data = await response.json();
        setStreams(data.streams || []);
      }
    } catch (error) {
      console.error("Failed to fetch streams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/streams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form and refresh streams
        setFormData({ title: "", url: "", username: "", platform: "youtube" });
        fetchStreams();
        alert("Stream submitted successfully! 🎮");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to submit stream");
      }
    } catch (error) {
      alert("Failed to submit stream. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Extract video ID from URL
  const getVideoId = (url: string, platform: "youtube" | "twitch") => {
    if (platform === "youtube") {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
      return match ? match[1] : null;
    }
    // Twitch video URL format: twitch.tv/videos/1234567890
    const match = url.match(/twitch\.tv\/videos\/(\d+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Community Streams
          </h1>
          <p className="text-xl text-gray-400">
            Share your Spider Tanks gameplay and watch other players in action
          </p>
        </div>

        {/* Submit Stream Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📹</span>
              <h2 className="text-2xl font-bold text-purple-400">Submit Your Stream</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Stream Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Epic 3v3 Victory - Tank Destroyer Build"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Your Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="YourSpiderTanksName"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Platform
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="platform"
                      value="youtube"
                      checked={formData.platform === "youtube"}
                      onChange={(e) =>
                        setFormData({ ...formData, platform: e.target.value as "youtube" })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300">YouTube</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="platform"
                      value="twitch"
                      checked={formData.platform === "twitch"}
                      onChange={(e) =>
                        setFormData({ ...formData, platform: e.target.value as "twitch" })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300">Twitch</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Video/VOD URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="https://youtube.com/watch?v=... or https://twitch.tv/videos/..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                onMouseEnter={playHoverSound}
                className="w-full px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Stream"}
              </button>
            </form>
          </div>
        </div>

        {/* Streams Grid */}
        <div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">Recent Streams</h2>

          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading streams...</div>
          ) : streams.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No streams yet. Be the first to share your gameplay! 🎮
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {streams.map((stream) => {
                const videoId = getVideoId(stream.url, stream.platform);
                return (
                  <div
                    key={stream.id}
                    className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all"
                  >
                    {/* Video Embed */}
                    {videoId && (
                      <div className="aspect-video bg-black">
                        {stream.platform === "youtube" ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        ) : (
                          <iframe
                            src={`https://player.twitch.tv/?video=${videoId}&parent=${window.location.hostname}&autoplay=false`}
                            allowFullScreen
                            className="w-full h-full"
                          />
                        )}
                      </div>
                    )}

                    {/* Stream Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-cyan-400 mb-2">{stream.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          👤 {stream.username}
                        </span>
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs uppercase">
                          {stream.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
      </div>

      <Footer />
    </div>
  );
}
