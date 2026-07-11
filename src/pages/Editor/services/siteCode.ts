import type { Editor as GrapesEditor } from "grapesjs";
import type { RawSiteCodeEntry } from "./UTDApi";

function getSection(
  entries: RawSiteCodeEntry[],
  section: "header" | "footer",
): string {
  return entries.find((entry) => entry.section === section)?.code ?? "";
}

const SITE_CODE_HEADER_ID = "site-code-header";
const PAGE_CODE_HEADER_ID = "page-code-header";
const PAGE_CODE_FOOTER_ID = "page-code-footer";

function upsertHtml(doc: Document, container: Element, id: string, html: string) {
  let el = container.querySelector<HTMLDivElement>(`#${id}`);
  if (!el) {
    el = doc.createElement("div");
    el.id = id;
    container.appendChild(el);
  }
  el.innerHTML = html;
}

function applySiteCode(
  editor: GrapesEditor,
  siteHeader: string,
  pageHeader: string,
  pageFooter: string,
) {
  const doc = editor.Canvas.getDocument();
  const body = editor.Canvas.getBody();
  if (!doc?.head || !body) return;

  if (siteHeader) upsertHtml(doc, doc.head, SITE_CODE_HEADER_ID, siteHeader);
  if (pageHeader) upsertHtml(doc, doc.head, PAGE_CODE_HEADER_ID, pageHeader);
  if (pageFooter) upsertHtml(doc, body, PAGE_CODE_FOOTER_ID, pageFooter);
}

// Site-wide and page-specific custom code both apply at once (the old
// project loads them together too, not one overriding the other) - only
// the header sections are used for the site-wide code, matching the old
// project (its footer injection was present but disabled/commented out).
// Injected into the canvas iframe only, same as website-skin: applies
// immediately if the frame is already loaded, and again on every future
// frame load, since applySiteCode is idempotent.
export function loadSiteCode(
  editor: GrapesEditor,
  siteEntries: RawSiteCodeEntry[],
  pageEntries: RawSiteCodeEntry[],
) {
  const siteHeader = getSection(siteEntries, "header");
  const pageHeader = getSection(pageEntries, "header");
  const pageFooter = getSection(pageEntries, "footer");

  if (editor.Canvas.getDocument()?.head) {
    applySiteCode(editor, siteHeader, pageHeader, pageFooter);
  }
  editor.on("canvas:frame:load", () =>
    applySiteCode(editor, siteHeader, pageHeader, pageFooter),
  );
}
