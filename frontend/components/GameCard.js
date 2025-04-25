import Link from 'next/link';

export default function GameCard({ href, label }) {
  return (
    <Link href={href}>
      <div className="inline-block px-4 py-2  bg-white rounded-lg hover:bg-gray-200 transition-colors duration-200">
        {label}
      </div>
    </Link>
  );
}
