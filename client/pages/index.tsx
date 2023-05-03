import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="app">
      <h1 className="main_header">Application</h1>
    </div>
  )
}
