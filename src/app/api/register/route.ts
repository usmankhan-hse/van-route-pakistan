import connectDb from "@/lib/connectDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) =>{
    try {
        const {name, email, password, phone} = await req.json();
    if (!name || !email || !password) {
    return NextResponse.json(
        {
            success: false,
            message: "Please fill all required fields.",
        },
        {
            status: 400,
        }
    );
}
    // check if the user already exists
    await connectDb();
    const userExists = await User.exists({email});
    if (userExists) {
        return NextResponse.json({
            success: false,
            message: "User already exists. Go to Login."
        },{status: 409})        
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //  add to mongodb
    const newUser = await User.create({name, email, password:hashedPassword, phone});
    return NextResponse.json({
        success : true,
        message: 'User Registered Successfull.'
    },{status : 201})        
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            
        }, {status: 500})        
    }

}