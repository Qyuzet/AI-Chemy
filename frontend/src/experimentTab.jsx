import React from "react";

const ExperimentTab = () => {
  return (
    <section className="flex flex-col gap-4 p-4 h-full">
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="border-2 border-black rounded-lg p-4 bg-white shadow-md">
          A TAB
        </div>
        <div className="border-2 border-black rounded-lg p-4 bg-white shadow-md">
          B TAB
        </div>
      </div>
      <div className="border-2 border-black rounded-lg p-4 bg-white shadow-md flex-1">
        C TAB
      </div>
    </section>
  );
};

export default ExperimentTab;
