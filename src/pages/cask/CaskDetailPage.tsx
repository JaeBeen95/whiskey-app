import { useParams, Link } from "react-router-dom";
import { useModal } from "@/hooks/useModal";
import CaskFormModal from "@/pages/cask/components/CaskFormModal";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import Dropdown from "@/components/dropdown/Dropdown";
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import DropdownItem from "@/components/dropdown/DropdownItem";

const caskData = {
  cask_id: 123,
  cask_name: "고씨네캐스크",
  cask_number: "234523424A",
  distillery_display_name: "시크릿 아일라",
  distillery_true_name: "쿨일라",
  warehouse: "Warehouse A",
  comment: "이 캐스크는 특별히 관리됩니다.",
  abv: 60,
  bulk_liter: 200,
  capacity_liters: 200,
  lpa: 120,
  ola_rla: "OLA",
  cask_size: "Standard Barrel",
  wood_type: "American Oak",
  seasoning: "Sherry",
  fill_type: "Sherry Butt",
  malt_type: "Single Malt",
  purchase_price: 10000,
  cask_currency: "GBP",
  expected_arrival_price: 12000,
  price_per_bottle: 50,
  price_per_lpa: 83.33,
  events: [
    {
      event_id: 1,
      event_type: "구매",
      event_at: "2025-07-02",
      event_comment: "구매 (가격: 10000 GBP)",
      event_price: 10000,
      event_currency: "GBP",
    },
  ],
  is_active: true,
};

export default function CaskDetailPage() {
  const { caskId } = useParams();
  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const handleEdit = () => {
    console.log("수정 시작");
    openEditModal();
  };

  const handleDelete = () => {
    console.log("삭제 확인 모달 열기");
    openDeleteModal();
  };

  const handleConfirmDelete = () => {
    console.log("삭제 실행");
    closeDeleteModal();
  };

  const handleFormSubmit = async (data: any) => {
    console.log(data);
    closeEditModal();
  };

  return (
    <div className="p-8 bg-deep-navy-900 min-h-screen text-light-gray-50">
      <h1 className="text-4xl font-serif text-gold-500 mb-8">캐스크 상세 정보: {caskId}</h1>
      <div className="relative bg-deep-navy-800 p-6 rounded-xl shadow-lg border border-gold-500/20">
        <div className="absolute top-4 right-4">
          <Dropdown
            trigger={
              <EllipsisVerticalIcon className="w-6 h-6 text-light-gray-50/70 hover:text-gold-500" />
            }
          >
            <DropdownItem onClick={handleEdit} icon={<PencilSquareIcon />}>
              수정하기
            </DropdownItem>
            <DropdownItem onClick={handleDelete} icon={<TrashIcon />}>
              삭제하기
            </DropdownItem>
          </Dropdown>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-deep-navy-900/50 rounded-lg space-y-1">
            <h3 className="font-bold text-lg mb-2 text-gold-500/90">기본 정보</h3>
            <p>이름: {caskData.cask_name}</p>
            <p>번호: {caskData.cask_number}</p>
            <p>증류소 (실제): {caskData.distillery_true_name}</p>
            <p>증류소 (표시): {caskData.distillery_display_name}</p>
            <p>창고: {caskData.warehouse}</p>
            <p>코멘트: {caskData.comment}</p>
          </div>
          <div className="p-4 bg-deep-navy-900/50 rounded-lg space-y-1">
            <h3 className="font-bold text-lg mb-2 text-gold-500/90">물리적 특성</h3>
            <p>ABV: {caskData.abv}%</p>
            <p>벌크 리터: {caskData.bulk_liter}L</p>
            <p>용량 리터: {caskData.capacity_liters}L</p>
            <p>LPA: {caskData.lpa}L</p>
            <p>OLA/RLA: {caskData.ola_rla}</p>
            <p>캐스크 크기: {caskData.cask_size}</p>
            <p>나무 종류: {caskData.wood_type}</p>
            <p>시즈닝: {caskData.seasoning}</p>
            <p>충전 유형: {caskData.fill_type}</p>
            <p>몰트 타입: {caskData.malt_type}</p>
          </div>
          <div className="md:col-span-2 p-4 bg-deep-navy-900/50 rounded-lg space-y-1">
            <h3 className="font-bold text-lg mb-2 text-gold-500/90">재무 정보</h3>
            <p>
              구매 가격: {caskData.purchase_price.toLocaleString()} {caskData.cask_currency}
            </p>
            <p>
              예상 도착 가격: {caskData.expected_arrival_price.toLocaleString()}{" "}
              {caskData.cask_currency}
            </p>
            <p>
              병당 가격: {caskData.price_per_bottle.toLocaleString()} {caskData.cask_currency}
            </p>
            <p>
              LPA당 가격: {caskData.price_per_lpa.toLocaleString()} {caskData.cask_currency}
            </p>
          </div>
          <div className="md:col-span-2 p-4 bg-deep-navy-900/50 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-gold-500/90">이벤트 이력</h3>
            <ul className="list-disc list-inside space-y-1">
              {caskData.events.map((event) => (
                <li key={event.event_id}>
                  {event.event_at}: {event.event_comment}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <Link
            to="/casks"
            className="inline-flex items-center text-gold-500 hover:text-accent-orange-500 font-bold"
          >
            &larr; 목록으로 돌아가기
          </Link>
        </div>
      </div>

      <CaskFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        mode="edit"
        initialData={caskData}
        onSubmit={handleFormSubmit}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="캐스크 삭제"
        itemName={caskData.cask_name}
        itemType="캐스크"
      />
    </div>
  );
}
