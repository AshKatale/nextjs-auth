import { connect } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User Not Found");
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }
        await sendMail({ email, emailType: 'RESET', userId: user._id });
        console.log("Mail sent to user:", user);
        return NextResponse.json({ message: "User Found", success: true });

    } catch (error) {
        const errorMessage = (error as Error).message;
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
