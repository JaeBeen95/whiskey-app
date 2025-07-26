import CaskListContent from "@/pages/cask/components/CaskListContent";
import CaskErrorFallback from "@/pages/cask/components/CaskErrorFallback";
import { useCaskListQuery } from "@/pages/cask/hooks/useCaskQuery";
import { useCaskSearchForm } from "@/pages/cask/hooks/useCaskSearchForm";
import { useCreateCaskMutation } from "@/pages/cask/hooks/useCreateCaskMutation";
import { useModal } from "@/hooks/useModal";
import CaskFormModal from "@/pages/cask/components/CaskFormModal";
import PageWrapper from "@/components/wrapper/PageWrapper";
import CaskLoadingFallback from "@/pages/cask/components/CaskLoadingFallback";
import type { CreateCaskRequest } from "@/pages/cask/types";

export default function CaskListPage() {
  const { register, handleSubmit, currentSearchParams, handleSearch, handleReset } =
    useCaskSearchForm();

  const { data: caskList } = useCaskListQuery(currentSearchParams);

  const { isOpen, openModal, closeModal } = useModal();

  const { mutate: createCaskMutate } = useCreateCaskMutation();

  const handleCreateSubmit = async (formData: CreateCaskRequest) => {
    console.log(formData);
    await createCaskMutate(formData);
    closeModal();
  };

  return (
    <PageWrapper loadingFallback={<CaskLoadingFallback />} errorFallback={<CaskErrorFallback />}>
      <CaskListContent
        caskList={caskList}
        register={register}
        handleSubmit={handleSubmit}
        handleSearch={handleSearch}
        handleReset={handleReset}
        openModal={openModal}
      />
      <CaskFormModal
        isOpen={isOpen}
        onClose={closeModal}
        mode="create"
        onSubmit={handleCreateSubmit}
      />
    </PageWrapper>
  );
}
