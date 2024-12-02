import React, { useId } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Inputs";
import { taskParam } from "@/types/task";

const StringParam = ({ input }: { input: taskParam }) => {
  const id = useId();
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {input.name}
        {input.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Input id={id} className="bg-white" />
      {input.helperText && (
        <p className="text-muted-foreground px-2">{input.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
