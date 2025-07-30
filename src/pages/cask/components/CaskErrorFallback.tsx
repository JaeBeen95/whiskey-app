import Button from "@/components/Button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function CaskErrorFallback() {
  return (
    <div className="bg-deep-navy-900 min-h-screen flex flex-col justify-center items-center p-8 text-center text-light-gray-50 font-sans">
      <ExclamationTriangleIcon className="w-20 h-20 mx-auto mb-6 text-amber-500" />
      <h2 className="font-serif text-gold-500 text-4xl font-bold mb-4">
        캐스크 정보를 불러오지 못했습니다.
      </h2>
      <p className="text-light-gray-50 text-lg leading-relaxed mb-8">
        서버와 통신하는 중에 문제가 발생했습니다. 잠시 후 다시 시도해주시거나, 인터넷 연결 상태를
        확인해주세요.
      </p>

      <Button onClick={() => window.location.reload()} variant="danger">
        새로고침
      </Button>
    </div>
  );
}
