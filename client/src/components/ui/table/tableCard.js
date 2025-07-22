import React, { useEffect, useState } from "react";

import { FaFilePdf, FaMinus, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const TableCard = ({ ...props }) => {
  const { tableData, country } = props
  // console.log("🚀 ~ country:", country)
  const selectedLanguage = useSelector((state) => state?.language?.language?.selectedLanguage);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {/* Web side table  */}

      <div className="hidden overflow-x-auto md:block  md:border md:border-[#003A7B] md:rounded-md ">
        <table className="min-w-full ">
          <thead className="bg-[#003A7B] font-outfit text-2xl ">
            <tr className="divide-x divide-[#F0F7FF]">
              <th
                scope="col"
                className="px-6 py-3 text-center  font-medium text-[#FFFFFF] uppercase tracking-wider"
              >
                {selectedLanguage?.code === "EN" ? "Report Details" : "રિપોર્ટ વિગતો"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center  font-medium text-[#FFFFFF] uppercase tracking-wider"
              >
                {selectedLanguage?.code === "EN" ? "Report" : "રિપોર્ટ"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center font-medium text-[#FFFFFF] uppercase tracking-wider"
              >
                {selectedLanguage?.code === "EN" ? "View PDF" : "PDF"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center  font-medium text-[#FFFFFF] uppercase tracking-wider"
              >
                {selectedLanguage?.code === "EN" ? "Price" : "કિંમત"}
              </th>
            </tr>
          </thead>

          <tbody className="bg-[#F0F7FF] divide-y divide-[#003A7B]">
            {tableData && tableData?.map((item) => (
              <React.Fragment key={item.service_category_id}>
                <tr>
                  <td
                    className="px-6 font-outfit py-4 border-[#003A7B] border-r-1 whitespace-nowrap text-2xl font-medium text-[#003A7B]"
                    rowSpan={item.report_list.length + 1}
                  >
                    {selectedLanguage?.code === "EN" ? item?.service_category_name : item?.translation?.guj?.service_category_name}
                  </td>
                </tr>

                {/* Render sub-reports */}
                {item?.report_list?.map((report, index) => (
                  <tr key={`${report?.report_id}-sub-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap border-x border-[#003A7B] text-center font-medium text-lg text-[#003A7B] font-outfit">
                      {selectedLanguage?.code === "EN" ? report?.report_name : report?.translation?.guj?.report_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-x border-[#003A7B] text-center font-medium text-lg text-[#003A7B] font-outfit">
                      <div className="flex justify-center">
                        <a href={report.sample_report} target="_blank" download>
                          <FaFilePdf size={25} />
                        </a>
                      </div>
                    </td>
                    <td className="flex justify-center px-6 py-4 whitespace-nowrap border-x text-center text-lg text-[#003A7B] cursor-pointer hover:text-blue-800">
                      {country === "India" ? report?.report_price.find((item) => item.currency === "₹") ? `${report?.report_price.find((item) => item.currency === "₹")?.currency} ${report?.report_price.find((item) => item.currency === "₹")?.price}` : `${report?.report_price.find((item) => item.currency === "$")?.currency} ${report?.report_price.find((item) => item.currency === "$")?.price}` : `${report?.report_price.find((item) => item.currency === "$")?.currency} ${report?.report_price.find((item) => item.currency === "$")?.price}`}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>

        </table>
      </div >

      {/* Mobile side card  */}
      <div className="md:hidden block xs:px-0 px-5">
        <div className="w-full">
          {tableData && tableData?.map((item, index) => {
            // console.log("🚀 ~ {tableData&&tableData?.map ~ item:", item)
            return (
              <div key={item?.service_category_id} className="border mb-5 bg-[#003A7B] rounded-xl">
                {/* Accordion Header */}
                <div
                  className="flex justify-between p-4 cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className=" text-lg font-outfit font-medium text-white xs:text-xl">
                    {selectedLanguage?.code === "EN" ? item?.service_category_name : item?.translation?.guj?.service_category_name}
                  </div>
                  <div className="text-white flex items-center">
                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                  </div>
                </div>
                {/* Accordion Content */}
                {activeIndex === index && (
                  <div className="p-4 bg-[#ffffff]  flex flex-col font-outfit font-medium  text-base text-[#003A7B] justify-between rounded-b-xl xs:text-lg">
                    {/* Subcategory Content */}
                    {item?.report_list && item?.report_list?.length > 0 && (
                      <div>
                        {item?.report_list?.map((report, reportIndex) => (
                          <>
                            <div
                              key={`${report?.report_id}-sub-${reportIndex}`}
                              className="flex justify-between items-center "
                            >
                              <p className="pb-2">
                                {selectedLanguage?.code === "EN" ? report?.report_name : report?.translation?.guj?.report_name} : {country === "India" ? report?.report_price.find((item) => item.currency === "₹") ? `${report?.report_price.find((item) => item.currency === "₹")?.currency} ${report?.report_price.find((item) => item.currency === "₹")?.price}` : `${report?.report_price.find((item) => item.currency === "$")?.currency} ${report?.report_price.find((item) => item.currency === "$")?.price}` : `${report?.report_price.find((item) => item.currency === "$")?.currency} ${report?.report_price.find((item) => item.currency === "$")?.price}`}
                              </p>
                              <div className="flex justify-center">
                                <a href={report?.sample_report} target="_blank" download>
                                  <FaFilePdf size={25} />
                                </a>
                              </div>
                            </div>
                            {item?.report_list?.length !== reportIndex + 1 && (
                              <div className="flex justify-center pb-2">
                                <div className="flex justify-center border-b-1 w-[95%] bg-slate-300 h-[1px]"></div>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          }
          )}
        </div>
      </div>
    </>
  );
};

export default TableCard;
