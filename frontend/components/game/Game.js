'use client';

import { useState, useEffect, useRef, useContext } from 'react';
import DigitDisplay from './DigitDisplay';
import InputForm from './InputForm';
import Feedback from './Feedback';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Game() {
  const [round, setRound] = useState(1);
  const [digits, setDigits] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showDigits, setShowDigits] = useState(false);
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRoundActive, setIsRoundActive] = useState(false);
  const inputRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  const generateDigits = (length) => {
    const newDigits = Array.from({ length }, () => Math.floor(Math.random() * 10));
    setDigits(newDigits);
    setCurrentDigitIndex(0);
    setShowDigits(true);
  };

  const startRound = () => {
    setIsRoundActive(true);
    setFeedback('');
    generateDigits(round);
  };

  useEffect(() => {
    if (isRoundActive && showDigits && digits.length > 0) {
      const interval = setInterval(() => {
        setCurrentDigitIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= digits.length) {
            setShowDigits(false);
            clearInterval(interval);
            return prevIndex;
          }
          return nextIndex;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRoundActive, showDigits, digits]);

  useEffect(() => {
    if (isRoundActive && !showDigits && !gameOver && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRoundActive, showDigits, gameOver]);

  const checkAnswer = async (input) => {
    const reversedDigits = [...digits].reverse().join('');
    if (input === reversedDigits) {
      setFeedback('Correct!');
      setRound(round + 1);
      setUserInput('');
      setIsRoundActive(false);
    } else {
      setFeedback('Wrong! Game Over.');
      setGameOver(true);
      setIsRoundActive(false);
      try {
        await axios.post('http://localhost:4000/api/scores', { value: round });
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
  };

  const handleSubmit = (input) => {
    setUserInput(input);
    checkAnswer(input);
  };

  const restartGame = () => {
    setRound(1);
    setFeedback('');
    setGameOver(false);
    setUserInput('');
    setIsRoundActive(false);
    setDigits([]);
  };

  if (!user) {
    return null; // Prevent rendering while redirecting
  }

  return (
    <div className="text-center p-8 min-h-screen bg-gray-100">
      
      <h1 className="text-3xl font-bold mb-4">Reverse Digit Span Test</h1>
       
      <p className="text-lg mb-4">Round: {round}</p>

      {!isRoundActive && !gameOver && (
        <div>
          <p className="text-lg mb-2">Get ready for Round {round}!</p>
          <button
            onClick={startRound}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Start Round
          </button>
        </div>
      )}

      {isRoundActive && (
        <div>
          {showDigits && (
            <p className="my-4 text-lg text-gray-600">Watch the digits!</p>
          )}
          <DigitDisplay
            digit={showDigits && currentDigitIndex < digits.length ? digits[currentDigitIndex] : null}
            show={showDigits}
            currentDigitIndex={currentDigitIndex}
            totalDigits={digits.length}
          />
        </div>
      )}

      {isRoundActive && !showDigits && !gameOver && (
        <InputForm onSubmit={handleSubmit} disabled={gameOver} inputRef={inputRef} />
      )}

      <Feedback message={feedback} />

      {gameOver && (
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={restartGame}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition w-40"
          >
            Restart Game
          </button>
          <Link href="/leaderboard">
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              View Leaderboard
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}