import Link from 'next/link';
import GameCard from '@/components/gameCard';

export default function GamesPage() {
    return (
        <div className='p-4 flex flex-col items-center'>
            <GameCard href='game/digit' label='Digit Span Test'/>
        </div>
    )
}