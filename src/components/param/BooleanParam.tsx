import React, { useEffect, useId, useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Inputs";
import { taskParam } from "@/types/task";
import { Textarea } from "../ui/Textarea";
import { Switch } from "../ui/Switch";

const BooleanParam = ({
  input,
  value,
  updateNodeParamValue,
}: {
  input: taskParam;
  value: boolean;
  updateNodeParamValue: (newValue: string | boolean) => void;
}) => {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const Component: any = Switch;
  // if (input.variant === "textarea") {
  //   Component = Textarea;
  // }

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {input.name}
        {input.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Component
        id={id}
        className="bg-white"
        checked={internalValue}
        placeholder="Enter value here"
        onCheckedChange={(e: boolean) => updateNodeParamValue(e)}
      />
      {input.helperText && (
        <p className="text-muted-foreground px-2">{input.helperText}</p>
      )}
    </div>
  );
};

export default BooleanParam;
