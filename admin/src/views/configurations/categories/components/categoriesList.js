import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Notification,
  Pagination,
  Spinner,
  Table,
  toast,
} from 'components/ui';
import TBody from 'components/ui/Table/TBody';
import THead from 'components/ui/Table/THead';
import Td from 'components/ui/Table/Td';
import Th from 'components/ui/Table/Th';
import Tr from 'components/ui/Table/Tr';
import {
  HiOutlinePencil,
  HiOutlineRefresh,
  HiOutlineTrash,
} from 'react-icons/hi';
import NoDataFound from 'components/template/NoDataFound';
import { PAGESIZE } from 'constants/pagination.constant';
import { deleteCategory, toggleCategoryStatus } from 'service/configService';
import { ConfirmDialog } from 'components/shared';
import CategoriesForm from './categoriesForm';

const columns = [
  {
    _id: 1,
    name: 'Category Name',
  },

  // {
  //   _id: 2,
  //   name: 'Category (German)',
  // },

  {
    _id: 2,
    name: 'Status',
  },

  {
    _id: 3,
    name: 'Action',
  },
];
const CategoriesList = ({
  loading,
  categoryData,
  setFlag,
  pagination,
  setPagination,
}) => {
  const [isToggleStatusOpen, setIsToggleStatusOpen] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const onDelete = async () => {
    try {
      const resp = await deleteCategory(selectedData?._id);

      if (resp?.success) {
        toast.push(
          <Notification
            title={resp.message}
            type="success"
            duration={1500}
          ></Notification>,
          {
            placement: 'top-center',
          }
        );
      }
    } catch (err) {
      console.log('err', err);
      toast.push(
        <Notification
          title={
            err?.response?.data?.error?.message ||
            err?.response?.data?.error ||
            err?.response?.data?.message
          }
          type="danger"
          duration={1500}
        ></Notification>,
        {
          placement: 'top-center',
        }
      );
    } finally {
      setFlag(true);
      setIsDeleteOpen(false);
    }
  };

  const onToggleStatus = async () => {
    try {
      const resp = await toggleCategoryStatus(selectedData?._id);

      if (resp?.success) {
        toast.push(
          <Notification
            title={resp.message}
            type="success"
            duration={1500}
          ></Notification>,
          {
            placement: 'top-center',
          }
        );
      }
    } catch (err) {
      console.log('err', err);
      toast.push(
        <Notification
          title={
            err?.response?.data?.error?.message ||
            err?.response?.data?.error ||
            err?.response?.data?.message
          }
          type="danger"
          duration={1500}
        ></Notification>,
        {
          placement: 'top-center',
        }
      );
    } finally {
      setFlag(true);
      setIsToggleStatusOpen(false);
    }
  };
  return (
    <>
      <Card bordered className="mb-4">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Spinner />
          </div>
        ) : categoryData?.length > 0 ? (
          <Table>
            <THead>
              <Tr>
                {columns.map((item) => {
                  return (
                    <Th key={item._id}>
                      <span>{item.name}</span>
                    </Th>
                  );
                })}
              </Tr>
            </THead>

            <TBody>
              {categoryData?.map((item, index) => {
                return (
                  <Tr
                    key={item?.id}
                    className={index % 2 !== 0 ? 'bg-blue-50' : 'bg-white'}
                  >
                    <Td>{item.categoryName}</Td>
                    {/* <Td>{item?.translation?.de?.categoryName}</Td> */}
                    <Td>
                      <div className="flex justify-start ">
                        {item?.active ? (
                          <div className="flex items-center gap-2">
                            <Badge className="bg-emerald-500" />
                            <span
                              className={`capitalize font-semibold text-emerald-500 `}
                            >
                              Active
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Badge className="bg-red-500" />
                            <span
                              className={`capitalize font-semibold text-red-500`}
                            >
                              Inactive
                            </span>
                          </div>
                        )}
                        <span
                          onClick={() => {
                            setSelectedData(item);
                            setIsToggleStatusOpen(true);
                          }}
                          className={`cursor-pointer p-2 hover:text-blue-500`}
                        >
                          <HiOutlineRefresh />
                        </span>
                      </div>
                    </Td>

                    <Td>
                      <div className="flex space-x-2 text-lg">
                        <Button
                          className={`cursor-pointer p-2 hover:text-blue-500`}
                          shape="circle"
                          variant="solid"
                          icon={<HiOutlinePencil />}
                          size="sm"
                          onClick={() => {
                            setSelectedData(item);
                            setIsEditModalOpen(true);
                          }}
                        ></Button>
                        <Button
                          className={`cursor-pointer p-2 hover:text-blue-500`}
                          shape="circle"
                          variant="solid"
                          icon={<HiOutlineTrash />}
                          size="sm"
                          onClick={() => {
                            setSelectedData(item);
                            setIsDeleteOpen(true);
                          }}
                        ></Button>
                      </div>
                    </Td>
                  </Tr>
                );
              })}
            </TBody>
          </Table>
        ) : (
          <>
            <NoDataFound />
          </>
        )}
        <div className="m-4 p-2 flex items-center justify-between">
          <Pagination
            displayTotal
            pageSize={PAGESIZE}
            total={Number(pagination?.total)}
            currentPage={Number(pagination?.currentPage)}
            onChange={(page) => {
              setPagination({
                ...pagination,
                currentPage: page,
              });
              setFlag(true);
            }}
          />
        </div>

        <>
          <CategoriesForm
            data={selectedData}
            type="edit"
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            setFlag={setFlag}
          />
        </>
        <>
          <ConfirmDialog
            isOpen={isToggleStatusOpen}
            onClose={() => setIsToggleStatusOpen(false)}
            onRequestClose={() => setIsToggleStatusOpen(false)}
            type="danger"
            title={`${selectedData?.active ? 'Remove' : 'Restore'} ${
              selectedData?.categoryName
            }`}
            onCancel={() => setIsToggleStatusOpen(false)}
            onConfirm={onToggleStatus}
            confirmButtonColor="red-600"
          >
            <p>
              Are you sure you want to{' '}
              {selectedData?.active ? 'remove' : 'restore'} this category.
            </p>
          </ConfirmDialog>
        </>
        <>
          <ConfirmDialog
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onRequestClose={() => setIsDeleteOpen(false)}
            type="danger"
            title={`Delete ${selectedData?.categoryName} Permanently ?`}
            onCancel={() => setIsDeleteOpen(false)}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
          >
            <p>
              Are you sure you want to delete this category? This action cannot
              be undone.
            </p>
          </ConfirmDialog>
        </>
      </Card>
    </>
  );
};

