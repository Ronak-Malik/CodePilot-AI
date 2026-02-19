import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/src/lib/dbconnect";
import UserModel from "@/src/models/user.model";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    await dbConnect();

    const user = await UserModel.findById(session.user.id);

    if (!user?.leetcodeUsername) {
      return NextResponse.json(
        { success: false, message: "LeetCode username not found" },
        { status: 400 }
      );
    }

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                ranking
              }
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              submissionCalendar
            }
          }
        `,
        variables: {
          username: user.leetcodeUsername,
        },
      }),
    });

    const data = await response.json();
    const matchedUser = data?.data?.matchedUser;

    if (!matchedUser) {
      return NextResponse.json(
        { success: false, message: "LeetCode user not found" },
        { status: 404 }
      );
    }

    const stats = matchedUser.submitStats.acSubmissionNum;

    const totalSolved =
      stats.find((s: any) => s.difficulty === "All")?.count || 0;

    const easy =
      stats.find((s: any) => s.difficulty === "Easy")?.count || 0;

    const medium =
      stats.find((s: any) => s.difficulty === "Medium")?.count || 0;

    const hard =
      stats.find((s: any) => s.difficulty === "Hard")?.count || 0;

    const calendarRaw = matchedUser.submissionCalendar;
    let currentStreak = 0;

    if (calendarRaw) {
      const calendar = JSON.parse(calendarRaw);

      const submissionDays = Object.keys(calendar)
        .map((timestamp) => parseInt(timestamp))
        .sort((a, b) => a - b);

      const today = Math.floor(Date.now() / 1000);
      const oneDay = 60 * 60 * 24;

      let expectedDay = Math.floor(today / oneDay) * oneDay;

      for (let i = submissionDays.length - 1; i >= 0; i--) {
        const day = Math.floor(submissionDays[i] / oneDay) * oneDay;

        if (day === expectedDay) {
          currentStreak++;
          expectedDay -= oneDay;
        } else if (day < expectedDay) {
          break;
        }
      }
    }

    const formatted = {
      username: user.leetcodeUsername,
      ranking: matchedUser.profile.ranking,
      totalSolved,
      easy,
      medium,
      hard,
      streak: currentStreak,
    };

    return NextResponse.json({
      success: true,
      data: formatted,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error fetching stats" },
      { status: 500 }
    );
  }
}
