import React, { useEffect, useId, useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Inputs";
import { taskParam } from "@/types/task";
import { Textarea } from "../ui/Textarea";

const StringParam = ({
  input,
  value,
  updateNodeParamValue,
}: {
  input: taskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
}) => {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);
  useEffect(() => {
    setInternalValue(value)
  }, [value])

  let Componenet: any = Input;
  if(input.variant === "textarea") {
    Componenet = Textarea
  }

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {input.name}
        {input.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Componenet
        id={id}
        className="bg-white"
        value={internalValue}
        placeholder="Enter value here"
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
      />
      {input.helperText && (
        <p className="text-muted-foreground px-2">{input.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
