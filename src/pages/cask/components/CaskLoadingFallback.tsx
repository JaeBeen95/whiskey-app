function CaskCardSkeleton() {
  return (
    <div
      className="
    bg-deep-navy-900/50 p-6 rounded-lg shadow-md border border-gold-500/20
    animate-pulse flex flex-col justify-between h-48
  "
    >
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-1"></div>
      <div className="h-4 bg-gray-700 rounded w-2/3 mb-1"></div>
      <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="h-10 bg-gold-600 rounded-lg w-1/3 self-start"></div>
    </div>
  );
}

export default function CaskLoadingFallback() {
  return (
    <div
      className="
      bg-deep-navy-900 min-h-screen p-8
      flex flex-col items-center justify-start
    "
    >
      <div className="w-full max-w-4xl mb-8 bg-deep-navy-800 p-6 rounded-xl shadow-lg border border-gold-500/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-10 bg-gray-700 rounded-lg"></div>
          <div className="h-10 bg-gray-700 rounded-lg"></div>
          <div className="h-10 bg-gray-700 rounded-lg"></div>
        </div>
      </div>

      <div
        className="
        bg-deep-navy-800 p-6 rounded-xl shadow-lg border border-gold-500/20 mt-8 w-full max-w-6xl
      "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <CaskCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
