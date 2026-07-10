import { Bot } from "lucide-react";
import { useRightSidebarStore } from "../../../../components/rightSidebarStore";

export default function BotTool() {
  const toggleSidebar = useRightSidebarStore((state) => state.toggleSidebar);

  return (
    <button
      type="button"
      className="p-2 rounded-lg outline-none cursor-pointer"
      onClick={() => toggleSidebar("ai")}
    >
      <Bot className="h-4 w-4 text-white  hover:text-primary-400" />
    </button>
  );
}
