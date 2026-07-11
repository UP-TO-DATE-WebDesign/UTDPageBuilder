import { Folder, Network } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function PageTool() {
  return (
    <div>
      <Sheet>
        <Tooltip>
          <TooltipTrigger
            render={
              <SheetTrigger className="py-3 px-2 rounded focus:outline-none bg-black/40 hover:bg-black/70 hover:scale-110 transition-all duration-300 text-white" />
            }
          >
            <Network className="size-4" />
          </TooltipTrigger>
          <TooltipContent side="right">Pages</TooltipContent>
        </Tooltip>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Pages</SheetTitle>
            <SheetDescription>Manage pages</SheetDescription>
          </SheetHeader>
          <div className="px-2">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Folder />
                </EmptyMedia>
                <EmptyTitle>No data</EmptyTitle>
                <EmptyDescription>No data found</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
