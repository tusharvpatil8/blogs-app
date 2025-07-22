import React from "react";
import useThemeClass from "utils/hooks/useThemeClass";

const Dashboard = () => {
  const { textTheme } = useThemeClass();

  return (
    <>
      <div className="h-[60vh] flex flex-col justify-center items-center gap-4">
        <div
          className={`my-3 ${textTheme} dark:${textTheme} text-2xl font-bold`}
        >
          Welcome
        </div>
      </div>
    </>
  );
};

export default Dashboard;
