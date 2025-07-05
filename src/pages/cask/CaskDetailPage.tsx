import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useModal } from "@/hooks/useModal";
import CaskFormModal from "@/pages/cask/components/CaskFormModal";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import EventFormModal from "@/pages/cask/components/EventFormModal";
import Dropdown from "@/components/dropdown/Dropdown";
import DropdownItem from "@/components/dropdown/DropdownItem";
import Button from "@/components/Button";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  ArrowUpOnSquareIcon,
  ArrowsRightLeftIcon,
  BeakerIcon,
  ScissorsIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import type { CaskEvent, EventType } from "@/pages/cask/types";

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
    isOpen: isDeleteCaskModalOpen,
    openModal: openDeleteCaskModal,
    closeModal: closeDeleteCaskModal,
  } = useModal();

  const [eventModalType, setEventModalType] = useState<EventType | null>(null);
  const [eventToDelete, setEventToDelete] = useState<CaskEvent | null>(null);
  const isEventFormOpen = eventModalType !== null;
  const isDeleteEventModalOpen = eventToDelete !== null;

  const handleEditCask = () => openEditModal();
  const handleDeleteCask = () => openDeleteCaskModal();
  const handleConfirmDeleteCask = () => {
    console.log("캐스크 삭제 실행");
    closeDeleteCaskModal();
  };
  const handleCaskFormSubmit = async (data: any) => {
    console.log(data);
    closeEditModal();
  };

  const openEventForm = (type: EventType) => setEventModalType(type);
  const closeEventForm = () => setEventModalType(null);
  const handleEventFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${eventModalType} 이벤트 등록`);
    closeEventForm();
  };

  const openDeleteEventModal = (event: CaskEvent) => setEventToDelete(event);
  const closeDeleteEventModal = () => setEventToDelete(null);
  const handleConfirmDeleteEvent = () => {
    if (!eventToDelete) return;
    console.log(`${eventToDelete.event_id} 이벤트 삭제 실행`);
    closeDeleteEventModal();
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
            <DropdownItem onClick={handleEditCask} icon={<PencilSquareIcon />}>
              수정하기
            </DropdownItem>
            <DropdownItem onClick={handleDeleteCask} icon={<TrashIcon />}>
              삭제하기
            </DropdownItem>
          </Dropdown>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-deep-navy-900/50 rounded-lg space-y-1">
            <h3 className="font-bold text-lg mb-2 text-gold-500/90">기본 정보</h3>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">이름:</span>{" "}
              {caskData.cask_name}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">번호:</span>{" "}
              {caskData.cask_number}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                증류소 (실제):
              </span>{" "}
              {caskData.distillery_true_name}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                증류소 (표시):
              </span>{" "}
              {caskData.distillery_display_name}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">창고:</span>{" "}
              {caskData.warehouse}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block align-top">
                코멘트:
              </span>{" "}
              <span className="inline-block w-[calc(100%-120px)]">{caskData.comment}</span>
            </p>
          </div>
          <div className="p-4 bg-deep-navy-900/50 rounded-lg space-y-1">
            <h3 className="font-bold text-lg mb-2 text-gold-500/90">물리적 특성</h3>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">ABV:</span>{" "}
              {caskData.abv}%
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                벌크 리터:
              </span>{" "}
              {caskData.bulk_liter}L
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                용량 리터:
              </span>{" "}
              {caskData.capacity_liters}L
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">LPA:</span>{" "}
              {caskData.lpa}L
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                OLA/RLA:
              </span>{" "}
              {caskData.ola_rla}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                캐스크 크기:
              </span>{" "}
              {caskData.cask_size}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                나무 종류:
              </span>{" "}
              {caskData.wood_type}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">시즈닝:</span>{" "}
              {caskData.seasoning}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                충전 유형:
              </span>{" "}
              {caskData.fill_type}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-28 inline-block">
                몰트 타입:
              </span>{" "}
              {caskData.malt_type}
            </p>
          </div>
          <div className="md:col-span-2 p-4 bg-deep-navy-900/50 rounded-lg space-y-1">
            <h3 className="font-bold text-lg mb-2 text-gold-500/90">재무 정보</h3>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-32 inline-block">
                구매 가격:
              </span>{" "}
              {caskData.purchase_price.toLocaleString()} {caskData.cask_currency}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-32 inline-block">
                예상 도착 가격:
              </span>{" "}
              {caskData.expected_arrival_price.toLocaleString()} {caskData.cask_currency}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-32 inline-block">
                병당 가격:
              </span>{" "}
              {caskData.price_per_bottle.toLocaleString()} {caskData.cask_currency}
            </p>
            <p>
              <span className="font-semibold text-light-gray-50/70 w-32 inline-block">
                LPA당 가격:
              </span>{" "}
              {caskData.price_per_lpa.toLocaleString()} {caskData.cask_currency}
            </p>
          </div>
        </div>

        <div className="md:col-span-2 mt-6 p-4 bg-deep-navy-900/50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-gold-500/90">이벤트 이력</h3>
            <Dropdown
              trigger={
                <Button
                  icon={<PlusIcon />}
                  variant="secondary"
                  className="border-0 !bg-deep-navy-800 !text-gold-500"
                >
                  이벤트 추가
                </Button>
              }
            >
              <DropdownItem
                onClick={() => openEventForm("bottling")}
                icon={<ArrowUpOnSquareIcon />}
              >
                보틀링
              </DropdownItem>
              <DropdownItem
                onClick={() => openEventForm("regauging")}
                icon={<ArrowsRightLeftIcon />}
              >
                리게이징
              </DropdownItem>
              <DropdownItem
                onClick={() => openEventForm("reracking")}
                icon={<ArrowsRightLeftIcon />}
              >
                리래킹
              </DropdownItem>
              <DropdownItem onClick={() => openEventForm("sampling")} icon={<BeakerIcon />}>
                샘플링
              </DropdownItem>
              <DropdownItem onClick={() => openEventForm("split")} icon={<ScissorsIcon />}>
                스플릿
              </DropdownItem>
              <DropdownItem onClick={() => openEventForm("transfer")} icon={<TruckIcon />}>
                창고 이동
              </DropdownItem>
            </Dropdown>
          </div>
          <ul className="space-y-2">
            {caskData.events.map((event) => (
              <li
                key={event.event_id}
                className="flex justify-between items-center p-2 rounded-md hover:bg-deep-navy-800/50"
              >
                <span>
                  {event.event_at}: {event.event_comment}
                </span>
                <button
                  onClick={() => openDeleteEventModal(event)}
                  className="p-1 text-light-gray-50/50 hover:text-red-500 cursor-pointer"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
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
        onSubmit={handleCaskFormSubmit}
      />
      <DeleteConfirmModal
        isOpen={isDeleteCaskModalOpen}
        onClose={closeDeleteCaskModal}
        onConfirm={handleConfirmDeleteCask}
        title="캐스크 삭제"
        itemName={caskData.cask_name}
        itemType="캐스크"
      />
      <EventFormModal
        eventType={eventModalType}
        isOpen={isEventFormOpen}
        onClose={closeEventForm}
        onSubmit={handleEventFormSubmit}
      />
      {eventToDelete && (
        <DeleteConfirmModal
          isOpen={isDeleteEventModalOpen}
          onClose={closeDeleteEventModal}
          onConfirm={handleConfirmDeleteEvent}
          title="이벤트 삭제"
          itemName={`'${eventToDelete.event_comment}'`}
          itemType="이벤트"
        />
      )}
    </div>
  );
}
