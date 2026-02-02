'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
    LayoutDashboard,
    BookOpen,
    Layers,
    Users,
    LogOut,
    Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logout } from '@/src/utils/logout'

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const linkClass = (path: string) =>
        `cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
     ${pathname === path
            ? 'bg-orange-100 text-orange-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`

    return (
        <aside className="w-64 bg-white border-r flex flex-col">
            <div className="p-6 text-xl font-bold text-orange-500">
                CookSnap Admin
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <Link href="/dashboard">
                    <button className={linkClass('/dashboard')}>
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>
                </Link>

                <Link href="/allRecipes">
                    <button className={linkClass('/allRecipes')}>
                        <BookOpen size={18} />
                        Recipes
                    </button>
                </Link>

                <Link href="/categories">
                    <button className={linkClass('/categories')}>
                        <Layers size={18} />
                        Categories
                    </button>
                </Link>

                <Link href="/countries">
                    <button className={linkClass('/countries')}>
                        <Globe size={18} />
                        Countries
                    </button>
                </Link>

                <Link href="/users">
                    <button className={linkClass('/users')}>
                        <Users size={18} />
                        Users
                    </button>
                </Link>
            </nav>

            <div className="p-4 border-t">
                <Button
                    variant="destructive"
                    className="w-full gap-2 cursor-pointer active:scale-[100%] transition hover:scale-[105%]"
                    onClick={() => logout(router)}
                >
                    <LogOut size={16} />
                    Logout
                </Button>
            </div>
        </aside>
    )
}
