import { Code, Folder } from "lucide-react";
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

export default function CustomCodeTool() {
  return (
    <div>
      <Sheet>
        <Tooltip>
          <TooltipTrigger
            render={
              <SheetTrigger className="py-3 px-2 rounded focus:outline-none bg-black/40 hover:bg-black/70 hover:scale-110 transition-all duration-300 text-white" />
            }
          >
            <Code className="size-4" />
          </TooltipTrigger>
          <TooltipContent side="right">Custom Code</TooltipContent>
        </Tooltip>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Custom Code</SheetTitle>
            <SheetDescription>
              You can include additional styling and additional code using these
              section. Any changes you added may break the website, make sure
              that the code is syntactically correct to prevent breaking the
              website.
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
