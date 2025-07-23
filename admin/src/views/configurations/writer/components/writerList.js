/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Dialog, Button, Pagination } from "components/ui";
import api from "service/api";
import openNotification from "common/notification";
import appConfig from "configs/app.config";
import { TableRowSkeleton } from "components/shared";
import { HiOutlinePencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import DataNoFound from "assets/svg/dataNoFound";

const columns = ["Image", "Writer Name", "Email", "Action"];
const { Tr, Th, Td, THead, TBody } = Table;

const WriterList = (props) => {
  const { drawerFlag, parentCloseCallback, parentCallback, setReport } = props;
  const [writers, setWriters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiFlag, setApiFlag] = useState(false);
  const [selectObject, setSelectObject] = useState({});
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [resultTitle, setResultTitle] = useState(
    `Result 0 - 0 of 0`
  );
  const themeColor = useSelector((state) => state?.theme?.themeColor);
  const primaryColorLevel = useSelector(
    (state) => state?.theme?.primaryColorLevel
  );

  const onPaginationChange = (val) => {
    setPage(val);
    setApiFlag(true);
  };

  const fetchWriterList = async () => {
    try {
      let InfoData = {
        page_no: page,
        page_per: appConfig.pagePerData,
      };
      const response = await api.post(
        `admin/cms/all-writer`,
        InfoData
      );
      // console.log("formData response::", response);
      if (response.status) {
        setWriters(response.data.data);
        setTotalPage(
          response.data.count
            ? Math.ceil(response.data.count / appConfig.pagePerData)
            : 0
        );
        if (response.data.data) {
          const start = appConfig.pagePerData * (page - 1);
          const end = start + response.data.data?.length;
          setResultTitle(
            `Result ${start ? start + 1 : start} - ${end} of ${response.data.count
            }`
          );
        }
        setIsLoading(false);
      } else {
        openNotification("danger", response.message);
        setIsLoading(false);
      }
    } catch (error) {
      openNotification("danger", error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (apiFlag) {
      setApiFlag(false);
      setIsLoading(true);
      fetchWriterList();
    }
  }, [apiFlag]);
  useEffect(() => {
    setApiFlag(true);
  }, []);
  useEffect(() => {
    if (!drawerFlag) {
      setApiFlag(true);
    }
  }, [drawerFlag]);

  const handleDeleteBox = async () => {
    try {
      const response = await api.delete(
        `admin/cms/permanent-delete-writer/${selectObject.writer_id}`
      );
      if (response.status) {
        openNotification("success", response.message);
        setApiFlag(true);
        setDeleteIsOpen(false);
      } else {
        openNotification("danger", response.message);
        setDeleteIsOpen(false);
      }
    } catch (error) {
      // console.log(" error:", error);
      openNotification("danger", error.message);
      setDeleteIsOpen(false);
    }
  };
  return (
    <>
      <div className="grid grid-cols-6 gap-4 mb-4">
        <div className="flex col-start-1 col-end-3 gap-2 ">
          <div
            className={`w-auto  text-center rounded-lg font-bold bg-${themeColor}-50 text-${themeColor}-${primaryColorLevel} text-base
                         dark:bg-gray-700 px-4 border border-${themeColor}-${primaryColorLevel} py-2 px-2`}
          >
            {resultTitle}
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <>
            <Table>
              <THead>
                <Tr>
                  {columns?.map((item) => {
                    return <Th key={item}>{item}</Th>;
                  })}
                </Tr>
              </THead>
              <TableRowSkeleton
                avatarInColumns={[0]}
                columns={4}
                rows={5}
                avatarProps={{
                  width: 30,
                  height: 30,
                }}
              />
            </Table>
          </>
        ) : writers?.length ? (
          <>
            <Table>
              <THead>
                <Tr>
                  {columns?.map((item) => {
                    return <Th key={item}>{item}</Th>;
                  })}
                </Tr>
              </THead>
              <TBody>
                {writers?.map((item, key) => {
                  return (
                    <Tr key={item?.writer_id}>
                      <Td>
                        <img
                          className="border rounded-full object-cover w-14 h-14"
                          src={item?.image}
                          alt=""
                        />
                      </Td>
                      <Td>{item?.writer_name}</Td>
                      <Td>{item?.email}</Td>
                      <Td>
                        <div className="flex">
                          <Button
                            shape="circle"
                            variant="solid"
                            className="mr-2"
                            size="sm"
                            icon={<HiOutlinePencil />}
                            onClick={async () => {
                              parentCloseCallback();
                              setReport(item);
                              setTimeout(() => {
                                parentCallback();
                              }, 50);
                            }}
                          />
                          {
                            <Button
                              shape="circle"
                              color="red-700"
                              variant="solid"
                              size="sm"
                              icon={<MdDelete size={20} />}
                              onClick={() => {
                                setSelectObject(item);
                                setDeleteIsOpen(true);
                              }}
                            />
                          }
                        </div>
                      </Td>
                    </Tr>
                  );
                })}
              </TBody>
            </Table>
            <div className="flex items-center justify-center mt-4">
              <Pagination
                total={totalPage}
                currentPage={page}
                onChange={onPaginationChange}
              />
            </div>
          </>
        ) : (
          <>
            <DataNoFound />
          </>
        )
        }
      </div >
      <Dialog isOpen={deleteIsOpen} closable={false}>
        <h5 className="mb-4">Delete Writer</h5>
        <p>Are you sure you want to permanent delete this Writer?</p>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={() => {
              setDeleteIsOpen(false);
              setApiFlag(true);
            }}
          >
            Cancel
          </Button>
          <Button color="red-700" variant="solid" onClick={handleDeleteBox}>
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default WriterList;
