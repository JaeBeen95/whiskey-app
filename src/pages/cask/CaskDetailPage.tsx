import { useParams, Link } from "react-router-dom";

export default function CaskDetailPage() {
  const { caskId } = useParams();

  return (
    <div className="p-8 bg-parchment min-h-[calc(100vh-80px)] text-deep-brown">
      <h1 className="text-4xl font-serif text-amber mb-8">캐스크 상세 정보: {caskId}</h1>
      <div className="bg-parchment-light p-6 rounded-xl shadow-md border border-deep-brown/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-deep-brown">
          <div className="p-4 bg-white rounded-md shadow-sm border border-amber/10">
            <h3 className="font-bold text-lg mb-2">기본 정보</h3>
            <p>이름: 고씨네캐스크</p>
            <p>번호: 234523424A</p>
            <p>증류소: 시크릿 아일라 (쿨일라)</p>
            <p>창고: Warehouse A</p>
          </div>
          <div className="p-4 bg-white rounded-md shadow-sm border border-amber/10">
            <h3 className="font-bold text-lg mb-2">물리적 특성</h3>
            <p>ABV: 60%</p>
            <p>용량: 200L</p>
            <p>나무 종류: American Oak</p>
            <p>숙성: Sherry</p>
          </div>
          <div className="md:col-span-2 p-4 bg-white rounded-md shadow-sm border border-amber/10">
            <h3 className="font-bold text-lg mb-2">이벤트 이력</h3>
            <ul className="list-disc list-inside">
              <li>2025-07-02: 구매 (가격: 10000 GBP)</li>
              <li>2026-01-15: 샘플링 (ABV: 59%, 볼륨: 0.5L)</li>
              <li>2027-03-20: 리게이징 (새 캐스크 번호: 123B)</li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <Link
            to="/casks"
            className="inline-flex items-center text-amber hover:text-copper font-bold"
          >
            <span className="mr-1">&larr;</span> 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
