import { API_BASE_URL, apiGet } from "./client";

export interface RawWebsiteSkinTextStyle {
  name?: string;
  color?: string;
  icon?: string;
  link?: string;
  linkHover?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  lineHeight?: number;
  textTransform?: string;
}

export interface RawWebsiteSkinHeaderLevelStyle {
  color?: string;
  fontSize?: string;
  fontSizeRaw?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  textTransform?: string;
}

export interface RawWebsiteSkinHeaderStyle {
  font?: string;
  name?: string;
  lineHeight?: number;
  h1?: RawWebsiteSkinHeaderLevelStyle;
  h2?: RawWebsiteSkinHeaderLevelStyle;
  h3?: RawWebsiteSkinHeaderLevelStyle;
  h4?: RawWebsiteSkinHeaderLevelStyle;
  h5?: RawWebsiteSkinHeaderLevelStyle;
  h6?: RawWebsiteSkinHeaderLevelStyle;
}

export interface RawWebsiteSkinBackgroundEntry {
  name?: string;
  type: "color" | "image" | "none";
  value: string;
  options?: {
    size?: string;
    repeat?: string;
    position?: string;
    attachment?: string;
  };
  htmlAttributes?: Record<string, string> | string;
}

export type RawWebsiteSkinBackgroundKey =
  | "footer"
  | "header"
  | "menu"
  | "content"
  | "pageTitle"
  | "subFooter"
  | "headerToolbar";

export interface RawWebsiteSkinContent {
  fonts?: {
    body?: RawWebsiteSkinTextStyle;
    menu?: RawWebsiteSkinTextStyle;
    footer?: RawWebsiteSkinTextStyle;
    header?: RawWebsiteSkinHeaderStyle;
    general?: RawWebsiteSkinTextStyle;
    pageTitle?: RawWebsiteSkinTextStyle;
    subFooter?: RawWebsiteSkinTextStyle;
    headerToolbar?: RawWebsiteSkinTextStyle;
  };
  background?: Partial<
    Record<RawWebsiteSkinBackgroundKey, RawWebsiteSkinBackgroundEntry>
  >;
  accentColor?: string;
  accentColorHover?: string;
  maxWidth?: string | number;
  blockPadding?: number;
  // Other fields the backend returns that the skin renderer doesn't use.
  logo?: Record<string, string>;
  layout?: string;
  goToTop?: boolean;
  structure?: Record<string, string>;
  selectedLoader?: { html: string; type: string };
  isPreloaderActive?: boolean;
  extraRootVariables?: { key: string; values: string }[];
}

interface RawWebsiteSkinResponse {
  success: boolean;
  payload: {
    id: number;
    siteId: number;
    content: RawWebsiteSkinContent;
    metadata: unknown;
    createdAt: string;
    updatedAt: string;
  };
}

export interface FetchWebsiteSkinParams {
  siteId: string;
}

export async function fetchWebsiteSkin({
  siteId,
}: FetchWebsiteSkinParams): Promise<RawWebsiteSkinContent> {
  const url = new URL(`${API_BASE_URL}/website-skin`);
  url.searchParams.set("siteId", siteId);

  const { success, payload } = await apiGet<RawWebsiteSkinResponse>(
    url,
    "load website skin",
  );
  if (!success) {
    throw new Error("Failed to load website skin: request unsuccessful");
  }

  return payload.content;
}
