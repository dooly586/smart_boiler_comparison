'use client';

import React from 'react';
import { Boiler } from '../types';
import { PlusCircleIcon, CheckCircleIcon } from './IconComponents';

interface BoilerCardProps {
  boiler: Boiler;
  onSelect: (boiler: Boiler) => void;
  onToggleCompare: (boiler: Boiler) => void;
  isInCompare: boolean;
}

const BoilerCard: React.FC<BoilerCardProps> = ({ boiler, onSelect, onToggleCompare, isInCompare }) => {
  const { name, description, icon: Icon } = boiler;

  return (
    <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-1 transition-all duration-300 ${isInCompare ? 'border-2 border-blue-500' : ''}`}>
       <button 
          onClick={() => onToggleCompare(boiler)} 
          className="absolute top-2 right-2 z-10 text-gray-400 hover:text-blue-600 transition-colors"
          aria-label={isInCompare ? '비교함에서 제거' : '비교함에 추가'}
        >
          {isInCompare ? (
            <CheckCircleIcon className="w-8 h-8 text-blue-500 bg-white rounded-full" />
          ) : (
            <PlusCircleIcon className="w-8 h-8" />
          )}
        </button>
      <div className="p-6 flex-grow flex flex-col items-center text-center">
        <div className="bg-blue-100 p-4 rounded-full mb-4">
          <Icon className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{name}</h3>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
      </div>
      <button
        onClick={() => onSelect(boiler)}
        className="w-full bg-blue-500 text-white font-semibold py-3 hover:bg-blue-600 transition-colors duration-300"
      >
        자세히 보기
      </button>
    </div>
  );
};

export default BoilerCard;
