'use client';

import React, { useState } from 'react';
import { Boiler } from '../types';
import { XMarkIcon, CheckCircleIcon, XCircleIcon, SparklesIcon } from './IconComponents';

interface BoilerDetailModalProps {
  boiler: Boiler;
  onClose: () => void;
}

const Rating: React.FC<{ label: string; value: 'low' | 'medium' | 'high' }> = ({ label, value }) => {
  const ratings = {
    low: { text: '낮음', color: 'bg-red-500' },
    medium: { text: '보통', color: 'bg-yellow-500' },
    high: { text: '높음', color: 'bg-green-500' },
  };
  const valueMap = {
    low: '높음',
    medium: '보통',
    high: '낮음'
  };

  // Invert rating for cost, higher cost is bad (low rating)
  const isCost = label.includes('비');
  const displayValue = isCost ? value : (value === 'low' ? 'high' : value === 'high' ? 'low' : 'medium');
  
  return (
    <div className="flex justify-between items-center mb-2">
      <span className="text-gray-600">{label}</span>
      <div className="flex items-center">
        <span className={`text-sm font-semibold mr-2 ${ratings[displayValue].color.replace('bg-', 'text-')}`}>{ratings[displayValue].text}</span>
        <div className="w-24 h-2 bg-gray-200 rounded-full">
          <div
            className={`h-2 rounded-full ${ratings[displayValue].color}`}
            style={{ width: displayValue === 'low' ? '33%' : displayValue === 'medium' ? '66%' : '100%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const BoilerDetailModal: React.FC<BoilerDetailModalProps> = ({ boiler, onClose }) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!boiler.report) return;
    setIsLoading(true);
    setSummary('');
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: boiler.report.content }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("AI 요약 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <boiler.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{boiler.name}</h2>
                <p className="text-gray-600">{boiler.description}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="w-8 h-8" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">성능 요약</h3>
              <Rating label="초기 설치비" value={boiler.initialCost} />
              <Rating label="월 유지비" value={boiler.runningCost} />
              <Rating label="에너지 효율" value={boiler.efficiency} />
              <Rating label="친환경성" value={boiler.environmental} />
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">장단점</h3>
                <div className="space-y-3">
                    <div>
                        <h4 className="font-semibold text-green-600 mb-1">장점</h4>
                        <ul className="list-inside space-y-1">
                        {boiler.pros.map((pro, i) => (
                            <li key={i} className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{pro}</span></li>
                        ))}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-red-600 mb-1">단점</h4>
                        <ul className="list-inside space-y-1">
                        {boiler.cons.map((con, i) => (
                            <li key={i} className="flex items-start"><XCircleIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{con}</span></li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
          </div>
          
          {boiler.report && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{boiler.report.title}</h3>
              <div className="flex space-x-4 mb-4">
                  <a href={boiler.report.url} target="_blank" rel="noopener noreferrer" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition">
                    원본 인증서 보기
                  </a>
                  <button onClick={handleSummarize} disabled={isLoading} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:bg-blue-300">
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {isLoading ? '요약 중...' : 'AI 보고서 요약'}
                  </button>
              </div>

              {isLoading && <div className="text-center p-4">AI가 보고서를 분석하고 있습니다. 잠시만 기다려주세요...</div>}
              
              {summary && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-lg font-bold text-blue-800 mb-2">AI 요약</h4>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{summary}</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BoilerDetailModal;
