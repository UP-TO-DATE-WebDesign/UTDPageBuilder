import { useState } from "react";
import { ImageOff, Plus, X } from "lucide-react";
import { usePropertiesStore, type TraitInfo } from "../stores/propertiesStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

function ImageField() {
  const imageSrc = usePropertiesStore((state) => state.imageSrc);
  const setImageSrc = usePropertiesStore((state) => state.setImageSrc);
  const openAssetManager = usePropertiesStore(
    (state) => state.openAssetManager,
  );

  return (
    <Field className="mb-3 p-2">
      <FieldLabel>Image</FieldLabel>
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded border border-gray-200 bg-gray-50">
          {imageSrc ? (
            <img src={imageSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageOff className="h-4 w-4 text-gray-300" />
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={openAssetManager}
          className="flex-1"
        >
          Select image
        </Button>
      </div>
      <Input
        type="text"
        value={imageSrc}
        onChange={(e) => setImageSrc(e.target.value)}
        className="w-full"
      />
    </Field>
  );
}

function TraitField({ trait }: { trait: TraitInfo }) {
  const setTraitValue = usePropertiesStore((state) => state.setTraitValue);

  if (trait.type === "checkbox") {
    return (
      <Field className="flex flex-row items-center justify-between w-full">
        <FieldLabel>{trait.label}</FieldLabel>
        <Switch
          checked={trait.value === "true" || trait.value === "1"}
          onCheckedChange={(checked) =>
            setTraitValue(trait.name, checked ? "true" : "false")
          }
        />
      </Field>
    );
  }

  if (trait.type === "select") {
    return (
      <Field>
        <FieldLabel>{trait.label}</FieldLabel>
        <select
          value={trait.value}
          onChange={(e) => setTraitValue(trait.name, e.target.value)}
          className="w-full"
        >
          {trait.options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>
    );
  }

  if (trait.type === "color") {
    return (
      <Field>
        <FieldLabel>{trait.label}</FieldLabel>
        <Input
          type="color"
          value={trait.value || "#000000"}
          onChange={(e) => setTraitValue(trait.name, e.target.value)}
          className="h-7 w-10"
        />
      </Field>
    );
  }

  return (
    <Field>
      <FieldLabel>{trait.label}</FieldLabel>
      <Input
        type={trait.type === "number" ? "number" : "text"}
        value={trait.value}
        onChange={(e) => setTraitValue(trait.name, e.target.value)}
        className="w-full"
      />
    </Field>
  );
}

function CustomAttributes() {
  const customAttributes = usePropertiesStore(
    (state) => state.customAttributes,
  );
  const addCustomAttribute = usePropertiesStore(
    (state) => state.addCustomAttribute,
  );
  const removeCustomAttribute = usePropertiesStore(
    (state) => state.removeCustomAttribute,
  );
  const [adding, setAdding] = useState(false);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (key.trim()) {
      addCustomAttribute(key, value);
      setKey("");
      setValue("");
      setAdding(false);
    }
  };

  return (
    <div className="px-2">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-gray-700">Custom Attributes</span>
        <Button
          type="button"
          variant="outline"
          onClick={() => setAdding((v) => !v)}
          aria-label="Add attribute"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      {adding && (
        <div className="mb-2 flex items-center gap-1">
          <Input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="name"
            className="min-w-0 flex-1"
          />
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="value"
            className="min-w-0 flex-1"
          />
          <Button type="button" variant="secondary" onClick={handleAdd}>
            Add
          </Button>
        </div>
      )}

      <div className="space-y-1">
        {customAttributes.map((attr) => (
          <div key={attr.key} className="flex items-center gap-2">
            <span className="w-24 shrink-0 truncate text-xs text-gray-500">
              {attr.key}
            </span>
            <span className="min-w-0 flex-1 truncate text-xs text-gray-700">
              {attr.value}
            </span>
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeCustomAttribute(attr.key)}
              aria-label={`Remove ${attr.key}`}
              size="icon"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PropertiesPanel() {
  const traits = usePropertiesStore((state) => state.traits);
  const isImageComponent = usePropertiesStore(
    (state) => state.isImageComponent,
  );

  return (
    <div>
      <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
        Properties
      </h2>

      {isImageComponent && <ImageField />}

      <div className="mb-3 space-y-3 px-2">
        {traits.map((trait) => (
          <TraitField key={trait.name} trait={trait} />
        ))}
      </div>

      <CustomAttributes />
    </div>
  );
}
