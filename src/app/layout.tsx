import { Navigation } from '@/components'
import '@/styles/globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const RootLayout =({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="ja">
            <body>
        <div className="flex flex-col min-h-screen bg-[#7494C0]">
          <Navigation />

          <main className="flex-1 container max-w-screen-md mx-auto px-2 py-5 relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}


export default RootLayout