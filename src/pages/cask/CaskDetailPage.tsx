import { useParams, Link } from "react-router-dom";
import { useCaskDetailQuery } from "@/pages/cask/hooks/useCaskQuery";
import { useModal } from "@/hooks/useModal";
import CaskFormModal from "@/pages/cask/components/CaskFormModal";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import Dropdown from "@/components/dropdown/Dropdown";
import DropdownItem from "@/components/dropdown/DropdownItem";
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function CaskDetailPage() {
  const { caskId } = useParams<{ caskId: string }>();

  if (!caskId) throw new Error("유효하지 않은 캐스크 ID입니다.");

  const { data: caskDetail } = useCaskDetailQuery(caskId);

  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    isOpen: isDeleteCaskModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const handleConfirmDeleteCask = () => {
    console.log("캐스크 삭제 실행");
    closeDeleteModal();
  };
  const handleCaskFormSubmit = async (data: any) => {
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
            <DropdownItem onClick={openEditModal} icon={<PencilSquareIcon />}>
              수정하기
            </DropdownItem>
            <DropdownItem onClick={openDeleteModal} icon={<TrashIcon />}>
              삭제하기
            </DropdownItem>
          </Dropdown>
        </div>

        <CaskFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          mode="edit"
          initialData={caskDetail}
          onSubmit={handleCaskFormSubmit}
        />
        <DeleteConfirmModal
          isOpen={isDeleteCaskModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDeleteCask}
          title="캐스크 삭제"
          itemName={caskDetail?.caskName}
          itemType="캐스크"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-deep-navy-900/50 rounded-lg space-y-1">
            <h3 className="font-bold text-lg mb-2 text-gold-500/90">기본 정보</h3>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">이름:</span>
              {caskDetail?.caskName}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">번호:</span>
              {caskDetail?.caskNumber}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                증류소 (실제):
              </span>
              {caskDetail?.distilleryTrueName}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                증류소 (표시):
              </span>
              {caskDetail?.distilleryDisplayName}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">창고:</span>
              {caskDetail?.warehouse}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block align-top">
                코멘트:
              </span>
              <span className="inline-block w-[calc(100%-120px)]">{caskDetail?.comment}</span>
            </p>
          </div>
          <div className="p-4 bg-deep-navy-900/50 rounded-lg space-y-1">
            <h3 className="font-bold text-lg mb-2 text-gold-500/90">물리적 특성</h3>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">ABV:</span>
              {caskDetail?.abv}%
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                벌크 리터:
              </span>
              {caskDetail?.bulkLiter}L
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                용량 리터:
              </span>
              {caskDetail?.capacityLiters}L
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">LPA:</span>
              {caskDetail?.lpa}L
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                OLA/RLA:
              </span>
              {caskDetail?.olarla}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                캐스크 크기:
              </span>
              {caskDetail?.caskSize}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                나무 종류:
              </span>
              {caskDetail?.woodType}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">시즈닝:</span>
              {caskDetail?.seasoning}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                충전 유형:
              </span>
              {caskDetail?.fillType}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                몰트 타입:
              </span>
              {caskDetail?.maltType}
            </p>
          </div>
          <div className="md:col-span-2 p-4 bg-deep-navy-900/50 rounded-lg space-y-1">
            <h3 className="font-bold text-lg mb-2 text-gold-500/90">재무 정보</h3>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-32 inline-block">
                구매 가격:
              </span>
              {caskDetail?.purchasePrice} {caskDetail?.caskCurrency}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-32 inline-block">
                예상 도착 가격:
              </span>
              {caskDetail?.expectedArrivalPrice} {caskDetail?.caskCurrency}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-32 inline-block">
                병당 가격:
              </span>
              {caskDetail?.pricePerBottle} {caskDetail?.caskCurrency}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-32 inline-block">
                LPA당 가격:
              </span>
              {caskDetail?.pricePerLpa} {caskDetail?.caskCurrency}
            </p>
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
    </div>
  );
}
