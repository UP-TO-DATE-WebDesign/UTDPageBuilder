import BlockTool from "./ToolbarItems/BlockTool";
import DeviceSelector from "./DeviceSelector";
import UTDPagesSelector from "./UTDPagesSelector";

export default function HeaderBar() {
  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <div>
        <UTDPagesSelector />
      </div>
      <BlockTool />
      <DeviceSelector />
    </div>
  );
}
