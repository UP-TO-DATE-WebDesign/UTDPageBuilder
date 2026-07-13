import SizeInput from "../StyleSettingInputFields/SizeInput";
import VisibilityInput from "../StyleSettingInputFields/VisibilityInput";
import ColorInput from "../StyleSettingInputFields/ColorInput";

export default function StyleOptions() {
  return (
    <div className="flex flex-col gap-4 my-8 px-2">
      <h4 className="text-xs uppercase text-primary-500">Style Options</h4>
      <div className="flex flex-col gap-2">
        <VisibilityInput />
        <SizeInput />
        <ColorInput />
      </div>
    </div>
  );
}
