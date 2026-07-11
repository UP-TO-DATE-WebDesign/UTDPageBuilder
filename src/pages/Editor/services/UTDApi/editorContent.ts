import { API_BASE_URL, apiGet } from "./client";

export interface EditorContent {
  html: string;
  css: string;
}

export interface FetchEditorContentParams {
  siteId: string;
  pageId: string;
}

export async function fetchEditorContent({
  siteId,
  pageId,
}: FetchEditorContentParams): Promise<EditorContent> {
  const url = new URL(`${API_BASE_URL}/editor/load`);
  url.searchParams.set("siteId", siteId);
  url.searchParams.set("pageId", pageId);

  return apiGet<EditorContent>(url, "load editor content");
}
