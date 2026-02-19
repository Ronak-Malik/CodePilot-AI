import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/src/lib/dbconnect";
import UserModel from "@/src/models/user.model";
import { profileSchema } from "@/src/schemas/profileSchema";
import { authOptions } from "../auth/[...nextauth]/option";

export async function POST(req: NextRequest) {
  try {
    
    const session = await getServerSession(authOptions);


    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

   
    if (session.user.isProfileCompleted) {
      return NextResponse.json(
        { success: false, message: "Profile already completed" },
        { status: 400 }
      );
    }

    await dbConnect();

    
    const body = await req.json();
    const result = profileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { leetcodeUsername, notifyMail } = result.data;

   
    const updatedUser = await UserModel.findByIdAndUpdate(
      session.user.id,
      {
        leetcodeUsername,
        notifyMail,
        isProfileCompleted: true,
      },
       { returnDocument: "after", runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found in database" },
        { status: 404 }
      );
    }

 
    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leetcodeUsername: updatedUser.leetcodeUsername,
            notifyMail: updatedUser.notifyMail,
           
          }),
        });
      } catch (webhookError) {
        
        console.error("n8n Webhook failed:", webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Profile completed successfully",
    });

  } catch (error: any) {
    console.error("Complete Profile Error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Username or Notify Mail already in use" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}