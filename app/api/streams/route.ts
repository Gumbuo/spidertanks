import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const STREAMS_KEY = "spidertanks:streams";

// GET - Fetch all streams
export async function GET() {
  try {
    // Fetch streams from Vercel KV
    const streams = await kv.get<any[]>(STREAMS_KEY) || [];

    // Sort by submission time, newest first
    const sortedStreams = [...streams].sort((a, b) => b.submittedAt - a.submittedAt);

    return NextResponse.json({
      success: true,
      streams: sortedStreams,
    });
  } catch (error) {
    console.error("Failed to fetch streams:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch streams" },
      { status: 500 }
    );
  }
}

// POST - Submit a new stream
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, url, username, platform } = body;

    // Validate required fields
    if (!title || !url || !username || !platform) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate platform
    if (platform !== "youtube" && platform !== "twitch") {
      return NextResponse.json(
        { success: false, error: "Invalid platform. Must be 'youtube' or 'twitch'" },
        { status: 400 }
      );
    }

    // Validate URL format
    if (platform === "youtube" && !url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)/)) {
      return NextResponse.json(
        { success: false, error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    if (platform === "twitch" && !url.match(/twitch\.tv\/videos\/\d+/)) {
      return NextResponse.json(
        { success: false, error: "Invalid Twitch VOD URL" },
        { status: 400 }
      );
    }

    // Create new stream entry
    const newStream = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      url: url.trim(),
      username: username.trim(),
      platform,
      submittedAt: Date.now(),
    };

    // Get existing streams from KV
    const streams = await kv.get<any[]>(STREAMS_KEY) || [];

    // Add new stream
    streams.push(newStream);

    // Limit to 100 most recent streams
    const updatedStreams = streams.length > 100 ? streams.slice(-100) : streams;

    // Save back to KV
    await kv.set(STREAMS_KEY, updatedStreams);

    return NextResponse.json({
      success: true,
      stream: newStream,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to submit stream" },
      { status: 500 }
    );
  }
}
