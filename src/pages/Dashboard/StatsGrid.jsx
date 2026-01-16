import React from "react";
import { ArrowRight } from "lucide-react";
const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Stats Title
            </p>
            <p className="text-xl font-bold text-gray-800 mb-4">Stats Value</p>
            <div className="flex items-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              <span>Stats Change</span>
              <span className="text-sm text-gray-500">vs Last</span>
            </div>
          </div>
        </div>
        {/* ProgressBar  */}
        <div className="mt-4 h-2 bg-gray-500 rounded-full overflow-hidden">
          <div className="w-full bg-gray-100 rounded-full transition-all duration-100"></div>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
