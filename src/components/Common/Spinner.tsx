export function Spinner() {
  return (
    <div className="flex items-center justify-center space-x-2 animate-pulse h-full">
      <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
      <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
      <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
    </div>
  );
}
