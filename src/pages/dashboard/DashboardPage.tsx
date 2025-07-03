import {
  CubeIcon,
  SparklesIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  BuildingStorefrontIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  return (
    <div className="p-8 bg-parchment min-h-[calc(100vh-80px)] text-deep-brown">
      <h1 className="text-4xl font-serif text-amber mb-8">대시보드</h1>
      <div className="bg-parchment-light p-6 rounded-xl shadow-md border border-deep-brown/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-amber/10 flex items-center">
            <CubeIcon className="h-10 w-10 text-amber mr-4" />
            <div>
              <h3 className="text-xl font-serif text-deep-brown mb-1">총 캐스크 수</h3>
              <p className="text-3xl font-bold text-amber">0개</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-amber/10 flex items-center">
            <SparklesIcon className="h-10 w-10 text-amber mr-4" />
            <div>
              <h3 className="text-xl font-serif text-deep-brown mb-1">총 스피릿 수</h3>
              <p className="text-3xl font-bold text-amber">0개</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-amber/10 flex items-center">
            <ArrowTrendingUpIcon className="h-10 w-10 text-amber mr-4" />
            <div>
              <h3 className="text-xl font-serif text-deep-brown mb-1">총 구매 가치</h3>
              <p className="text-3xl font-bold text-amber">£ 1,250,000</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-amber/10">
            <h3 className="text-2xl font-serif text-deep-brown mb-4 flex items-center">
              <CalendarDaysIcon className="h-7 w-7 text-amber mr-3" /> 최근 캐스크 이벤트
            </h3>
            <ul className="space-y-3 font-sans text-deep-brown/90">
              <li className="flex items-center">
                <span className="bg-deep-brown text-parchment-light text-xs px-2 py-1 rounded-md mr-3">
                  2025-07-02
                </span>
                <span className="font-bold">CASK:</span> 샘플링 완료
              </li>
              <li className="flex items-center">
                <span className="bg-deep-brown text-parchment-light text-xs px-2 py-1 rounded-md mr-3">
                  2025-06-28
                </span>
                <span className="font-bold">CASK-1005:</span>
              </li>
              <li className="flex items-center">
                <span className="bg-deep-brown text-parchment-light text-xs px-2 py-1 rounded-md mr-3">
                  2025-06-25
                </span>
                <span className="font-bold">CASK-1002:</span> 리게이징 완료
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-amber/10">
            <h3 className="text-2xl font-serif text-deep-brown mb-4 flex items-center">
              <BuildingStorefrontIcon className="h-7 w-7 text-amber mr-3" />
              캐스크 나무 종류별 분포
            </h3>
            <div className="w-full h-48 bg-parchment-light rounded-lg flex items-center justify-center text-deep-brown/60 border border-deep-brown/10">
              <p>차트가 여기에 표시됩니다 (예: 파이 차트)</p>
            </div>
            <ul className="mt-4 text-sm font-sans text-deep-brown/80">
              <li>- 아메리칸 오크: 40%</li>
              <li>- 셰리 캐스크: 30%</li>
              <li>- 버번 캐스크: 20%</li>
              <li>- 기타: 10%</li>
            </ul>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-amber/10">
            <h3 className="text-2xl font-serif text-deep-brown mb-4 flex items-center">
              <BeakerIcon className="h-7 w-7 text-amber mr-3" />
              평균 ABV 변화 추이
            </h3>
            <div className="w-full h-48 bg-parchment-light rounded-lg flex items-center justify-center text-deep-brown/60 border border-deep-brown/10">
              <p>차트가 여기에 표시됩니다 (예: 라인 차트)</p>
            </div>
            <p className="mt-4 text-sm font-sans text-deep-brown/80">
              시간 경과에 따른 캐스크 및 스피릿의 평균 알코올 도수 변화를 시각화합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
