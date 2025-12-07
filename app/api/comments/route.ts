import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const COMMENTS_KEY = "spidertanks:comments";
const MAX_COMMENTS = 200;

interface Comment {
  id: string;
  name: string;
  comment: string;
  createdAt: number;
}

// GET - Fetch all comments
export async function GET() {
  try {
    const comments = await kv.get<Comment[]>(COMMENTS_KEY) || [];

    // Sort by creation time, newest first
    const sortedComments = [...comments].sort((a, b) => b.createdAt - a.createdAt);

    return NextResponse.json({
      success: true,
      comments: sortedComments,
    });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST - Submit a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, comment } = body;

    // Validate required fields
    if (!name || !comment) {
      return NextResponse.json(
        { success: false, error: "Name and comment are required" },
        { status: 400 }
      );
    }

    // Validate lengths
    if (name.trim().length < 1 || name.trim().length > 50) {
      return NextResponse.json(
        { success: false, error: "Name must be 1-50 characters" },
        { status: 400 }
      );
    }

    if (comment.trim().length < 1 || comment.trim().length > 500) {
      return NextResponse.json(
        { success: false, error: "Comment must be 1-500 characters" },
        { status: 400 }
      );
    }

    // Create new comment
    const newComment: Comment = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      comment: comment.trim(),
      createdAt: Date.now(),
    };

    // Get existing comments
    const comments = await kv.get<Comment[]>(COMMENTS_KEY) || [];

    // Add new comment
    comments.push(newComment);

    // Limit to MAX_COMMENTS most recent
    const updatedComments = comments.length > MAX_COMMENTS
      ? comments.slice(-MAX_COMMENTS)
      : comments;

    // Save back to KV
    await kv.set(COMMENTS_KEY, updatedComments);

    return NextResponse.json({
      success: true,
      comment: newComment,
    });
  } catch (error) {
    console.error("Failed to submit comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit comment" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a comment (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const adminKey = request.headers.get("x-admin-key");

    // Check admin key
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("id");

    if (!commentId) {
      return NextResponse.json(
        { success: false, error: "Comment ID required" },
        { status: 400 }
      );
    }

    // Get existing comments
    const comments = await kv.get<Comment[]>(COMMENTS_KEY) || [];

    // Filter out the comment to delete
    const updatedComments = comments.filter(c => c.id !== commentId);

    if (updatedComments.length === comments.length) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 }
      );
    }

    // Save back to KV
    await kv.set(COMMENTS_KEY, updatedComments);

    return NextResponse.json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
