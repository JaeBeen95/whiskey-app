import { useParams, Link } from "react-router-dom";

export default function SpiritDetailPage() {
  const { spiritId } = useParams();
  return (
    <div className="p-8 bg-parchment min-h-[calc(100vh-80px)] text-deep-brown">
      <h1 className="text-4xl font-serif text-amber mb-8">스피릿 상세 정보: {spiritId}</h1>
      <div className="bg-parchment-light p-6 rounded-xl shadow-md border border-deep-brown/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-deep-brown">
          <div className="p-4 bg-white rounded-md shadow-sm border border-amber/10">
            <h3 className="font-bold text-lg mb-2">기본 정보</h3>
            <p>이름: 후류스피릿</p>
            <p>증류일: 2025-05-01</p>
            <p>ABV: 63.5%</p>
          </div>
          <div className="md:col-span-2 p-4 bg-white rounded-md shadow-sm border border-amber/10">
            <h3 className="font-bold text-lg mb-2">관련 캐스크</h3>
            <ul className="list-disc list-inside">
              <li>캐스크 이름: 캐스크-A (ABV: 60%)</li>
              <li>캐스크 이름: 캐스크-B (ABV: 59%)</li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <Link
            to="/spirits"
            className="inline-flex items-center text-amber hover:text-copper font-bold"
          >
            <span className="mr-1">&larr;</span> 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
