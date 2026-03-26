import { CloudSun } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
        <CloudSun className="text-white w-6 h-6" />
      </div>
      <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-500">
        MOOD
      </span>
    </div>
  );
}
