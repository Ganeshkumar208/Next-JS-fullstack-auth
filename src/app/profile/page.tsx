"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ProfilePage = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const onLogout = async () => {
        try {
            setLoading(true)
            const res = await axios.get('/api/users/logout')
            console.log("Logout Successfull", res.data)
            toast.success('Logout Success')
            router.push('/login')
        } catch (error: any) {
            console.log("Logout Unsuccessfull")
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                        User Profile
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your account settings</p>
                </div>

                {/* Profile Card */}
                <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-700">
                    <div className="flex items-center space-x-6 mb-8">
                        {/* Profile Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">U</span>
                            </div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold text-white">John Doe</h2>
                            <p className="text-gray-400">john.doe@example.com</p>
                            <p className="text-cyan-400 text-sm mt-1">Premium Member</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
                            <p className="text-2xl font-bold text-cyan-400">12</p>
                            <p className="text-gray-400 text-sm">Projects</p>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
                            <p className="text-2xl font-bold text-purple-400">47</p>
                            <p className="text-gray-400 text-sm">Tasks</p>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
                            <p className="text-2xl font-bold text-green-400">89%</p>
                            <p className="text-gray-400 text-sm">Completion</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-700 my-8" />

                    {/* Quick Actions */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 border border-gray-600">
                                Edit Profile
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 border border-gray-600">
                                Security Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Logout Section */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div>
                            <h3 className="text-lg font-semibold text-white">Session Management</h3>
                            <p className="text-gray-400 text-sm">Secure logout from your account</p>
                        </div>
                        <button
                            onClick={onLogout}
                            disabled={loading}
                            className={`
                                relative overflow-hidden
                                bg-gradient-to-r from-red-600 to-pink-600 
                                hover:from-red-700 hover:to-pink-700
                                text-white font-semibold py-3 px-8 rounded-lg
                                transition-all duration-300 transform hover:scale-105
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                border border-red-500
                                shadow-lg hover:shadow-red-500/25
                                min-w-[120px]
                            `}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Logging out...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-500 text-sm">
                    <p>Last login: Today at 14:30</p>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage