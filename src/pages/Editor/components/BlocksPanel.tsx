import { useMemo, useState } from "react";
import { ImageOff } from "lucide-react";
import { useBlocksStore, type BlockInfo } from "../stores/blocksStore";

function getCategories(blocks: BlockInfo[]): string[] {
  const categories = new Set<string>();
  for (const block of blocks) {
    categories.add(block.category || "Other");
  }
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
}

export default function BlocksPanel() {
  const blocks = useBlocksStore((state) => state.blocks);
  const startBlockDrag = useBlocksStore((state) => state.startBlockDrag);
  const appendBlock = useBlocksStore((state) => state.appendBlock);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => getCategories(blocks), [blocks]);
  const visibleBlocks = selectedCategory
    ? blocks.filter((block) => (block.category || "Other") === selectedCategory)
    : blocks;

  if (blocks.length === 0) {
    return <p className="px-2 text-sm text-gray-400">Loading…</p>;
  }

  return (
    <div className="flex h-[70vh] gap-3">
      <div className="w-36 shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-800 pr-3">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Categories
        </p>
        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className={`mb-1 block w-full rounded px-2 py-1 text-left text-xs ${
            selectedCategory === null
              ? "text-primary-700 font-bold"
              : "text-gray-600 hover:primary-100 dark:hover:bg-gray-800"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`mb-1 block w-full truncate rounded px-2 py-1 text-left text-xs ${
              selectedCategory === category
                ? "text-primary-700 font-bold"
                : "text-gray-600 hover:primary-100 dark:hover:bg-gray-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="min-w-0 flex-1 overflow-y-auto pr-1">
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
          {selectedCategory ?? "All Blocks"}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {visibleBlocks.map((block) => (
            <div
              key={block.id}
              draggable
              onDragStart={(e) => startBlockDrag(block, e.nativeEvent)}
              onClick={() => appendBlock(block)}
              className="group flex cursor-grab flex-col overflow-hidden rounded border border-gray-200 dark:border-gray-800 hover:border-primary-400 dark:hover:border-primary-400 active:cursor-grabbing"
            >
              {block.media ? (
                <div
                  className="aspect-video w-full bg-gray-100 dark:bg-gray-800"
                  dangerouslySetInnerHTML={{ __html: block.media }}
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-300">
                  <ImageOff className="h-5 w-5" />
                </div>
              )}
              <span className="truncate px-1.5 py-1 text-[11px] text-gray-700 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-600 group-hover:font-bold">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
