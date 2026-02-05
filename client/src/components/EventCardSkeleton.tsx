export default function EventCardSkeleton() {
  return (
    <div className="w-full min-w-0 bg-white rounded-xl shadow-card overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200 animate-shimmer" />
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-shimmer" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3 animate-shimmer" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-shimmer" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-shimmer" />
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-shimmer" />
      </div>
    </div>
  )
}
