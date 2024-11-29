import React from "react";

const NodeInput = ({ input }: { input: any }) => {
  return (
    <div className="flex justify-start relative p-3 bg-gray-50 w-full">
      <pre>{JSON.stringify(input, null, 4)}</pre>
    </div>
  );
};

export default NodeInput;
