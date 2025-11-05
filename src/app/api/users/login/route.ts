import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { TLSSocket } from "tls";


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log('reqBody', reqBody)

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { error: 'User Does Not Exits' },
                { status: 400 }
            )
        }
        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            return NextResponse.json(
                { error: 'Invalid Password' },
                { status: 400 }
            )
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(payload, process.env.token_secret!, { expiresIn: "1h" })

        console.log('token', token)

        const response = NextResponse.json(
            {
                message: 'Logged in Successful',
                status: 200,
            },
        )

        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }

}