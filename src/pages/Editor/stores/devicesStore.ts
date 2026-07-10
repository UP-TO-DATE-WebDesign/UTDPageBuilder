import { create } from "zustand";
import type { Device, Editor as GrapesEditor } from "grapesjs";

export interface DeviceInfo {
  device: Device;
  id: string;
  name: string;
}

function buildDeviceInfo(device: Device): DeviceInfo {
  return {
    device,
    id: device.get("id") ?? device.cid,
    name: device.getName() ?? "Device",
  };
}

interface DevicesStoreState {
  editor: GrapesEditor | null;
  devices: DeviceInfo[];
  selectedDeviceId: string | null;
  setEditor: (editor: GrapesEditor) => void;
  refreshDevices: () => void;
  selectDevice: (device: DeviceInfo) => void;
}

export const useDevicesStore = create<DevicesStoreState>((set, get) => ({
  editor: null,
  devices: [],
  selectedDeviceId: null,

  setEditor: (editor) => {
    set({
      editor,
      selectedDeviceId: editor.Devices.getSelected()?.get("id") ?? null,
    });
    get().refreshDevices();

    const refreshDevices = () => get().refreshDevices();
    editor.on("device:add", refreshDevices);
    editor.on("device:remove", refreshDevices);
    editor.on("device:update", refreshDevices);
    editor.on("device:select", (device?: Device | null) => {
      set({ selectedDeviceId: device?.get("id") ?? null });
    });
  },

  refreshDevices: () => {
    const { editor } = get();
    if (!editor) return;
    set({ devices: editor.Devices.getDevices().map(buildDeviceInfo) });
  },

  selectDevice: (deviceInfo) => {
    get().editor?.Devices.select(deviceInfo.device);
  },
}));
