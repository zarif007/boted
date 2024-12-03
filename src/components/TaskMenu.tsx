import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";
import { taskRegistry } from "@/lib/workflow/task/registry";
import { taskType } from "@/types/task";
import { Button } from "./ui/Button";

const TaskMenu = () => {
  return (
    <aside className="w-[240px] min-w-[240px] max-w-[240px] border-r-2 border-separate h-screen overflow-auto p-2">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["extraction"]}
      >
        <AccordionItem value="extraction" className="border-0">
          <AccordionTrigger>Data extraction</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={taskType.LAUNCH_BROWSER} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

const TaskMenuBtn = ({ taskType }: { taskType: taskType }) => {
  const task = taskRegistry[taskType];

  const onDragStart = (event: React.DragEvent, type: taskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant={"secondary"}
      className="flex justify-between items-center gap-2 border w-full bg-white dark:bg-black"
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
    >
      <div className="flex gap-2">{task.label}</div>
    </Button>
  );
};

export default TaskMenu;
