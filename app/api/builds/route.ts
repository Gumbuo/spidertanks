import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const BUILDS_KEY = "spidertanks:builds";
const MAX_BUILDS_PER_USER = 10;

interface BuildData {
  bodyId: string | null;
  weaponId: string | null;
  ability1Id: string | null;
  ability2Id: string | null;
  bodyLevel: number;
  weaponLevel: number;
  selectedBodyModule: number | null;
  selectedWeaponModule: number | null;
}

interface SavedBuild {
  id: string;
  username: string;
  buildName: string;
  build: BuildData;
  createdAt: number;
}

// GET - Fetch builds for a username
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { success: false, error: "Username is required" },
        { status: 400 }
      );
    }

    const allBuilds = await kv.get<SavedBuild[]>(BUILDS_KEY) || [];

    // Filter by username (case-insensitive)
    const userBuilds = allBuilds
      .filter(b => b.username.toLowerCase() === username.toLowerCase())
      .sort((a, b) => b.createdAt - a.createdAt);

    return NextResponse.json({
      success: true,
      builds: userBuilds,
    });
  } catch (error) {
    console.error("Failed to fetch builds:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch builds" },
      { status: 500 }
    );
  }
}

// POST - Save a new build
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, buildName, build } = body;

    // Validate required fields
    if (!username || !buildName || !build) {
      return NextResponse.json(
        { success: false, error: "Username, build name, and build data are required" },
        { status: 400 }
      );
    }

    // Validate username
    if (username.trim().length < 1 || username.trim().length > 20) {
      return NextResponse.json(
        { success: false, error: "Username must be 1-20 characters" },
        { status: 400 }
      );
    }

    // Validate build name
    if (buildName.trim().length < 1 || buildName.trim().length > 30) {
      return NextResponse.json(
        { success: false, error: "Build name must be 1-30 characters" },
        { status: 400 }
      );
    }

    // Get existing builds
    const allBuilds = await kv.get<SavedBuild[]>(BUILDS_KEY) || [];

    // Check user's build count
    const userBuilds = allBuilds.filter(
      b => b.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (userBuilds.length >= MAX_BUILDS_PER_USER) {
      return NextResponse.json(
        { success: false, error: `Maximum ${MAX_BUILDS_PER_USER} builds per user` },
        { status: 400 }
      );
    }

    // Create new build
    const newBuild: SavedBuild = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      username: username.trim(),
      buildName: buildName.trim(),
      build: {
        bodyId: build.bodyId || null,
        weaponId: build.weaponId || null,
        ability1Id: build.ability1Id || null,
        ability2Id: build.ability2Id || null,
        bodyLevel: build.bodyLevel || 10,
        weaponLevel: build.weaponLevel || 10,
        selectedBodyModule: build.selectedBodyModule ?? null,
        selectedWeaponModule: build.selectedWeaponModule ?? null,
      },
      createdAt: Date.now(),
    };

    // Add new build
    allBuilds.push(newBuild);

    // Save back to KV
    await kv.set(BUILDS_KEY, allBuilds);

    return NextResponse.json({
      success: true,
      build: newBuild,
    });
  } catch (error) {
    console.error("Failed to save build:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save build" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a build
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const buildId = searchParams.get("id");
    const username = searchParams.get("username");

    if (!buildId || !username) {
      return NextResponse.json(
        { success: false, error: "Build ID and username are required" },
        { status: 400 }
      );
    }

    // Get existing builds
    const allBuilds = await kv.get<SavedBuild[]>(BUILDS_KEY) || [];

    // Find the build
    const buildIndex = allBuilds.findIndex(b => b.id === buildId);

    if (buildIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Build not found" },
        { status: 404 }
      );
    }

    // Verify ownership (case-insensitive)
    if (allBuilds[buildIndex].username.toLowerCase() !== username.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: "You can only delete your own builds" },
        { status: 403 }
      );
    }

    // Remove the build
    allBuilds.splice(buildIndex, 1);

    // Save back to KV
    await kv.set(BUILDS_KEY, allBuilds);

    return NextResponse.json({
      success: true,
      message: "Build deleted",
    });
  } catch (error) {
    console.error("Failed to delete build:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete build" },
      { status: 500 }
    );
  }
}
