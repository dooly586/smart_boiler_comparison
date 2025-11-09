
import React from 'react';
import { ChartBarIcon } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ChartBarIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">보일러 비교</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#comparison" className="text-gray-600 hover:text-blue-600 transition">제품 비교</a>
          <a href="#consultation" className="text-gray-600 hover:text-blue-600 transition">전문가 상담</a>
          <a href="#installers" className="text-gray-600 hover:text-blue-600 transition">업체 찾기</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
