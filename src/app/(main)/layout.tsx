import ReduxProvider from '@/src/components/ReduxProvider'
import Sidebar from '@/src/components/SideBar'

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ReduxProvider>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    {children}
                </div>
            </div>
        </ReduxProvider>
    )
}
