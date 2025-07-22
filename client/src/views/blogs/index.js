import React, { useEffect, useState } from "react";

// import { useSelector } from "react-redux";
import PageTitle from "../../components/shared/pageTitle";
import BlogGrid from "./components/blogGrid";
import { getBlogs } from "../../services/blogsServices";
import { Button, Spinner } from "../../components/ui";
// import NoData from "views/noData";

const Blogs = () => {
  // const selectedLanguage = useSelector((state) => state?.language?.language?.selectedLanguage);
  const [blogData, setBlogData] = useState();
  console.log("🚀 ~ Blogs ~ blogData:", blogData);
  // console.log("🚀 ~ Blogs ~ blogData.length:", blogData?.length)
  const [pagination, setPagination] = useState({
    page_no: 1,
    page_per: 4,
    total: 0,
  });
  // console.log("🚀 ~ Blogs ~ pagination:", pagination?.total)
  const [apiFlag, setApiFlag] = useState(false);
  const [blogsIsLoading, setBlogsIsLoading] = useState(false);

  // console.log("🚀 ~ Blogs ~ blogData12345:", blogData?.length > 0 && pagination?.total > pagination?.page_per && blogData?.length !== pagination?.total)

  const fetchBlogsData = async () => {
    try {
      setBlogsIsLoading(true);
      const formData = {
        page_no: pagination?.page_no,
        page_per: pagination?.page_per,
      };
      const response = await getBlogs(formData);
      console.log("🚀 ~ fetchBlogsData ~ response:", response);
      if (response.success) {
        const totalData = blogData?.length
          ? blogData.concat(response?.data)
          : response?.data;
        setBlogData(totalData);
        setPagination({
          ...pagination,
          total: response?.pagination?.count,
        });
      } else {
        // console.log(response.message);
      }
    } catch (error) {
      // console.log(error.message);
    } finally {
      setBlogsIsLoading(false);
      setApiFlag(false);
    }
  };

  useEffect(() => {
    if (apiFlag) {
      fetchBlogsData();
    }
  }, [apiFlag]);
  useEffect(() => {
    setApiFlag(true);
  }, [pagination?.page_no]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleShowMoreClick = () => {
    setPagination({
      ...pagination,
      page_no: pagination.page_no + 1,
    });
  };

  return (
    <>
      {blogsIsLoading && pagination?.page_no == 1 ? (
        <>
          <div className="h-[100vh]  flex justify-center items-center">
            <Spinner size="3.25rem" />
          </div>
        </>
      ) : blogData?.length > 0 ? (
        <>
          <div className="container">
            <div className="hidden lg:block">
              <PageTitle title={"Blogs"} />
            </div>
            <div>
              <BlogGrid
                title={"Recent Blogs"}
                titleClass="py-10"
                cards={blogData}
                pagination={pagination}
                setPagination={setPagination}
                // blogsIsLoading={blogsIsLoading}
              />
              <div
                className={`font-syne text-lg w-full flex justify-center font-bold rounded-md py-5`}
              >
                {blogData?.length > 0 &&
                  pagination?.total > pagination?.page_per &&
                  blogData?.length !== pagination?.total && (
                    <>
                      <Button
                        variant="solid"
                        className={``}
                        size="lg"
                        loading={apiFlag}
                        onClick={handleShowMoreClick}
                      >
                        Show More
                      </Button>
                    </>
                  )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-[100vh]  flex justify-center items-center">
            <h1>No data found</h1>
            {/* <NoData/> */}
          </div>
        </>
      )}
    </>
  );
};

export default Blogs;
