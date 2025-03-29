'use client';

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userScores, setUserScores] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }

    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/scores/leaderboard');
        setLeaderboard(res.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    const fetchUserScores = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/scores/user');
        setUserScores(res.data);
      } catch (error) {
        console.error('Error fetching user scores:', error);
      }
    };

    fetchLeaderboard();
    fetchUserScores();
  }, [user, router]);

  if (!user) {
    return null; 
  }

  return (
    <div className="text-center p-8 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        {user && (
          <div className="flex gap-4">
            <p className="text-lg">Welcome, {user.username}!</p>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Top 10 Scores</h2>
        <ul className="bg-white shadow-md rounded-lg p-4 mb-6">
          {leaderboard.map((score, index) => (
            <li key={score.id} className="py-2 border-b last:border-b-0">
              {index + 1}. {score.User.username}: {score.value}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Your Scores</h2>
        <ul className="bg-white shadow-md rounded-lg p-4 mb-6">
          {userScores.map((score) => (
            <li key={score.id} className="py-2 border-b last:border-b-0">
              Score: {score.value}
            </li>
          ))}
        </ul>

        <Link href="/game">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Back to Game
          </button>
        </Link>
      </div>
    </div>
  );
}