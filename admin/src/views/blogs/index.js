import React, { useEffect, useState } from "react";
import BlogList from "./components/ListBlog";
import { Button, Card } from "components/ui";
import useThemeClass from "utils/hooks/useThemeClass";
import { HiPlusCircle } from "react-icons/hi";
import {
  CONFIGURATION_PREFIX_PATH,
  BLOGS_PREFIX_PATH,
  BLOG_ADD_PREFIX_PATH,
} from "constants/route.constant";
import { useNavigate } from "react-router-dom";
import { PAGESIZE } from "constants/pagination.constant";
import { getAllBlogs } from "service/blogService";

const Blogs = () => {
  const navigateTo = useNavigate();
  const { textTheme } = useThemeClass();
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [pagination, setPagination] = useState({
    total: "",
    currentPage: 1,
  });

  const getAllBlogData = async () => {
    setLoading(true);
    try {
      let payload = {
        perPage: PAGESIZE,
        pageNo: pagination.currentPage,
      };

      console.log("Making API call with payload:", payload);
      const resp = await getAllBlogs(payload);
      console.log("Received API response:", resp);

      if (resp.success) {
        setBlogData(resp.data);

        setPagination({
          ...pagination,
          total: resp.pagination.count,
        });

        console.log("Updated pagination state:", pagination);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current page changed, fetching data...");
    getAllBlogData();
  }, [pagination?.currentPage]);

  console.log("pagination", pagination);

  return (
    <>
      <Card bordered className="mb-4">
        <div>
          <div className="flex items-center justify-between">
            <div className={`text-xl font-bold ${textTheme}`}>Blogs</div>
            <div>
              <Button
                variant="solid"
                block
                size="sm"
                icon={<HiPlusCircle />}
                onClick={() =>
                  navigateTo(`${BLOGS_PREFIX_PATH}${BLOG_ADD_PREFIX_PATH}`)
                }
              >
                Create Blog
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <BlogList
        blogData={blogData}
        setBlogData={setBlogData}
        loading={loading}
        pagination={pagination}
        setPagination={setPagination}
        getAllBlogData={getAllBlogData}
      />
    </>
  );
};

export default Blogs;
