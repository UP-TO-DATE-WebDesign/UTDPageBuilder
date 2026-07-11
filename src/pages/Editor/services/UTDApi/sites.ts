import type { SitePageInfo } from "../../../../stores/utdPagesStore";
import { API_BASE_URL, apiGet } from "./client";

export interface SiteInfo {
  id: number;
  name: string;
  siteId: string;
  pages: SitePageInfo[];
}

export interface FetchSiteParams {
  siteId: string;
  pageId: string;
}

interface RawSitePage {
  id: number;
  name: string;
  pageId: string;
}

interface RawSiteResponse {
  success: boolean;
  payload: {
    id: number;
    name: string;
    siteId: string;
    SitePages?: RawSitePage[];
  };
}

export async function fetchSite({
  siteId,
  pageId,
}: FetchSiteParams): Promise<SiteInfo> {
  const url = new URL(`${API_BASE_URL}/sites/${siteId}`);
  url.searchParams.set("pageId", pageId);
  url.searchParams.set("limited", "1");

  const { payload } = await apiGet<RawSiteResponse>(url, "load site");

  return {
    id: payload.id,
    name: payload.name,
    siteId: payload.siteId,
    pages: (payload.SitePages ?? []).map((page) => ({
      id: page.id,
      name: page.name,
      pageId: page.pageId,
    })),
  };
}
