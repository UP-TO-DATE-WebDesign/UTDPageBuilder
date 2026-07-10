import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { useStylesStore, type StyleSectorInfo } from "../stores/stylesStore";

function SelectorRow() {
  const classes = useStylesStore((state) => state.classes);
  const states = useStylesStore((state) => state.states);
  const currentState = useStylesStore((state) => state.currentState);
  const addClass = useStylesStore((state) => state.addClass);
  const removeClass = useStylesStore((state) => state.removeClass);
  const setState = useStylesStore((state) => state.setState);
  const [newClass, setNewClass] = useState("");

  const handleAdd = () => {
    if (newClass.trim()) {
      addClass(newClass);
      setNewClass("");
    }
  };

  return (
    <div className="mb-3 space-y-2 border-b border-gray-100 px-2 pb-3">
      <div className="flex flex-wrap items-center gap-1">
        {classes.map((cls) => (
          <span
            key={cls.id}
            className="flex items-center gap-1 rounded bg-primary-100 px-2 py-0.5 text-xs text-primary-700"
          >
            {cls.label}
            <button
              type="button"
              onClick={() => removeClass(cls.id)}
              className="text-primary-400 hover:text-primary-700"
              aria-label={`Remove ${cls.label}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={newClass}
          onChange={(e) => setNewClass(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          onBlur={handleAdd}
          placeholder="+ Add class"
          className="min-w-0 flex-1 rounded border border-gray-200 px-2 py-0.5 text-xs text-gray-700"
        />
      </div>
      <select
        value={currentState}
        onChange={(e) => setState(e.target.value)}
        className="w-full rounded border border-gray-200 px-2 py-1 text-xs text-gray-700"
      >
        <option value="">- State -</option>
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SectorSection({ sector }: { sector: StyleSectorInfo }) {
  const toggleSector = useStylesStore((state) => state.toggleSector);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);

  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        onClick={() => toggleSector(sector.id)}
        className="flex w-full items-center gap-1 px-2 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <ChevronRight
          className={`h-3.5 w-3.5 text-gray-400 transition-transform ${
            sector.open ? "rotate-90" : ""
          }`}
        />
        {sector.name}
      </button>
      {sector.open && (
        <div className="space-y-2 px-2 pb-3">
          {sector.properties.map((property) => (
            <label key={property.id} className="flex items-center gap-2">
              <span className="w-24 shrink-0 text-xs text-gray-500">
                {property.label}
              </span>
              <input
                type="text"
                value={property.value}
                onChange={(e) =>
                  setPropertyValue(sector.id, property.id, e.target.value)
                }
                className="min-w-0 flex-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-700"
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StylesPanel() {
  const sectors = useStylesStore((state) => state.sectors);
  const selectedName = useStylesStore((state) => state.selectedName);

  return (
    <div>
      <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
        Styles
      </h2>
      {selectedName ? (
        <>
          <p className="mb-2 px-2 text-sm font-medium text-gray-700">
            {selectedName}
          </p>
          <SelectorRow />
        </>
      ) : (
        <p className="px-2 text-sm text-gray-400">
          Select a component to edit styles.
        </p>
      )}
      {sectors.map((sector) => (
        <SectorSection key={sector.id} sector={sector} />
      ))}
    </div>
  );
}
