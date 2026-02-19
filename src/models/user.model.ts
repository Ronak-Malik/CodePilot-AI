import mongoose, { Schema, Document, Model } from "mongoose";


export interface User extends Document {
  googleId: string;
  name: string;
  email: string;

   isProfileCompleted: boolean;

     leetcodeUsername?: string;   
  notifyMail?: string;

  createdAt: Date;
  updatedAt: Date;
}


const UserSchema: Schema<User> = new Schema(
  {
    googleId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    leetcodeUsername: {
      type: String,
      unique: true,
      sparse: true,
    },

    notifyMail: {
      type: String,
      unique : true,
     
    },


    isProfileCompleted:{
        type: Boolean,
       default: false,
    },
  },
  {
    timestamps: true,
  }
);


const UserModel: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
