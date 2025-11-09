
import { useState, useCallback } from 'react';
import { GeolocationState } from '../types';

const useGeolocation = (): [GeolocationState, () => void] => {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    coordinates: null,
    error: null,
  });

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({
        loading: false,
        coordinates: null,
        error: {
            code: 0,
            message: "이 브라우저에서는 위치 정보가 지원되지 않습니다.",
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3
        },
      });
      return;
    }

    setState({ loading: true, coordinates: null, error: null });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
        });
      },
      (error) => {
        setState({
          loading: false,
          coordinates: null,
          error: error,
        });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  return [state, getLocation];
};

export default useGeolocation;
