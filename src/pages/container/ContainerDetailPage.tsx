import { useParams, Link } from "react-router-dom";

export default function ContainerDetailPage() {
  const { containerId } = useParams();

  return (
    <div className="p-8 bg-parchment min-h-[calc(100vh-80px)] text-deep-brown">
      <h1 className="text-4xl font-serif text-amber mb-8">컨테이너 상세 정보: {containerId}</h1>
      <div className="bg-parchment-light p-6 rounded-xl shadow-md border border-deep-brown/10">
        <p className="font-sans text-lg mb-4">
          여기에 컨테이너 ID {containerId}에 대한 상세 정보가 표시됩니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-deep-brown">
          <div className="p-4 bg-white rounded-md shadow-sm border border-amber/10">
            <h3 className="font-bold text-lg mb-2">기본 정보</h3>
            <p>이름: 보관용 컨테이너 A</p>
            <p>일련번호: CONT-2001</p>
            <p>재질: Stainless Steel</p>
            <p>용량: 1000L</p>
          </div>
          <div className="p-4 bg-white rounded-md shadow-sm border border-amber/10">
            <h3 className="font-bold text-lg mb-2">추가 정보</h3>
            <p>메모: 정기 점검 필요</p>
            <p>생성일: 2025-07-02</p>
            <p>최근 업데이트: 2025-07-02</p>
          </div>
        </div>
        <div className="mt-8">
          <Link
            to="/containers"
            className="inline-flex items-center text-amber hover:text-copper font-bold"
          >
            <span className="mr-1">&larr;</span> 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
