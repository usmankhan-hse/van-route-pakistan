import connectDb from "@/lib/connectDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Read registration data from the request body.
    const { name, email, password, phone } = await req.json();

    // Name, phone, and password are required.
    if (!name || !phone || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    // Remove extra spaces.
    const normalizedName = name.trim();
    const normalizedPhone = phone.trim();

    // Email is optional.
    // Empty string becomes undefined, so MongoDB does not store the field.
    const normalizedEmail = email?.trim().toLowerCase() || undefined;

    await connectDb();

    // Phone must be unique.
    const phoneExists = await User.exists({
      phone: normalizedPhone,
    });

    if (phoneExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is already registered.",
        },
        { status: 409 }
      );
    }

    // Check email only when the user provided one.
    if (normalizedEmail) {
      const emailExists = await User.exists({
        email: normalizedEmail,
      });

      if (emailExists) {
        return NextResponse.json(
          {
            success: false,
            message: "Email is already registered.",
          },
          { status: 409 }
        );
      }
    }

    // Never store the plain-text password.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new account.
    await User.create({
      name: normalizedName,
      phone: normalizedPhone,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    // Log the real error only on the server.
    console.error("Register API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
};