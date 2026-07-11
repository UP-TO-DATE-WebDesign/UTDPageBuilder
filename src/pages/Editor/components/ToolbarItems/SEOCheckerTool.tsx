import { ChartNoAxesCombinedIcon, Folder } from "lucide-react";
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

export default function SEOCheckerTool() {
  return (
    <div>
      <Sheet>
        <Tooltip>
          <TooltipTrigger
            render={
              <SheetTrigger className="py-3 px-2 rounded focus:outline-none bg-black/40 hover:bg-black/70 hover:scale-110 transition-all duration-300 text-white" />
            }
          >
            <ChartNoAxesCombinedIcon className="size-4" />
          </TooltipTrigger>
          <TooltipContent side="right">SEO Checker</TooltipContent>
        </Tooltip>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>SEO Analysis</SheetTitle>
            <SheetDescription>
              Optimize your page for better search rankings
            </SheetDescription>
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
