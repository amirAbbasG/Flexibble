import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";


export async function GET(req: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET

    const token = await getToken({req, secret, raw: true})

    return NextResponse.json({token}, {status: 200})
}