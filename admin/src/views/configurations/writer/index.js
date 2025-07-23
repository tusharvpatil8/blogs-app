import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card } from "components/ui";
import WriterForm from "./components/writerForm";
import { HiPlusCircle } from "react-icons/hi";
import WriterList from "./components/writerList";

const WriterLists = () => {
  const themeColor = useSelector((state) => state?.theme?.themeColor);
  const primaryColorLevel = useSelector(
    (state) => state?.theme?.primaryColorLevel
  );

  const [report, setReport] = useState({
    writer_id: "",
    writer_name: "",
    email: "",
    display_name: "",
    writer_alt: "",
  });
  const [drawerFlag, setDrawerFlag] = useState(false);

  const handleAddNewAdminClick = () => {
    setDrawerFlag(true);
  };
  const handleAddNewAdminCloseClick = () => {
    setReport(null);
    setDrawerFlag(false);
  };

  return (
    <>
      <Card className="mb-4">
        <div className="flex items-center justify-between">
          <div
            className={`text-xl font-semibold text-${themeColor}-${primaryColorLevel} dark:text-white`}
          >
            Writer
          </div>
          <div>
            <Button
              size="sm"
              variant="solid"
              icon={<HiPlusCircle color={"#fff"} />}
              onClick={async () => {
                handleAddNewAdminCloseClick();
                setReport();
                setTimeout(() => {
                  handleAddNewAdminClick();
                }, 50);
              }}
            >
              Add Writer
            </Button>
          </div>
        </div>
      </Card>

      <WriterForm
        isOpen={drawerFlag}
        handleCloseClick={handleAddNewAdminCloseClick}
        report={report}
      />
      <Card>
        <WriterList
          drawerFlag={drawerFlag}
          parentCloseCallback={handleAddNewAdminCloseClick}
          parentCallback={handleAddNewAdminClick}
          setReport={setReport}
        />
      </Card>
    </>
  );
};

export default WriterLists;
