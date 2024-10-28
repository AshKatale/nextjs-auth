import { NextResponse } from "next/server";


export async function GET()
{
    try {
        const response = NextResponse.json({
            message : "Logout Successfully",
            status : true
        })

        response.cookies.set("token","",{httpOnly:true, expires:new Date(0)});
        return response;
    } catch (error) {
        const errorMessage = (error as Error).message;
        return NextResponse.json({ message: errorMessage, status: 500 });
    }
}
