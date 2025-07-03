import { Link } from "react-router-dom";

export default function CaskListPage() {
  return (
    <div className="p-8 bg-parchment min-h-[calc(100vh-80px)] text-deep-brown">
      <h1 className="text-4xl font-serif text-amber mb-8">캐스크 목록</h1>
      <div className="bg-parchment-light p-6 rounded-xl shadow-md border border-deep-brown/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div
              key={id}
              className="bg-white p-6 rounded-lg shadow-md border border-amber/20 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-serif text-deep-brown mb-2">캐스크 이름 {id}</h3>
              <p className="text-sm text-deep-brown/80 mb-1">번호: CASK-{1000 + id}</p>
              <p className="text-sm text-deep-brown/80 mb-4">증류소: 시크릿 아일라</p>
              <Link
                to={`/casks/${id}`}
                className="inline-flex items-center text-amber hover:text-copper font-bold"
              >
                상세 보기
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
