import Link from "next/link";
import { ModeToggle } from "./ModeToggle";


export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-6">
      <Link href="/" className="text-2xl md:text-3xl font-bold">Marshal <span className="text-blue-500">Blog</span></Link>
      
      <ModeToggle />
    </div>
  )
}

