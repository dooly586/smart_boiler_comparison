'use client';

import React, { useState } from 'react';
import { Boiler } from '../types';
import { BOILERS_DATA } from '../constants';
import Header from '../components/Header';
import BoilerCard from '../components/BoilerCard';
import BoilerDetailModal from '../components/BoilerDetailModal';
import ConsultationForm from '../components/ConsultationForm';
import InstallerFinder from '../components/InstallerFinder';
import { XCircleIcon, ArrowsRightLeftIcon } from '../components/IconComponents';

const Home: React.FC = () => {
  const [selectedBoiler, setSelectedBoiler] = useState<Boiler | null>(null);
  const [comparisonList, setComparisonList] = useState<Boiler[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleSelectBoiler = (boiler: Boiler) => {
    setSelectedBoiler(boiler);
  };

  const handleCloseModal = () => {
    setSelectedBoiler(null);
  };

  const handleToggleCompare = (boiler: Boiler) => {
    setComparisonList((prevList) => {
      const isInList = prevList.some((item) => item.id === boiler.id);
      if (isInList) {
        return prevList.filter((item) => item.id !== boiler.id);
      } else {
        if (prevList.length >= 3) {
          alert('최대 3개의 보일러만 비교할 수 있습니다.');
          return prevList;
        }
        return [...prevList, boiler];
      }
    });
  };
  
  const handleClearCompare = () => {
    setComparisonList([]);
  }

  const ComparisonModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={() => setShowComparison(false)}>
      <div className="bg-white rounded-lg shadow-2xl w-11/12 max-w-6xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">보일러 성능 비교</h2>
        </div>
        <div className="overflow-x-auto overflow-y-auto">
          <table className="w-full text-left table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 w-1/6 font-semibold">항목</th>
                {comparisonList.map(boiler => (
                  <th key={boiler.id} className="p-4 font-semibold text-center">
                    <div className="flex flex-col items-center gap-2">
                       <boiler.icon className="w-8 h-8 text-blue-600" />
                       <span>{boiler.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { label: '초기 설치비', key: 'initialCost' },
                { label: '월 유지비', key: 'runningCost' },
                { label: '에너지 효율', key: 'efficiency' },
                { label: '친환경성', key: 'environmental' },
              ].map(row => (
                 <tr key={row.key}>
                    <td className="p-4 font-medium text-gray-700">{row.label}</td>
                    {comparisonList.map(boiler => (
                      <td key={boiler.id} className="p-4 text-center">
                        <span className={`px-3 py-1 text-sm rounded-full font-semibold ${
                            boiler[row.key as keyof Boiler] === 'low' ? 'bg-red-100 text-red-800' :
                            boiler[row.key as keyof Boiler] === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                          {boiler[row.key as keyof Boiler] === 'low' ? '높음' : boiler[row.key as keyof Boiler] === 'medium' ? '보통' : '낮음'}
                        </span>
                      </td>
                    ))}
                 </tr>
              ))}
              <tr>
                <td className="p-4 font-medium text-gray-700 align-top">장점</td>
                {comparisonList.map(boiler => (
                  <td key={boiler.id} className="p-4 align-top">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {boiler.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-700 align-top">단점</td>
                {comparisonList.map(boiler => (
                  <td key={boiler.id} className="p-4 align-top">
                     <ul className="list-disc list-inside space-y-1 text-sm">
                      {boiler.cons.map((con, i) => <li key={i}>{con}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 border-t text-right">
            <button onClick={() => setShowComparison(false)} className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-700 transition">
              닫기
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section id="comparison" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">보일러 종류별 비교</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            다양한 보일러의 특징을 비교하여 우리 집에 가장 적합한 보일러를 선택하세요.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {BOILERS_DATA.map((boiler) => (
              <BoilerCard 
                key={boiler.id} 
                boiler={boiler} 
                onSelect={handleSelectBoiler}
                onToggleCompare={handleToggleCompare}
                isInCompare={comparisonList.some(item => item.id === boiler.id)}
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <section id="consultation">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">전문가 상담 요청</h2>
            <p className="text-gray-600 mb-6">
              사진과 궁금한 점을 남겨주시면 전문 상담사가 자세한 정보를 제공해 드립니다.
            </p>
            <ConsultationForm />
          </section>

          <section id="installers">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">가까운 설치업체 찾기</h2>
            <p className="text-gray-600 mb-6">
              버튼을 클릭하여 현재 위치를 기반으로 가까운 전문 설치업체를 찾아보세요.
            </p>
            <InstallerFinder />
          </section>
        </div>
      </main>

      {selectedBoiler && (
        <BoilerDetailModal boiler={selectedBoiler} onClose={handleCloseModal} />
      )}

      {comparisonList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] p-4 z-40 transform transition-transform duration-300 animate-slide-up">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-lg text-gray-800">비교할 보일러:</h3>
              <div className="flex items-center gap-3">
                {comparisonList.map(boiler => (
                  <span key={boiler.id} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{boiler.name}</span>
                ))}
              </div>
              <span className="text-gray-600 font-semibold">{comparisonList.length} / 3</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleClearCompare} className="text-gray-500 hover:text-gray-800">
                <XCircleIcon className="w-7 h-7" />
              </button>
              <button onClick={() => setShowComparison(true)} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition flex items-center gap-2">
                <ArrowsRightLeftIcon className="w-5 h-5" />
                비교하기
              </button>
            </div>
          </div>
        </div>
      )}

      {showComparison && <ComparisonModal />}
    </>
  );
};

export default Home;
