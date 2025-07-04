import { Link } from "react-router-dom";
import { useModal } from "@/hooks/useModal";
import CaskFormModal from "@/pages/cask/components/CaskFormModal";
import Button from "@/components/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function CaskListPage() {
  const { isOpen, openModal, closeModal } = useModal();

  const handleFormSubmit = async () => {
    console.log("생성");
    closeModal();
  };

  return (
    <div className="p-8 bg-deep-navy-900 min-h-screen text-light-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif text-gold-500">캐스크 목록</h1>
        <Button onClick={openModal} icon={<PlusIcon />}>
          새 캐스크 등록
        </Button>
      </div>
      <div className="bg-deep-navy-800 p-6 rounded-xl shadow-lg border border-gold-500/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-deep-navy-900/50 p-6 rounded-lg shadow-md border border-gold-500/20 hover:shadow-glow-gold hover:border-gold-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-serif text-light-gray-50 mb-2">캐스크 이름 {id}</h3>
              <p className="text-sm text-light-gray-50/70 mb-4">번호: CASK-{1000 + id}</p>
              <Link
                to={`/casks/${id}`}
                className="inline-flex items-center text-gold-500 hover:text-accent-orange-500 font-bold"
              >
                상세 보기 &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
      <CaskFormModal
        isOpen={isOpen}
        onClose={closeModal}
        mode="create"
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
