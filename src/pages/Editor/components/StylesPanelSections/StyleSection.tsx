import type { ReactNode } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface StyleSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  open?: boolean;
}

export default function StyleSection({
  title,
  description = "",
  children,
  open = false,
}: StyleSectionProps) {
  return (
    <Collapsible defaultOpen={open}>
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="text-xs uppercase text-primary-500">
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
          <CardAction>
            <CollapsibleTrigger className="group">
              <Button size="icon" variant="ghost" className="text-primary-500">
                <Plus className="group-data-panel-open:hidden size-5" />
                <Minus className="hidden group-data-panel-open:block size-5" />
              </Button>
            </CollapsibleTrigger>
          </CardAction>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <div className="flex flex-col gap-3">{children}</div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
