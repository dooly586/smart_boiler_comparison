'use client';

import React, { useMemo } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import { MOCK_INSTALLERS } from '../constants';
import { Installer } from '../types';
import { MapPinIcon, PhoneIcon } from './IconComponents';

const haversineDistance = (
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const InstallerFinder: React.FC = () => {
  const [geolocation, getLocation] = useGeolocation();
  const { loading, coordinates, error } = geolocation;

  const sortedInstallers = useMemo(() => {
    if (!coordinates) {
      return MOCK_INSTALLERS;
    }
    return [...MOCK_INSTALLERS]
      .map(installer => ({
        ...installer,
        distance: haversineDistance(coordinates.lat, coordinates.lon, installer.lat, installer.lng)
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [coordinates]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <button
        onClick={getLocation}
        disabled={loading}
        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-green-400 transition-colors flex items-center justify-center"
      >
        <MapPinIcon className="w-5 h-5 mr-2" />
        {loading ? '위치 찾는 중...' : '내 주변 설치업체 찾기'}
      </button>

      {error && <p className="mt-4 text-center text-red-600">오류: {error.message}</p>}
      
      <div className="mt-6 space-y-4">
        {(coordinates ? sortedInstallers : MOCK_INSTALLERS.slice(0, 3)).map((installer: Installer & { distance?: number }) => (
          <div key={installer.id} className="p-4 border rounded-md">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg text-gray-800">{installer.name}</h4>
                {installer.distance !== undefined && (
                    <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                        약 {installer.distance.toFixed(1)} km
                    </span>
                )}
            </div>
            <p className="text-gray-600 text-sm flex items-center mt-1"><MapPinIcon className="w-4 h-4 mr-2 text-gray-400"/>{installer.address}</p>
            <p className="text-gray-600 text-sm flex items-center mt-1"><PhoneIcon className="w-4 h-4 mr-2 text-gray-400"/>{installer.phone}</p>
          </div>
        ))}
        {!coordinates && <p className="text-center text-sm text-gray-500 mt-4">위치 정보를 제공하면 더 정확한 업체 목록을 볼 수 있습니다.</p>}
      </div>
    </div>
  );
};

export default InstallerFinder;
