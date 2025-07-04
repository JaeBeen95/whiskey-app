import { Link } from "react-router-dom";
import type { CaskContent } from "@/pages/cask/types";

interface CaskCardProps {
  cask: CaskContent;
}

export default function CaskCard({ cask }: CaskCardProps) {
  return (
    <div className="bg-deep-navy-900/50 p-6 rounded-lg shadow-md border border-gold-500/20 hover:shadow-glow-gold hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-serif text-light-gray-50 mb-2 truncate">{cask.cask_name}</h3>
        <p className="text-sm text-light-gray-50/70">번호: {cask.cask_number}</p>
        <p className="text-sm text-light-gray-50/70">몰트 타입: {cask.malt_type}</p>
        <p className="text-sm text-light-gray-50/70 mb-4">ABV: {cask.abv}%</p>
      </div>
      <Link
        to={`/casks/${cask.cask_id}`}
        className="inline-flex items-center text-gold-500 hover:text-accent-orange-500 font-bold self-start mt-4"
      >
        상세 보기 &rarr;
      </Link>
    </div>
  );
}