export default CategoriesList;

// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// import { Table, Dialog, Button, Pagination } from "components/ui";
// import api from "service/api";
// import openNotification from "common/notification";
// import appConfig from "configs/app.config";
// import { TableRowSkeleton } from "components/shared";
// import { HiOutlinePencil } from "react-icons/hi";
// import { MdDelete } from "react-icons/md";
// import DataNoFound from "assets/svg/dataNoFound";
// import { getAllBlogs } from "service/blogService";
// import { getAllCategory } from "service/configService";

// const { Tr, Th, Td, THead, TBody } = Table;
// const columns = ["Name", "Action"];

// const CategoriesList = (props) => {
//   const { drawerFlag, parentCloseCallback, parentCallback, setReport } = props;
//   const themeColor = useSelector((state) => state?.theme?.themeColor);
//   const primaryColorLevel = useSelector(
//     (state) => state?.theme?.primaryColorLevel
//   );
//   const [blogcategory, setBlogcategory] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [apiFlag, setApiFlag] = useState(false);
//   const [selectObject, setSelectObject] = useState({});
//   const [deleteIsOpen, setDeleteIsOpen] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPage, setTotalPage] = useState(0);
//   const [resultTitle, setResultTitle] = useState(
//     `Result 0 - 0 of 0`
//   );

//   const onPaginationChange = (val) => {
//     setPage(val);
//     setApiFlag(true);
//   };

//   const fetchBlogCategoryList = async () => {
//     try {
//       let InfoData = {
//         page_no: page,
//         page_per: appConfig.pagePerData,
//       };
//       const response = await getAllCategory('status', InfoData);

