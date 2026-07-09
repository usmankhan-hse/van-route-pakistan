import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectDb();
        return NextResponse.json({
            success: true,
            message: 'Mongodb Connected successfully.'
        },{status: 200})
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'mongodb connection failed.',
            error
        },{status:500})
        
    }

}