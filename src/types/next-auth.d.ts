import { UserRole } from "@/constants/roles";
import { DefaultSession } from "next-auth";

declare module "next-auth"{
    interface User{
        id: string;
        phone: string;
        roles: UserRole[];
    }
    interface Session {
        user: {
            id: string;
            phone : string;
            roles : UserRole[];
        }& DefaultSession["user"];
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        id : string;
        phone : string;
        roles : UserRole[];
    }
}
export {};