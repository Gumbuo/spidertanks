"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  name: string;
  comment: string;
  createdAt: number;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch comments on mount
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/comments");
      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim() || !comment.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), comment: comment.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setComments([data.comment, ...comments]);
        setName("");
        setComment("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || "Failed to submit comment");
      }
    } catch (err) {
      setError("Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl">💬</span>
          <h3 className="text-2xl font-bold text-cyan-400">Community Feedback</h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
            <div className="text-right text-xs text-gray-500 md:hidden">
              {name.length}/50
            </div>
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Leave your feedback or comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 resize-none"
            />
            <div className="text-right text-xs text-gray-500">
              {comment.length}/500
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
              Comment posted successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-400 py-8">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No comments yet. Be the first to leave feedback!
            </div>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="bg-black/30 border border-white/10 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-cyan-400">{c.name}</span>
                  <span className="text-xs text-gray-500">{formatDate(c.createdAt)}</span>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{c.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
