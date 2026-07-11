import CustomCodeTool from "./ToolbarItems/CustomCodeTool";
import LayerTool from "./ToolbarItems/LayerTool";
import PageBackUpTool from "./ToolbarItems/PageBackUpTool";
import PageTool from "./ToolbarItems/PageTool";
import SEOCheckerTool from "./ToolbarItems/SEOCheckerTool";

export default function ToolBar() {
  return (
    <div className="fixed top-16 left-2 z-20 h-auto flex flex-col gap-2">
      <PageTool />
      <LayerTool />
      <CustomCodeTool />
      <PageBackUpTool />
      <SEOCheckerTool />
    </div>
  );
}
