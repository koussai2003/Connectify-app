import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// This function handles a PATCH request to update a server's invite code.
// It first checks if the user is authorized by fetching the current profile.
// If the profile is not found, it returns an unauthorized response.
// Then, it checks if the server ID is provided. If not, it returns a bad request response.
// Next, it updates the server's invite code using the provided server ID and the current profile ID.
// Finally, it returns the updated server object as a JSON response.
// If any errors occur during the process, it logs the error and returns an internal server error response.
export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.serverId) return new NextResponse("Server ID is Missing", { status: 400 });

    const server = await db.server.update({ where: { id: params.serverId, profileId: profile.id }, data: { inviteCode: uuidv4() } });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
