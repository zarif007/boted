import Editor from "@/components/Editor";
import React from "react";

interface PageProps {
  params: { workflowId: string };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { workflowId } = params;
  return <Editor workflowId={workflowId} />;
};

export default Page;
