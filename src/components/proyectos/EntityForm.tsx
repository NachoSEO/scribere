"use client";

import { FormField } from "./FormField";

export interface FieldConfig {
  key: string;
  label: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}

interface EntityFormProps {
  fields: FieldConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  projectId?: string;
}

export function EntityForm({ fields, values, onChange, projectId }: EntityFormProps) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <FormField
          key={field.key}
          label={field.label}
          value={values[field.key] ?? ""}
          onChange={(value) => onChange(field.key, value)}
          multiline={field.multiline}
          rows={field.rows}
          placeholder={field.placeholder}
          projectId={projectId}
        />
      ))}
    </div>
  );
}
