import Editor from "@/components/Editor";
import React from "react";

const page = ({ params }: { params: { workflowId: string } }) => {
  const { workflowId } = params;
  return <Editor workflowId={workflowId} />;
};

export default page;
