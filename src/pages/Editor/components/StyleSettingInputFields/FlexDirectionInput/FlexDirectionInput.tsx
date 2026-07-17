import { ArrowRight, ArrowLeft, ArrowDown, ArrowUp } from "lucide-react";
import { useStylesStore } from "../../../stores/stylesStore";
import { findProperty } from "../findProperty";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import reference from "./FlexDirectionInput.json";

const ICONS: Record<string, typeof ArrowRight> = {
  row: ArrowRight,
  "row-reverse": ArrowLeft,
  column: ArrowDown,
  "column-reverse": ArrowUp,
};

export default function FlexDirectionInput() {
  const sectors = useStylesStore((state) => state.sectors);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);
  const flexDirection = findProperty(sectors, [reference.id]);

  const setFlexDirection = (value: string) => {
    if (flexDirection)
      setPropertyValue(
        flexDirection.sectorId,
        flexDirection.property.id,
        value,
      );
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-50 text-xs">{reference.label}</Label>
      <ButtonGroup className="w-full">
        {reference.options.map((option) => {
          const Icon = ICONS[option.id];
          return (
            <Tooltip key={option.id}>
              <TooltipTrigger
                render={
                  <Button
                    variant={
                      flexDirection?.property?.value === option.id
                        ? "default"
                        : "outline"
                    }
                    className="flex-1"
                    aria-label={option.label}
                    onClick={() => setFlexDirection(option.id)}
                  />
                }
              >
                <Icon />
              </TooltipTrigger>
              <TooltipContent>{option.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
