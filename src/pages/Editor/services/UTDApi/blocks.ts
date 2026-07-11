import { API_BASE_URL, apiGet } from "./client";

export interface RawUTDBlock {
  id: number;
  name: string;
  category: string;
  code: string;
  screenshot: string | null;
}

interface RawBlocksResponse {
  success: boolean;
  payload: RawUTDBlock[];
}

export async function fetchBlocks(): Promise<RawUTDBlock[]> {
  const url = new URL(`${API_BASE_URL}/blocks`);
  url.searchParams.set("version", "2");
  url.searchParams.set("developer", "true");

  const { payload } = await apiGet<RawBlocksResponse>(url, "load blocks");
  return payload;
}
