
import { Boiler, Installer } from './types';
import { BoltIcon, FireIcon, SunIcon, GlobeAltIcon, BeakerIcon } from './components/IconComponents';

export const KCL_REPORT_CONTENT = `
KCL 시험성적서 요약 보고서 (비교 대상: 히트펌프)

1. 시험 개요
본 시험은 이온히팅보일러와 공기열 히트펌프의 난방 성능을 동일 조건 하에서 비교 분석하여 에너지 효율 및 경제성을 평가하는 것을 목적으로 함.
- 시험 장소: KCL (한국건설생활환경시험연구원) 공인 시험소
- 시험 기간: 2023.10.15 ~ 2023.11.10
- 시험 조건: 외기온도 0°C, -5°C, -10°C, -15°C, 실내 설정온도 22°C, 난방면적 100m² 기준

2. 주요 성능 비교
가. 난방 속도 (초기 예열 시간)
- 이온히팅보일러: 15분 이내 설정 온도 도달. 이온 활성화를 통한 급속 가열 방식이 주효.
- 히트펌프: 45분 이상 소요. 외기 온도가 낮을수록 예열 시간이 급격히 증가.

나. 효율 (COP - Coefficient of Performance)
- 히트펌프: 외기온도 0°C 이상에서는 COP 3.0 이상으로 우수한 효율을 보임.
- 이온히팅보일러: 외기온도와 무관하게 COP 0.98 수준의 일정한 효율 유지 (전기->열 변환효율).
- 핵심 분석: 외기온도 -10°C 이하 혹한기 조건에서 히트펌프의 COP는 1.5 이하로 급감하며, 제상(defrost) 운전으로 인한 추가 전력 소모가 발생. 이 구간에서는 이온히팅보일러의 실제 난방 효율이 상대적으로 안정적임.

다. 소비 전력량 (24시간 가동 기준, 외기온도 -10°C)
- 이온히팅보일러: 48 kWh
- 히트펌프 (제상 운전 포함): 55 kWh
- 분석: 혹한기에는 히트펌프의 잦은 제상 운전과 효율 저하로 인해 이온히팅보일러보다 전력 소비량이 더 많아지는 역전 현상 발생.

라. 소음 및 진동
- 이온히팅보일러: 무소음, 무진동 (실내기 기준).
- 히트펌프: 실외기 가동 시 평균 50-60dB의 소음 및 진동 발생.

3. 결론
- 온화한 기후 조건에서는 히트펌프가 에너지 효율 면에서 우수하다.
- 동절기 평균 기온이 영하 10도 이하로 떨어지는 혹한기 환경에서는 이온히팅보일러가 더 안정적이고 빠른 난방을 제공하며, 실제 소비 전력량 측면에서 더 경제적일 수 있다.
- 이온히팅보일러는 소음, 진동, 유지보수 측면에서 강점을 가지므로, 사용 환경과 주된 난방 시점을 고려한 종합적인 판단이 필요하다.
`;

export const BOILERS_DATA: Boiler[] = [
  {
    id: 'electric',
    name: '전기보일러',
    description: '전기 에너지를 열로 변환하여 난방하는 방식. 설치가 간편하고 초기 비용이 저렴합니다.',
    icon: BoltIcon,
    initialCost: 'low',
    runningCost: 'high',
    efficiency: 'medium',
    environmental: 'medium',
    pros: ['저렴한 초기 비용', '간편한 설치', '무소음/무진동'],
    cons: ['높은 전기요금', '누진세 부담', '단독 사용 시 비효율적'],
  },
  {
    id: 'heat_pump',
    name: '히트펌프',
    description: '공기 중의 열을 흡수하여 압축, 난방에 사용하는 방식. 에너지 효율이 매우 높습니다.',
    icon: GlobeAltIcon,
    initialCost: 'high',
    runningCost: 'low',
    efficiency: 'high',
    environmental: 'high',
    pros: ['매우 높은 에너지 효율', '낮은 유지비', '냉난방 겸용 가능'],
    cons: ['높은 초기 비용', '혹한기 효율 저하', '실외기 설치 공간 필요'],
  },
  {
    id: 'ion_heating',
    name: '이온히팅보일러',
    description: '전기분해 원리를 이용, 이온 활성화를 통해 급속으로 물을 가열하는 차세대 방식입니다.',
    icon: BeakerIcon,
    initialCost: 'high',
    runningCost: 'medium',
    efficiency: 'high',
    environmental: 'high',
    pros: ['매우 빠른 난방 속도', '혹한기에도 일정한 효율', '무소음/무진동/무공해'],
    cons: ['높은 초기 비용', '상대적으로 새로운 기술', '전기 용량 확보 필요'],
    report: {
      title: 'KCL 히트펌프 비교 성능 시험성적서',
      url: '#', // Placeholder URL
      content: KCL_REPORT_CONTENT,
    },
  },
  {
    id: 'gas',
    name: '가스보일러',
    description: '도시가스(LNG)를 연소시켜 난방하는 가장 보편적인 방식. 유지비가 저렴합니다.',
    icon: FireIcon,
    initialCost: 'medium',
    runningCost: 'low',
    efficiency: 'high',
    environmental: 'medium',
    pros: ['저렴한 연료비', '높은 열효율', '온수 사용 편리'],
    cons: ['도시가스 배관 필요', '일산화탄소 중독 위험', '정기적인 점검 필요'],
  },
  {
    id: 'oil',
    name: '기름보일러',
    description: '등유를 연소시켜 난방하는 방식. 도시가스가 공급되지 않는 지역에서 주로 사용됩니다.',
    icon: SunIcon,
    initialCost: 'medium',
    runningCost: 'high',
    efficiency: 'medium',
    environmental: 'low',
    pros: ['어디서나 설치 가능', '높은 발열량'],
    cons: ['비싼 연료비', '유가 변동에 민감', '정기적인 연료 보충 필요', '소음 및 냄새 발생'],
  },
];

export const MOCK_INSTALLERS: Installer[] = [
    { id: 1, name: '희망에너지', address: '서울시 강남구 테헤란로 123', phone: '02-1234-5678', lat: 37.5068, lng: 127.0535 },
    { id: 2, name: '미래보일러', address: '서울시 마포구 월드컵북로 456', phone: '02-2345-6789', lat: 37.5665, lng: 126.9780 },
    { id: 3, name: '강원ENG', address: '강원도 춘천시 중앙로 1', phone: '033-111-2222', lat: 37.8813, lng: 127.7298 },
    { id: 4, name: '부산보일러총판', address: '부산시 해운대구 우동 789', phone: '051-777-8888', lat: 35.1630, lng: 129.1638 },
    { id: 5, name: '제주난방시스템', address: '제주시 연동 1004', phone: '064-987-6543', lat: 33.4996, lng: 126.5312 },
];
