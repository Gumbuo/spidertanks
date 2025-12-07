"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  name: string;
  comment: string;
  createdAt: number;
}

export default function AdminPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/comments");
      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (err) {
      setError("Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim()) {
      setIsAuthenticated(true);
      fetchComments();
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    setDeleting(commentId);
    setError("");

    try {
      const res = await fetch(`/api/comments?id=${commentId}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey,
        },
      });

      const data = await res.json();

      if (data.success) {
        setComments(comments.filter((c) => c.id !== commentId));
      } else {
        setError(data.error || "Failed to delete comment");
      }
    } catch (err) {
      setError("Failed to delete comment");
    } finally {
      setDeleting(null);
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Admin Login</h1>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Enter admin key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 mb-4"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-cyan-400">Comment Admin</h1>
            <div className="flex gap-4">
              <button
                onClick={fetchComments}
                className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-colors"
              >
                Refresh
              </button>
              <a
                href="/"
                className="px-4 py-2 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-lg hover:bg-gray-500/30 transition-colors"
              >
                Back to Site
              </a>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <div className="mb-4 text-gray-400">
            Total comments: {comments.length}
          </div>

          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No comments yet</div>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-cyan-400">{c.name}</span>
                        <span className="text-xs text-gray-500">{formatDate(c.createdAt)}</span>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap">{c.comment}</p>
                      <div className="text-xs text-gray-600 mt-2">ID: {c.id}</div>
                    </div>
                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={deleting === c.id}
                      className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                    >
                      {deleting === c.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
