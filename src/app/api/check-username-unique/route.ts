import { profileSchema, usernameValidation } from "@/src/schemas/profileSchema";
import UserModel from "@/src/models/user.model";
import z from "zod";
import dbConnect from "@/src/lib/dbconnect";
import { url } from "inspector/promises";


const usernameQuerySchema = z.object({
   leetcodeUsername : usernameValidation
});

export async function GET(req: Request){
    await dbConnect();

    try{
        const { searchParams } = new URL(req.url);
        const queryParams ={
            leetcodeUsername : searchParams.get('leetcodeUsername'),
        };

        const result = usernameQuerySchema.safeParse(queryParams);

        if (!result.success) {
          const usernameErrors = result.error.format().leetcodeUsername?._errors || [];
          return Response.json(
           {
             success: false,
             message:
            usernameErrors?.length > 0
              ? usernameErrors.join(', ')
              : 'Invalid query parameters',
            },
             { status: 400 }
        );
      }

      const {leetcodeUsername} = result.data;

      const existingUser =await  UserModel.findOne({
        leetcodeUsername,
      });

     if (existingUser) {
      return Response.json(
        {
          success: false,
          message: 'leetcode Username is already taken',
        },
        { status: 200 }
      );
    }

    return Response.json(
        {success:true, message:'leetcode username is unique'},
        {status:200}
    );

    
}catch(error){
    console.error('error in checking leetcode username ',error);
    return Response.json(
        {
        success: false,
        message: 'Error checking username',
      },
      { status: 500 }
    );
}
}
