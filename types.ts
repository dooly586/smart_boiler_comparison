// FIX: Import React to use React types like React.FC
import React from 'react';

export interface Boiler {
  id: string;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  initialCost: 'low' | 'medium' | 'high';
  runningCost: 'low' | 'medium' | 'high';
  efficiency: 'low' | 'medium' | 'high';
  environmental: 'low' | 'medium' | 'high';
  pros: string[];
  cons: string[];
  report?: {
    title: string;
    url: string;
    content: string;
  };
}

export interface Installer {
  id: number;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
}

export interface GeolocationState {
  loading: boolean;
  coordinates: { lat: number; lon: number } | null;
  error: GeolocationPositionError | null;
}