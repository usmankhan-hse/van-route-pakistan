import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDb from "./lib/connectDb";
import User from "./models/User";
import bcrypt from "bcryptjs";
import { UserRole } from "@/constants/roles";

export const {handlers, auth, signIn, signOut} = NextAuth({
    session : {
        strategy: 'jwt',
    },
    pages : {
        signIn : '/login',
    },
    providers : [
        Credentials({
            credentials : {
                phone : {
                    label: "Phone Number",
                    type : "tel",
                    placeholder : "03XXXXXXXXX"
                },
                password : {
                    label : 'Password',
                    type : 'password'
                }
            },
            async authorize(credentials){
                if (typeof credentials?.phone !== 'string' || typeof credentials?.password !== 'string') {
                    return null;                    
                }
                const phone = credentials.phone.trim();
                const password = credentials.password;
                if (!phone || !password) {
                    return null;                    
                }
                await connectDb();
                const user = await User.findOne({phone});
                if (!user) {
                    return null;                    
                }
                const passwordMatches = await bcrypt.compare(password, user.password);
                if (!passwordMatches) {
                    return null;                    
                }
                return {
                    id: user._id.toString(),
                    name : user.name,
                    email: user.email || null,
                    image : user.photo || null,
                    phone : user.phone,
                    roles : Array.from(user.roles),
                }


            }
        })
    ],
    callbacks : {
        async jwt({token, user}){
            if (user) {
                token.id = user.id;
                token.phone = user.phone;
                token.roles = user.roles;                
            }
            return token;
        },
        async session({session, token}){
            if (session.user) {
             session.user.id = token.id as string;
                session.user.phone = token.phone as string;
                session.user.roles = token.roles as UserRole[]; 
                
            }
            return session;
        }
    }
})








// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import connectDb from "./lib/connectDb";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import { UserRole } from "./constants/roles";

// export const {handlers, auth, signIn,signOut} = NextAuth({
//     session : {
//         strategy : "jwt"
//     },
//     pages:{
//         signIn: "/login"
//     },
//     providers: [
//         Credentials({
//             credentials: {
//                 phone: {
//                     label: "Phone Number",
//                     type : "tel",
//                     placeholder : "03XXXXXXXXX"
//                 },
//                 password: {
//                     label : "Password",
//                     type : "password"
//                 }
//             },
//             async authorize(credentials){
//                 if (typeof credentials?.phone !== "string" || typeof credentials?.password!=="string") {
//                     return null;                    
//                 }
//                 const phone = credentials.phone.trim();
//                 const password = credentials.password;
//                 if (!phone || !password) {
//                     return null;
//                 }
//                 await connectDb();
//                 const user = await User.findOne({phone}).select("+password")
//                 if (!user) {
//                     return null;                    
//                 }
//                 const passwordMatches = await bcrypt.compare(password, user.password);
//                 if (!passwordMatches) {
//                     return null;                    
//                 }
//                 return{
//                     id: user._id.toString(),
//                     name: user.name,
//                     email: user.email || null,
//                     image: user.photo || null,
//                     phone: user.phone,
//                     roles: user.roles,
//                 };       
//             }
//         })
//     ],
//     callbacks:{
//         async jwt({token, user}){
//             if (user) {
//                 token.id = user.id;
//                 token.phone = user.phone;
//                 token.roles = user.roles;
                
//             }
//             return token;
//         },
//         async session({session, token}){
//             if (session.user) {
//                 session.user.id = token.id as string;
//                 session.user.phone = token.phone as string;
//                 session.user.roles = token.roles as UserRole[];
                
//             }
//             return session;

//         }
//     }
// })