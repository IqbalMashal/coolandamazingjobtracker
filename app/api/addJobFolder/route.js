import { NextResponse } from "next/server";
import { addJobFolder } from "@/lib/jobFolderData";

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, name, description, userId } = body;

    if (!id || !name || !userId) {
      return NextResponse.json(
        { error: "id, name, and userId are required" },
        { status: 400 }
      );
    }

    const result = await addJobFolder(id, userId, name, description);

    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
