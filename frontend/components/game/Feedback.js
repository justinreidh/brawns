export default function Feedback({ message }) {
    return (
      <div
        className={`my-4 text-lg ${
          message.includes('Correct') ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {message}
      </div>
    );
  }