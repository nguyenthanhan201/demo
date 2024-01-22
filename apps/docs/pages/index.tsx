import { Button } from "@repo/ui/button";
import dynamic from "next/dynamic";

const DynamicReactAppLoader = dynamic(
  () => import("nextjs-module-admin/ReactAppLoader"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <div>
      <Button appName="12123">toggle</Button>
      <DynamicReactAppLoader title="123123" age2={13} />
    </div>
  );
}
