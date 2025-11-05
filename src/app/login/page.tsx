'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify';

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)


    const onLogin = async () => {
        try {
            setLoading(true)
            const res = await axios.post("/api/users/login", user)
            console.log("Sign Up Successfull", res.data)
            toast.success("Login Successfull")
            router.push("/profile")
        } catch (error: any) {
            console.log("Sign Up Failed", error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-black'>
            <div className='w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800'>
                <h1 className='text-3xl font-bold text-center text-white'>{loading ? "Processing Login..." : "Login Here"}</h1>

                <hr className='border-gray-700' />

                <div className='space-y-4'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder='Enter Email'
                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 text-white placeholder-gray-400'
                        />
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-300 mb-2'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder='Enter Password'
                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 text-white placeholder-gray-400'
                        />
                    </div>
                </div>

                <button
                    onClick={onLogin}
                    className='w-35 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 '>
                    Login Here
                </button>

                <div className='text-center'>
                    <p className='text-gray-400'>
                        Don't have an account?{' '}
                        <Link href='/signup' className='text-blue-400 hover:text-blue-300 font-medium'>
                            Sign Up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage