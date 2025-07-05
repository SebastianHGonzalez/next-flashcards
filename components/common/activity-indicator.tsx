import { LoaderCircle } from "lucide-react";

export function ActivityIndicator(props: React.ComponentProps<typeof LoaderCircle>) {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle className="animate-spin" {...props} />
    </div>
  );
}
