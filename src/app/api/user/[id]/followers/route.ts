import { LimitType } from "@lens-protocol/client";
import { NextRequest, NextResponse } from "next/server";
import { lensAcountToUser } from "~/components/user/User";
import { getServerAuth } from "~/utils/getServerAuth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const cursor = req.nextUrl.searchParams.get("cursor") ?? undefined;

  try {
    const { client } = await getServerAuth();

    const following = await client.profile.followers({
      limit: LimitType.Fifty,
      of: id,
      cursor
    });

    if (!following) {
      return NextResponse.json({ error: "Failed to fetch followers" }, { status: 500 });

    }

    const users = following.items.map(lensAcountToUser)

    return NextResponse.json({ data: users, nextCursor: following.pageInfo.next }, { status: 200 });
  } catch (error) {
    console.error("Failed to follow profile: ", error.message);
    return NextResponse.json({ error: `${error.message}` }, { status: 500 });
  }
}
