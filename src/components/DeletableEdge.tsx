"use client";

import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import React from "react";
import { Button } from "./ui/Button";

const DeletableEdge = (props: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();
  return (
    <React.Fragment>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            className="w-5 h-5 border cursor-pointer rounded-full text-xs leading-none hover:shadow-lg"
            onClick={() =>
              setEdges((edges) => edges.filter((edge) => edge.id != props.id))
            }
          >
            X
          </Button>
        </div>
      </EdgeLabelRenderer>
    </React.Fragment>
  );
};

export default DeletableEdge;
