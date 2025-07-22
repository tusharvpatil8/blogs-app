import NoDataFound from "components/template/NoDataFound";
import { ConfirmDialog } from "components/shared";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Notification,
  Pagination,
  Spinner,
  Switcher,
  Table,
  toast,
} from "components/ui";
import TBody from "components/ui/Table/TBody";
import Td from "components/ui/Table/Td";
import Th from "components/ui/Table/Th";
import THead from "components/ui/Table/THead";
import Tr from "components/ui/Table/Tr";
import { PAGESIZE } from "constants/pagination.constant";
import {
  BLOG_EDIT_PREFIX_PATH,
  BLOGS_PREFIX_PATH,
} from "constants/route.constant";
import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineSearch, HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { deleteBlog, updateBlogPublishedStatus } from "service/blogService";
import { useSelector } from "react-redux";

// import authApi from 'service/authApi';
// import { deleteBlog } from 'service/configService';

const columns = [
  { _id: 1, name: "Blog Image" },
  { _id: 2, name: "Title" },
  { _id: 3, name: "Category" },
  // { _id: 4, name: 'Content' },
  { _id: 4, name: "Read Time" },
  { _id: 5, name: "Publish Date" },
  { _id: 6, name: "Published" },
  { _id: 7, name: "Action" },
];

const BlogList = ({
  blogData,
  setBlogData,
  loading,
  getAllBlogData,
  pagination,
  setPagination,
}) => {
  const navigateTo = useNavigate();
  const [selectedData, setSelectedData] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPublishedOpen, setIsPublishedOpen] = useState(false);
  const themeColor = useSelector((state) => state?.theme?.themeColor);
 const primaryColorLevel = useSelector(
    (state) => state?.theme?.primaryColorLevel
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(/ /g, " ");
  };

  const handleUpdateBlogPublishedStatus = async () => {
    try {
      const resp = await updateBlogPublishedStatus(selectedData?._id);
      if (resp?.success) {
        const updatedBlogList = blogData.map((blog) => {
          if (blog?.data?.id === selectedData?.data?.id) {
            return { ...blog, published: !blog.published };
          }
          return blog;
        });
        setBlogData(updatedBlogList);

        toast.push(
          <Notification
            title={`Blog Published Status Updated Successfully`}
            type="success"
            duration={1500}
          ></Notification>,
          {
            placement: "top-center",
          }
        );
        // setApiFlag(true);
      }
    } catch (err) {
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
          placement: "top-center",
        }
      );
    } finally {
      setIsPublishedOpen(false);
      getAllBlogData();
    }
  };

  const onDelete = async () => {
    try {
      const resp = await deleteBlog(selectedData?._id);
      if (resp?.success) {
        toast.push(
          <Notification
            title={resp.message}
            type="success"
            duration={1500}
          ></Notification>,
          { placement: "top-center" }
        );
      }
    } catch (err) {
      console.log("err", err);
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
        { placement: "top-center" }
      );
    } finally {
      setIsDeleteOpen(false);
      getAllBlogData();
    }
  };

  return (
    <>
     <div className="grid grid-cols-6 gap-4 mb-4">
        <div className="flex col-start-1 col-end-3 gap-2 ">
          {/* <div
            className={`w-auto  text-center rounded-lg font-bold bg-${themeColor}-50 text-${themeColor}-${primaryColorLevel} text-base
                         dark:bg-gray-700 px-4 border border-${themeColor}-${primaryColorLevel} py-2 px-2`}
          >
            {resultTitle}
          </div> */}
        <Input
          placeholder="Search By Blog Title"
          className="col-end-7 col-span-2"
          // value={searchText}
          prefix={
            <HiOutlineSearch
              className={`text-xl text-${themeColor}-${primaryColorLevel}`}
            />
          }
          onChange={(e) => {
            // setSearchText(e.target.value);
          }}
          // suffix={
          //   searchText && (
          //     <AiOutlineClose
          //       className={`text-xl text-${themeColor}-${primaryColorLevel}`}
          //       onClick={() => {
          //         setSearchText("");
          //       }}
          //     />
          //   )
          // }
        />
        </div>

      </div>

      <Card bordered className="mb-4">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Spinner />
          </div>
        ) : (
          <Table>
            <THead>
              <Tr>
                {columns?.map((item) => {
                  return (
                    <Th key={item._id}>
                      <span>{item.name}</span>
                    </Th>
                  );
                })}
              </Tr>
            </THead>
            <TBody>
              {blogData.map((blog, index) => {
                return (
                  <Tr
                    key={blog?._id}
                    className={index % 2 !== 0 ? "bg-red-50" : "bg-white"}
                  >
                    <Td>
                      <Avatar
                        shape="circle"
                        src={blog.thumbnailImage}
                        alt={blog.title}
                        size="lg"
                      />
                    </Td>
                    <Td>{blog.title}</Td>
                    <Td>
                      {blog?.blog_categories?.length > 0 ? (
                        blog.blog_categories.map((item) => (
                          <div
                            key={item.value}
                            className="flex items-center gap-2"
                          >
                            <Badge className="bg-gray-400" />
                            {item.label}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-500">
                          No categories available
                        </span>
                      )}
                    </Td>

                    {/* <Td>{blog.content}</Td> */}
                    <Td>{blog.readTime}</Td>
                    <Td>{formatDate(blog.publishedDate)}</Td>
                    <Td>
                      <div className="flex justify-start text-lg">
                        <Switcher
                          checked={blog?.published}
                          onClick={() => {
                            setSelectedData(blog);
                            setIsPublishedOpen(true);
                          }}
                          // onChange={() => {
                          //   handleUpdateBlogPublishedStatus(blog);
                          // }}
                        />
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
                          onClick={() =>
                            navigateTo(
                              `${BLOGS_PREFIX_PATH}${BLOG_EDIT_PREFIX_PATH}/${blog?._id}`
                            )
                          }
                        ></Button>

                        {!blog.published && (
                          <Button
                            className={`cursor-pointer p-2 hover:text-blue-500`}
                            shape="circle"
                            variant="solid"
                            icon={<HiOutlineTrash />}
                            size="sm"
                            onClick={() => {
                              setSelectedData(blog);
                              setIsDeleteOpen(true);
                            }}
                          ></Button>
                        )}
                      </div>
                    </Td>
                  </Tr>
                );
              })}
            </TBody>
          </Table>
        )}
        {blogData.length === 0 && <NoDataFound />}

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
            }}
          />
        </div>
      </Card>

      {/* Published Dialogue */}
      <ConfirmDialog
        isOpen={isPublishedOpen}
        onClose={() => setIsPublishedOpen(false)}
        onRequestClose={() => setIsPublishedOpen(false)}
        type="danger"
        title={`Published ${selectedData?.title} Permanently?`}
        onCancel={() => setIsPublishedOpen(false)}
        onConfirm={handleUpdateBlogPublishedStatus}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to Published this blog? This action cannot be
          undone.
        </p>
      </ConfirmDialog>

      {/* Delete Dialogue */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onRequestClose={() => setIsDeleteOpen(false)}
        type="danger"
        title={`Delete ${selectedData?.title} Permanently?`}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={onDelete}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this blog? This action cannot be
          undone.
        </p>
      </ConfirmDialog>
    </>
  );
};

export default BlogList;
