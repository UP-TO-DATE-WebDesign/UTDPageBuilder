import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { cn } from "../lib/utils";
import { useDialogStore } from "./dialogStore";

export default function AppDialog() {
  const open = useDialogStore((state) => state.open);
  const title = useDialogStore((state) => state.title);
  const content = useDialogStore((state) => state.content);
  const width = useDialogStore((state) => state.width);
  const closeDialog = useDialogStore((state) => state.closeDialog);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeDialog();
      }}
    >
      <DialogContent
        className={cn(width ?? "max-w-2xl", "max-h-[80vh] overflow-y-auto")}
      >
        {/* Panels rendered as `content` already show their own visible heading,
            so this title exists only to give the dialog an accessible name. */}
        <DialogTitle className="sr-only">{title ?? "Dialog"}</DialogTitle>
        {content}
      </DialogContent>
    </Dialog>
  );
}
