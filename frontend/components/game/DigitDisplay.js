export default function DigitDisplay({ digit, show, currentDigitIndex, totalDigits }) {
    return (
      <div className="my-4">
        <div className="text-4xl mb-4">
          {show && digit !== null ? (
            digit
          ) : (
            !show && (
              <p className="text-lg text-gray-500">
                Enter the digits in reverse order.
              </p>
            )
          )}
        </div>
        {show && totalDigits > 0 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalDigits }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentDigitIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }