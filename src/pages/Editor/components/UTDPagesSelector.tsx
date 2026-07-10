import { useUTDPagesStore } from "../../../stores/utdPagesStore";
import { useSearchParams } from "react-router-dom";

export default function UTDPagesSelector() {
  const pages = useUTDPagesStore((state) => state.pages);

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      {pages.length === 0 ? (
        <p className="px-2 text-sm text-gray-400">Loading…</p>
      ) : (
        <select
          value={searchParams.get("pageId") ?? ""}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams);
            params.set("pageId", e.target.value); // keep siteId unchanged
            setSearchParams(params);
            location.reload(); // reload the page to reflect the new pageId
          }}
          className="w-full rounded border border-gray-200 px-2 py-1 text-sm text-gray-700"
        >
          {pages.map((page) => (
            <option key={page.id} value={page.pageId}>
              {page.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
