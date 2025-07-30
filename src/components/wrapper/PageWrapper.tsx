import { Suspense } from "react";
import ErrorBoundary from "@/components/wrapper/ErrorBoundary";

interface PageWrapperProps {
  children: React.ReactNode;
  loadingFallback: React.ReactNode;
  errorFallback: React.ReactNode;
}

export default function PageWrapper({
  children,
  loadingFallback,
  errorFallback,
}: PageWrapperProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
