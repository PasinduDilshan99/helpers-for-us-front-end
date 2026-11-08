import CommonLoading from "@/components/common-components/CommonLoading";
import React from "react";

const TestPage = () => {
  return (
    <div>
      <CommonLoading
        message="Loading destination statistics..."
        subMessage="Destinations"
        fullScreen
      />
    </div>
  );
};

export default TestPage;
