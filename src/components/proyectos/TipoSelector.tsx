"use client";

interface TipoSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  colorMap?: Record<string, string>;
}

const defaultColorMap: Record<string, string> = {
  aliada: "#d1fae5",    // green-ish
  aliado: "#d1fae5",    // green-ish
  enemiga: "#fee2e2",   // red-ish
  enemigo: "#fee2e2",   // red-ish
  rival: "#ffedd5",     // orange-ish
  neutral: "#f3f4f6",   // gray
  subordinada: "#dbeafe", // blue-ish
  mentor: "#dbeafe",    // blue-ish
  familia: "#ede9fe",   // purple-ish
  romántico: "#fce7f3", // pink-ish
};

export function TipoSelector({ value, onChange, options, colorMap }: TipoSelectorProps) {
  const colors = { ...defaultColorMap, ...colorMap };
  const bgColor = colors[value] || "#f3f4f6";

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none rounded-full px-2.5 py-0.5 text-xs font-medium border-none cursor-pointer text-[var(--color-ink)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
      style={{ backgroundColor: bgColor }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
