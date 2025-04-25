'use client';

import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function Navbar() {
  const context = useContext(AuthContext);
  const user = context ? context.user : null;
  const logout = context ? context.logout : () => {};

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
          <Link href="/leaderboard" className="hover:text-gray-300 transition-colors">
            Scores
          </Link>
          {user ? (
            <div className="flex gap-4 items-center">
              <p className="text-lg">Welcome, {user.username}!</p>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth" className="hover:text-gray-300 transition-colors">
              Login/Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}