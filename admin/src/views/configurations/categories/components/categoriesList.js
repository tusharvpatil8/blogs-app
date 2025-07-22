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
                    className={index % 2 !== 0 ? 'bg-red-50' : 'bg-white'}
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
