// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link href="/" className="text-3xl font-bold">
          Brawn
        </Link>

        
        <div className="space-x-6 flex items-center">
          <Link href="/game" className="hover:text-gray-300 transition-colors">
            Games
          </Link>
          <Link
            href="/auth"
            className="hover:text-gray-300 transition-colors"
          >
            Login/Signup
          </Link>
          <Link
            href="/leaderboard"
            className="hover:text-gray-300 transition-colors"
          >
            Scores
          </Link>
        </div>
      </div>
    </nav>
  );
}