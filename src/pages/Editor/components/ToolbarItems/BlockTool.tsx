import { Plus } from "lucide-react";
import { useDialogStore } from "../../../../components/dialogStore";
import BlocksPanel from "../BlocksPanel";
import { Button } from "@/components/ui/button";

export default function BlockTool() {
  const openDialog = useDialogStore((state) => state.openDialog);

  return (
    <Button
      type="button"
      onClick={() => openDialog(<BlocksPanel />, "Blocks", "max-w-[700px]")}
    >
      <Plus className="h-4 w-4" />
    </Button>
  );
}
