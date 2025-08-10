export function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = ((currentStep - 1) / (totalSteps -1)) * 100;
  return (
    <div className="w-full bg-muted rounded-full h-2 mb-6">
      <div
        className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
