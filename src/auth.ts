import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDb from "./lib/connectDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const {handlers, auth, signIn,signOut} = NextAuth({
    session : {
        strategy : "jwt"
    },
    pages:{
        signIn: "/login"
    },
    providers: [
        Credentials({
            credentials: {
                phone: {
                    label: "Phone Number",
                    type : "tel",
                    placeholder : "03XXXXXXXXX"
                },
                password: {
                    label : "Password",
                    type : "password"
                }
            },
            async authorize(credentials){
                if (typeof credentials?.phone !== "string" || typeof credentials?.password!=="string") {
                    return null;                    
                }
                const phone = credentials.phone.trim();
                const password = credentials.password;
                if (!phone || !password) {
                    return null;
                }
                await connectDb();
                const user = await User.findOne({phone}).select("+password")
                if (!user) {
                    return null;                    
                }
                const passwordMatches = await bcrypt.compare(password, user.password);
                if (!passwordMatches) {
                    return null;                    
                }
                return{
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email || null,
                    image: user.photo || null
                };             

            }
        })
    ]
})