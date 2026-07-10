import type { Metadata } from "next";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Create an Account",
  description:
    "Create a VanRoute Pakistan account using your mobile number to send transport requests, receive driver offers, and manage bookings.",
  alternates: {
    canonical: "/register",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;