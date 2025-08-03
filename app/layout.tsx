import './globals.css'
import Navigation from './components/Navigation'

export const metadata = {
  title: 'Research Portfolio - นายจักรพันธุ์ ฤทธิแผลง',
  description: 'งานวิจัยและโครงงานของนักศึกษา',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}