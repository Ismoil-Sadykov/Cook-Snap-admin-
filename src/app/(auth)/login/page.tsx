'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/src/services/auth'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

export default function Page() {
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!username || !password) {
            toast.error('Введите username и пароль')
            return
        }

        try {
            setLoading(true)
            const data = await login({ username, password })

            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)

            toast.success('Успешный вход')
            router.push('/dashboard')
        } catch (error: any) {
            toast.error(
                error.response?.data?.detail || 'Неверный логин или пароль'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8"
            >
                <h1 className="text-2xl font-semibold text-center mb-2">
                    Admin Panel
                </h1>
                <p className="text-gray-500 text-center mb-8">Cook Snap</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm mb-1">Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400"
                            placeholder="Введите username"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm mb-1">Password</label>

                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-md px-4 py-2 pr-12 focus:ring-2 focus:ring-orange-400"
                            placeholder="Введите пароль"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={loading}
                        className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-md"
                    >
                        {loading ? 'Вход...' : 'Войти'}
                    </motion.button>
                </form>
            </motion.div>
        </main>
    )
}
