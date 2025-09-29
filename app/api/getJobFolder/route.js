import { NextResponse } from "next/server";
import { getUserJobFolders } from "@/lib/jobFolderData";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get('userID');
    
    if (!userID) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const folders = await getUserJobFolders(userID);
    return NextResponse.json(folders);
  } catch (error) {
    console.error("Error fetching job folders:", error);
    return NextResponse.json({ error: "Failed to fetch folders" }, { status: 500 });
  }
}