//       // console.log("🚀 ~ fetchBlogCategoryList ~ response:", response)
//       if (response.status) {
//         setBlogcategory(response?.data?.data);
//         setTotalPage(
//           response.data.count
//             ? Math.ceil(response.data.count / appConfig.pagePerData)
//             : 0
//         );
//         if (response.data.data) {
//           const start = appConfig.pagePerData * (page - 1);
//           const end = start + response.data.data?.length;
//           setResultTitle(
//             `Result ${start ? start + 1 : start} - ${end} of ${response.data.count
//             }`
//           );
//         }
//         setIsLoading(false);
//       } else {
//         openNotification("danger", response.message);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       openNotification("danger", error.message);
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (apiFlag) {
//       setApiFlag(false);
//       setIsLoading(true);
//       fetchBlogCategoryList();
//     }
//   }, [apiFlag]);
//   useEffect(() => {
//     setApiFlag(true);
//   }, []);
//   useEffect(() => {
//     if (!drawerFlag) {
//       setApiFlag(true);
//     }
//   }, [drawerFlag]);

//   const handleDeleteBox = async () => {
//     try {
//       const response = await api.delete(
//         `admin/cms/permanent-delete-blog-category/${selectObject.blog_category_id}`
//       );
//       if (response.status) {
//         openNotification("success", response.message);
//         setApiFlag(true);
//         setDeleteIsOpen(false);
//       } else {
//         openNotification("danger", response.message);
//         setDeleteIsOpen(false);
//       }
//     } catch (error) {
//       // console.log(" error:", error);
//       openNotification("danger", error.message);
//       setDeleteIsOpen(false);
//     }
//   };

//   return (
//     <>
//       <div className="grid grid-cols-6 gap-4 mb-4">
//         <div className="flex col-start-1 col-end-3 gap-2 ">
//           <div
//             className={`w-auto  text-center rounded-lg font-bold bg-${themeColor}-50 text-${themeColor}-${primaryColorLevel} text-base
//                          dark:bg-gray-700 px-4 border border-${themeColor}-${primaryColorLevel} py-2 px-2`}
//           >
//             {resultTitle}
//           </div>
//         </div>
//       </div>
//       <div className="grid grid-cols-6 gap-4 mb-4"></div>

//       <div>
//         {isLoading ? (
//           <>
//             <Table>
//               <THead>
//                 <Tr>
//                   {columns?.map((item) => {
//                     return <Th key={item}>{item}</Th>;
//                   })}
//                 </Tr>
//               </THead>
//               <TableRowSkeleton
//                 avatarInColumns={[1]}
//                 columns={2}
//                 rows={5}
//                 avatarProps={{
//                   width: 30,
//                   height: 30,
//                 }}
//               />
//             </Table>
//           </>
//         ) : blogcategory?.length ? (
//           <>
//             <Table>
//               <THead>
//                 <Tr>
//                   {columns?.map((item) => {
//                     return <Th key={item}>{item}</Th>;
//                   })}
//                 </Tr>
//               </THead>
//               <TBody>
//                 {blogcategory?.map((item, key) => {
//                   return (
//                     <Tr key={item?.blog_category_id}>
//                       <Td>{item?.name}</Td>
//                       <Td>
//                         <div className="flex">
//                           <Button
//                             shape="circle"
//                             variant="solid"
//                             className="mr-2"
//                             size="sm"
//                             icon={<HiOutlinePencil />}
//                             onClick={async () => {
//                               parentCloseCallback();
//                               setReport(item);
//                               setTimeout(() => {
//                                 parentCallback();
//                               }, 50);
//                             }}
//                           />

//                           <Button
//                             shape="circle"
//                             color="red-700"
//                             variant="solid"
//                             size="sm"
//                             icon={<MdDelete size={20} />}
//                             onClick={() => {
//                               setSelectObject(item);
//                               setDeleteIsOpen(true);
//                             }}
//                           />

//                         </div>
//                       </Td>
//                     </Tr>
//                   );
//                 })}
//               </TBody>
//             </Table>
//             <div className="flex items-center justify-center mt-4">
//               <Pagination
//                 total={totalPage}
//                 currentPage={page}
//                 onChange={onPaginationChange}
//               />
//             </div>
//           </>
//         ) : (
//           <>
//             <DataNoFound />
//           </>
//         )
//         }
//       </div >

//       {/* Delete Blog Category Dialog  */}
//       <Dialog isOpen={deleteIsOpen} closable={false}>
//         <h5 className="mb-4">Delete Blog Category</h5>
//         <p>Are you sure you want to permanent delete this Blog Category?</p>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={() => {
//               setDeleteIsOpen(false);
//               setApiFlag(true);
//             }}
//           >
//             Cancel
//           </Button>
//           <Button color="red-700" variant="solid" onClick={handleDeleteBox}>
//            Delete
//           </Button>
//         </div>
//       </Dialog>
//     </>
//   );
// };

// export default CategoriesList;
