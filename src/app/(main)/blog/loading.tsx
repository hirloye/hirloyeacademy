export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="mb-12 text-center flex flex-col items-center">
        <div className="h-12 bg-gray-200 rounded-lg w-48 mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded-lg w-full max-w-lg animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
            <div className="h-48 w-full bg-gray-200 animate-pulse"></div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="h-6 w-24 bg-gray-200 rounded-full mb-3 animate-pulse"></div>
              <div className="h-7 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-7 w-2/3 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-20 w-full bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
