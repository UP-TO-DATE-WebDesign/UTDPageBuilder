import FloatInput from "../StyleSettingInputFields/FloatInput/FloatInput";
import DisplayInput from "../StyleSettingInputFields/DisplayInput/DisplayInput";
import InsetInput from "../StyleSettingInputFields/InsetInput/InsetInput";
import PositionInput from "../StyleSettingInputFields/PositionInput/PositionInput";
import LayerOrderInput from "../StyleSettingInputFields/LayerOrderInput/LayerOrderInput";
import OverflowInput from "../StyleSettingInputFields/OverflowInput/OverflowInput";
import ImageFitInput from "../StyleSettingInputFields/ImageFitInput/ImageFitInput";
import ObjectPositionInput from "../StyleSettingInputFields/ObjectPositionInput/ObjectPositionInput";

export default function General() {
  return (
    <div className="flex flex-col gap-4 my-8 px-2">
      <h4 className="text-xs uppercase text-primary-500">General</h4>
      <div className="flex flex-col gap-2">
        <FloatInput />
        <DisplayInput />
        <InsetInput />
        <PositionInput />
        <LayerOrderInput />
        <OverflowInput />
        <ImageFitInput />
        <ObjectPositionInput />
      </div>
    </div>
  );
}
