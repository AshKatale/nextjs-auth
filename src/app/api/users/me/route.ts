import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request : NextRequest){
    try {
        const userId = await getDataFromToken(request);

    const user = await User.findOne({_id : userId}).select("-password");

    return NextResponse.json({
        data: user,
        message : "User Found"
    })
    } catch (error) {
        const errorMessage = (error as Error).message;
        return NextResponse.json({ error: errorMessage, status: 400 });
    }

}
