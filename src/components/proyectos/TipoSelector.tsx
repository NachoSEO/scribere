"use client";

import CustomSelect from "@/components/ui/CustomSelect";

interface TipoSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  colorMap?: Record<string, string>;
}

export function TipoSelector({ value, onChange, options }: TipoSelectorProps) {
  return (
    <CustomSelect
      value={value}
      onChange={(v) => onChange(v)}
      options={options.map((option) => ({ value: option, label: option }))}
      placeholder="Seleccionar tipo..."
    />
  );
}
