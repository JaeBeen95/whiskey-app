import { ArrowRightIcon } from '@heroicons/react/24/solid';

function App() {
  return (
    <div className="min-h-screen bg-cream-50 text-deep-brown-900 flex flex-col items-center justify-center p-4 font-sans">
      <h1 className="text-5xl font-serif text-amber-700 mb-8 drop-shadow-lg">
        Welcome to Whiskey Cask Manager!
      </h1>
      <p className="text-lg text-deep-brown-700">
        Start managing your precious liquid assets.
      </p>
      <button className="mt-6 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 flex items-center space-x-2">
        <span>Get Started</span>
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  )
}

export default App