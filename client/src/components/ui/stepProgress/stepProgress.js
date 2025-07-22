import React, { useEffect, useState } from "react";

const StepProgress = (props) => {
  const { steps, currentStep } = props;
  // console.log("currentStep : ", currentStep);

  const totalSteps = steps.length; // Assuming there are 4 steps

  const width = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex justify-between my-7 relative lg:my-14">
        <div className="lg:block hidden absolute bg-[#D8EAFF] h-1 w-full top-1/2 transform -translate-y-1/2 "></div>
        <div
          className="lg:block hidden absolute bg-[#003A7B] h-1 top-1/2 transform -translate-y-1/2"
          style={{ width: width }}
        ></div>
        {steps?.map((step) => {
          return (
            <>
              <div key={step.id} className="relative">
                <div
                  className={`${
                    currentStep >= step.id
                      ? "bg-[#003A7B] border-none"
                      : "bg-white border-[#003A7B] text-[#003A7B]"
                  } w-10 h-10 flex justify-center items-center rounded-full border  transition duration-300`}
                >
                  {currentStep >= step.id ? (
                    <span className="text-white font-bold text-2xl transform">
                      {step.id}
                    </span>
                  ) : (
                    <span className="text-[#003A7B] border-[#003A7B] font-bold text-xl">
                      {step.id}
                    </span>
                  )}
                </div>
                <div className="lg:block hidden absolute top-12 md:w-44 sm:left-10 left-5 transform -translate-x-1/2 text-[#003A7B] font-semibold gap-10 md:text-xl text-xs uppercase">
                  {step.label}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
