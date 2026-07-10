import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useDevicesStore, type DeviceInfo } from "../stores/devicesStore";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

function deviceIcon(device: DeviceInfo) {
  const id = device.id.toLowerCase();
  if (id.includes("tablet")) return Tablet;
  if (id.includes("mobile")) return Smartphone;
  return Monitor;
}

export default function DeviceSelector() {
  const devices = useDevicesStore((state) => state.devices);
  const selectedDeviceId = useDevicesStore((state) => state.selectedDeviceId);
  const selectDevice = useDevicesStore((state) => state.selectDevice);

  if (devices.length === 0) return null;

  return (
    <ButtonGroup>
      {devices.map((device) => {
        const Icon = deviceIcon(device);
        return (
          <Button
            key={device.id}
            type="button"
            variant="outline"
            onClick={() => selectDevice(device)}
            title={device.name}
            className={`flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 ${
              selectedDeviceId === device.id
                ? "bg-primary-100 text-primary-700"
                : "text-gray-500"
            }`}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
