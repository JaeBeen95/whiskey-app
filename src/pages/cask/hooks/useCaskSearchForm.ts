import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface SearchFormData {
  cask_name?: string;
  warehouse?: string;
  distillery_true_name?: string;
  cask_size?: string;
  wood_type?: string;
  seasoning?: string;
  fill_type?: string;
  malt_type?: string;
  is_active?: boolean;
  order_by?: number;
}

export const useCaskSearchForm = () => {
  const defaultSearchValues: SearchFormData = {
    cask_name: "",
    warehouse: "",
    distillery_true_name: "",
    cask_size: "",
    wood_type: "",
    seasoning: "",
    fill_type: "",
    malt_type: "",
    is_active: true,
    order_by: 0,
  };

  const { register, handleSubmit, reset } = useForm<SearchFormData>({
    defaultValues: defaultSearchValues,
  });

  const [currentSearchParams, setCurrentSearchParams] =
    useState<Partial<SearchFormData>>(defaultSearchValues);

  const handleSearch: SubmitHandler<SearchFormData> = (formData) => {
    setCurrentSearchParams(formData);
  };

  const handleReset = () => {
    reset(defaultSearchValues);
    setCurrentSearchParams(defaultSearchValues);
  };

  return {
    register,
    handleSubmit,
    currentSearchParams,
    handleSearch,
    handleReset,
  };
};
