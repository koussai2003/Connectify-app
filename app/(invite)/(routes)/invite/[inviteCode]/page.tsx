import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  // Get current profile
  const profile = await currentProfile();

  // If no profile, redirect to sign in
  if (!profile) {
    return redirectToSignIn();
  }

  // If no invite code, redirect to home
  if (!params.inviteCode) {
    return redirect("/");
  }

  // Check if user is already a member of the server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  // If user is already a member, redirect to server
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // Add user as member of server
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });

  // If server was joined, redirect to server
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  // Return null if no server was joined
  return null;
};

export default InviteCodePage;
