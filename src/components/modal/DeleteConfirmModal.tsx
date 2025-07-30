import Button from "@/components/Button";
import { Modal } from "@/components/modal/Modal";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string | undefined;
  itemType: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  itemType,
}: DeleteConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-800/30 border border-red-600/50">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-medium leading-6 text-light-gray-50 mt-4">
          정말로 <span className="font-bold text-gold-500">{itemName}</span> {itemType}을(를)
          삭제하시겠습니까?
        </h3>
        <div className="mt-2 text-sm text-light-gray-50/70">
          <p>이 작업은 되돌릴 수 없습니다. 모든 관련 데이터가 영구적으로 삭제됩니다.</p>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <Button onClick={onClose} variant="secondary">
          취소
        </Button>
        <Button onClick={onConfirm} variant="danger">
          삭제
        </Button>
      </div>
    </Modal>
  );
}
