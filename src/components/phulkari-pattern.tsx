import { cn } from "@/lib/utils";

export function PhulkariPattern({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-full relative rounded-full overflow-hidden bg-background", className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full absolute" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(50 50) scale(1.1)">
          <g className="fill-primary/80">
            <path d="M0-45l13.1 22.7L39.4-4.5l-26.2 18.2L0,36l-13.1-22.7L-39.4,4.5l26.2-18.2z" />
          </g>
          <g className="fill-primary/40">
             <path d="M-26.2-18.2L0-36l26.2,18.2L13.1,22.7L-13.1,22.7L-39.4-4.5z" />
          </g>
          <circle cx="0" cy="0" r="10" className="fill-primary" />
          <circle cx="0" cy="0" r="5" className="fill-background" />
        </g>
      </svg>
    </div>
  );
}
