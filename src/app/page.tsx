'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  const handleContinue = () => {
    const access = localStorage.getItem('access')

    if (access) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-12"
      >
        <Image
          src="/favicon.ico.png"
          alt="Cook Snap Admin"
          width={160}
          height={160}
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 text-center px-4"
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Добро пожаловать в Admin Panel
        </h1>

        <p className="text-gray-500 text-lg mb-6">
          Cook Snap
        </p>

        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Управляйте рецептами, категориями и пользователями,
          контролируйте контент и обеспечивайте стабильную работу сервиса.
        </p>

        <motion.button
          onClick={handleContinue}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-md transition"
        >
          Продолжить
        </motion.button>
      </motion.div>

    </main>
  )
}
