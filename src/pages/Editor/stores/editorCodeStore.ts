import { create } from "zustand";
import type { Editor as GrapesEditor } from "grapesjs";

interface EditorCodeStoreState {
  editor: GrapesEditor | null;
  html: string;
  css: string;
  // Identifies which component html/css currently describe, so consumers can
  // tell "the underlying selection changed" (discard any unapplied draft)
  // apart from "the same component's code was refreshed" (keep it).
  selectedComponentId: string | null;
  setEditor: (editor: GrapesEditor) => void;
  refreshCode: () => void;
  // Replaces the selected component's outer markup and re-selects the result
  // (replaceWith swaps in a new Component instance, so the old reference and
  // its id/selection are gone). Throws if `html` doesn't parse.
  applyHtml: (html: string) => void;
  // Merges edited CSS text into the project's rule set (matched by selector,
  // same as the Style Manager) rather than replacing all styles. Throws if
  // `css` doesn't parse.
  applyCss: (css: string) => void;
}

export const useEditorCodeStore = create<EditorCodeStoreState>((set, get) => ({
  editor: null,
  html: "",
  css: "",
  selectedComponentId: null,

  setEditor: (editor) => {
    set({ editor });
    get().refreshCode();

    const refresh = () => get().refreshCode();
    editor.on("component:selected", refresh);
    editor.on("component:deselected", refresh);
    editor.on("component:update", refresh);
    editor.on("component:styleUpdate", refresh);
    editor.on("style:property:update", refresh);
    editor.on("style:sector:update", refresh);
    editor.on("selector", refresh);
  },

  refreshCode: () => {
    const { editor } = get();
    if (!editor) return;

    const component = editor.getSelected();
    if (!component) {
      set({ html: "", css: "", selectedComponentId: null });
      return;
    }

    set({
      html: editor.getHtml({ component }) ?? "",
      // avoidProtected: true - editor.getCss() otherwise unconditionally
      // prepends config.protectedCss (the "* {box-sizing:border-box} body
      // {margin:0}" reset), the same constant string every time regardless
      // of onlyMatched/component, which drowned out (or on components with
      // no matched rules, completely masqueraded as) the actual per-element
      // CSS this panel is supposed to show.
      css:
        editor.getCss({ component, onlyMatched: true, avoidProtected: true }) ??
        "",
      selectedComponentId: component.getId(),
    });
  },

  applyHtml: (html) => {
    const { editor } = get();
    if (!editor) return;
    const component = editor.getSelected();
    if (!component) return;

    const [replaced] = component.replaceWith(html);
    if (!replaced) return;
    editor.select(replaced);
    set({
      html: editor.getHtml({ component: replaced }) ?? "",
      selectedComponentId: replaced.getId(),
    });
  },

  applyCss: (css) => {
    const { editor } = get();
    if (!editor) return;
    const component = editor.getSelected();
    if (!component) return;

    editor.Css.addRules(css);
    set({
      css:
        editor.getCss({ component, onlyMatched: true, avoidProtected: true }) ??
        "",
    });
  },
}));
