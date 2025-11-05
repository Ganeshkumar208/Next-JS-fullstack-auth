import connect from "@/dbConfig/dbConfig"
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, password, email } = reqBody
        console.log('reqBody', reqBody)

        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                { error: 'User already Exits' },
                { status: 400 }
            )
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log('saved zuser', savedUser)
        return NextResponse.json(
            {
                message: "User created Successfully",
                success: 200,
                savedUser
            }
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}