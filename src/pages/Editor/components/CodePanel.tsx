import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CodeEditor from "./CodeEditor";
import { useEditorCodeStore } from "../stores/editorCodeStore";

export default function CodePanel() {
  const html = useEditorCodeStore((state) => state.html);
  const css = useEditorCodeStore((state) => state.css);
  const selectedComponentId = useEditorCodeStore(
    (state) => state.selectedComponentId,
  );
  const applyHtml = useEditorCodeStore((state) => state.applyHtml);
  const applyCss = useEditorCodeStore((state) => state.applyCss);

  // Local drafts, separate from the store's html/css: typing here shouldn't
  // touch the canvas until Apply is pressed. Each draft keeps following the
  // canvas live (see the effects below) until the user edits it, at which
  // point it stops following - until Apply, or a different component gets
  // selected - so it never clobbers an unapplied edit out from under them.
  const [htmlDraft, setHtmlDraft] = useState(html);
  const [cssDraft, setCssDraft] = useState(css);
  const htmlDirtyRef = useRef(false);
  const cssDirtyRef = useRef(false);
  const lastSelectedIdRef = useRef(selectedComponentId);

  useEffect(() => {
    if (selectedComponentId === lastSelectedIdRef.current) return;
    lastSelectedIdRef.current = selectedComponentId;
    htmlDirtyRef.current = false;
    cssDirtyRef.current = false;
    setHtmlDraft(html);
    setCssDraft(css);
    // Only a genuine selection change should force-discard drafts - html/css
    // updates for the *same* selection are handled by the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedComponentId]);

  useEffect(() => {
    if (!htmlDirtyRef.current) setHtmlDraft(html);
  }, [html]);

  useEffect(() => {
    if (!cssDirtyRef.current) setCssDraft(css);
  }, [css]);

  const handleApplyHtml = () => {
    try {
      applyHtml(htmlDraft);
      htmlDirtyRef.current = false;
    } catch (err) {
      console.error(err);
      toast.error("Couldn't apply HTML - check for a syntax error");
    }
  };

  const handleApplyCss = () => {
    try {
      applyCss(cssDraft);
      cssDirtyRef.current = false;
    } catch (err) {
      console.error(err);
      toast.error("Couldn't apply CSS - check for a syntax error");
    }
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4>HTML</h4>
          <Button size="sm" variant="outline" onClick={handleApplyHtml}>
            Apply
          </Button>
        </div>
        <CodeEditor
          docKey="html-code"
          value={htmlDraft}
          onChange={(next) => {
            htmlDirtyRef.current = true;
            setHtmlDraft(next);
          }}
          language="html"
          height="100%"
          minimap={false}
          formatOnLoad
          className="overflow-hidden rounded-md border flex-1"
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4>CSS</h4>
          <Button size="sm" variant="outline" onClick={handleApplyCss}>
            Apply
          </Button>
        </div>
        <CodeEditor
          docKey="css-code"
          value={cssDraft}
          onChange={(next) => {
            cssDirtyRef.current = true;
            setCssDraft(next);
          }}
          language="css"
          height="100%"
          minimap={false}
          formatOnLoad
          className="overflow-hidden rounded-md border flex-1"
        />
      </div>
    </div>
  );
}
