import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import "animate.css";
import { useMediaQuery } from "react-responsive";
import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// import PageTitle from "components/shared/pageTitle";
import BlogGrid from "./blogGrid";
// import { SectionTitle } from "components/shared"
import { Button, Spinner, } from "../../../components/ui";
// import { formatDateToDDMMMYYYY } from "../../../utils/functions/dateFormat"
import { getBlogDetails, getRelatedBlogs } from "../../../services/blogsServices";

import { FaCalendar } from "react-icons/fa";


const BlogDetails = () => {
    // const selectedLanguage = useSelector((state) => state?.language?.language?.selectedLanguage);
    const { slug } = useParams();
    const isDesktopScreen = useMediaQuery({ minWidth: 1280 })
    const [apiFlag, setApiFlag] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    // console.log("🚀 ~ isLoading:", isLoading)
    const [blogDetails, setBlogDetails] = useState(null)
    // console.log("🚀 ~ blogDetails:", blogDetails)
    const [activeTab, setActiveTab] = useState("");
    // console.log("🚀 ~ activeTab:", activeTab)
    const [relatedApiFlag, setRelatedApiFlag] = useState(false)
    const [relatedIsLoading, setRelatedIsLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    const [pagination, setPagination] = useState({
        page_no: 1,
        page_per: 4,
        total: 0
    })

    const handleShowMoreClick = () => {
        setPagination({
            ...pagination,
            page_no: pagination.page_no + 1
        })
    };


    const fetchBlogDetailsData = async () => {
        try {
            setIsLoading(true);
            const response = await getBlogDetails(slug);
            // console.log("🚀 ~ fetchBlogsData ~ response:", response)
            if (response.status) {
                setBlogDetails(response.data.getByBlogSlug);
                setActiveTab(response?.data?.getByBlogSlug?.blog_categories[0]?.value)
                // setRelatedBlogs(response.data.relatedBlog);
            }
        } catch (error) {
            // console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (apiFlag) {
            fetchBlogDetailsData();
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setApiFlag(false)
        }
    }, [apiFlag]);
    useEffect(() => {
        setApiFlag(true);
    }, []);
    useEffect(() => {
        setApiFlag(true);
    }, [window.location.pathname]);
    // useEffect(() => {
    //     setActiveTab(blogDetails?.blog_categories[0]?.value)
    // }, [blogDetails])

    const fetchRelatedBlogs = async () => {
        try {
            setRelatedIsLoading(true);
            let blogParam = activeTab
            let infoData = {
                page_no: pagination?.page_no,
                page_per: pagination?.page_per,
            }
            const response = await getRelatedBlogs(blogParam, infoData);
            // console.log("🚀 ~ fetchRelatedBlogs ~ response:", response)
            if (response.status) {
                const totalData = relatedBlogs?.length ? relatedBlogs.concat(response?.data) : response?.data;
                setRelatedBlogs(totalData);
                setPagination({
                    ...pagination,
                    total: response?.meta?.pagination?.total
                });
            }
        } catch (error) {
            // console.log(error.message);
        } finally {
            setRelatedIsLoading(false);
        }
    }
    useEffect(() => {
        if (relatedApiFlag) {
            fetchRelatedBlogs();
            setRelatedApiFlag(false)
        }
    }, [relatedApiFlag]);
    useEffect(() => {
        if (activeTab !== "" && activeTab !== undefined) {
            setRelatedApiFlag(true);
        }
    }, [activeTab, pagination?.page_no]);

    // handler for get related blog list 
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setRelatedBlogs();
        setPagination({
            ...pagination,
            page_no: 1,
            page_per: 4,
            total: 0
        })
    };

    return (
        <>
            {isLoading ? (
                <>
                    <div className="h-[100vh]  flex justify-center items-center">
                        <Spinner size="3.25rem" />
                    </div>
                </>
            ) : blogDetails ? (
                <>
                    {/*------ Section-1 Recent blog section -------*/}
                    <div className="container animate__animated animate__fadeIn">
                        {/* <div className="hidden lg:block">
                            <PageTitle title={selectedLanguage?.code === "EN" ? "Blog Details" : "બ્લોગ વિગતો"} />
                        </div>
                        <div className="py-10 lg:hidden">
                            <SectionTitle title={selectedLanguage?.code === "EN" ? "Blog Details" : "બ્લોગ વિગતો"} />
                        </div> */}
                        <div>
                            <div className="font-syne font-semibold text-xl text-[#003A7B] lg:pt-20 lg:text-4xl">
                                <span>{blogDetails?.blog_title}</span>
                                <img
                                    src={blogDetails?.blog_image}
                                    className="w-full pt-5 md:h-[600px] md:object-cover lg:pt-10"
                                    alt="blogImg"
                                />
                            </div>
                            <div className="flex flex-wrap gap-5 py-5  sm:gap-10 sm:py-10 ">
                                <div className="flex items-center gap-3 ">
                                    <span className="text-[#003A7B]">
                                        <FaCalendar size={isDesktopScreen ? 24 : 20} />
                                    </span>
                                    {/* <span className="font-outfit font-normal text-sm text-[#003A7B] lg:text-lg">
                                        {formatDateToDDMMMYYYY(blogDetails?.publish_date)}
                                    </span> */}
                                </div>
                                <div className="flex items-center gap-3">
                                    <img
                                        className="w-8 h-8 rounded-full xl:w-10 xl:h-10"
                                        src={blogDetails?.writerImage}
                                        alt="writerImg"
                                    />
                                    <span className="font-outfit font-normal  text-sm text-[#003A7B] lg:text-lg">
                                        {blogDetails?.writerName}
                                    </span>
                                </div>
                            </div>
                            <div className="font-outfit font-medium text-base flex flex-wrap items-center gap-5 xl:gap-10 ">
                                {blogDetails?.blog_categories?.map((category) => {
                                    // console.log("🚀 ~ {blogDetails?.blog_categories?.map ~ category:",blogDetails?.blog_categories[0]?.value)
                                    return (
                                        <>
                                            <div className="font-syne font-medium ">
                                                {/* Tab buttons */}
                                                <Button
                                                    size={isDesktopScreen ? "lg" : "xs"}
                                                    className={`${activeTab === `${category?.value}` ? "activeTabButton" : "inactiveTabButton"}`}
                                                    onClick={() => handleTabClick(`${category?.value}`)}
                                                >
                                                    {category?.label}
                                                </Button>

                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                            <div className="py-5 lg:py-10">
                                {parse(blogDetails?.blog_content)}
                            </div>
                            <div>
                                <BlogGrid
                                    // title={selectedLanguage?.code === "EN" ? "Related Blogs" : "સંબંધિત બ્લોગ્સ"}
                                    titleClass="py-5"
                                    cards={relatedBlogs}
                                    pagination={pagination}
                                    setPagination={setPagination}
                                // blogsIsLoading={relatedIsLoading}
                                />

                                <div className={`font-syne text-lg w-full flex justify-center font-bold rounded-md py-5`}>
                                    {relatedBlogs?.length > 0 && pagination?.total > pagination?.page_per && relatedBlogs?.length !== pagination?.total && (<>
                                        <Button
                                            variant="solid"
                                            className={``}
                                            size="lg"
                                            // loading={showMoreIsLoading}
                                            onClick={handleShowMoreClick}
                                        >
                                            {/* {selectedLanguage?.code === "EN" ? "Show More" : "વધુ બતાવો"} */}
                                        </Button>
                                    </>)}
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="h-[100vh]  flex justify-center items-center">
                        <h1>No data found</h1>
                    </div>
                </>
            )}
            <style jsx>{`
        .activeTabButton {
          background-color: #003a7b;
          color: white;
        }
        .activeTabButton:hover {
          color: white;
        }
        .inactiveTabButton {
          background-color: #ffffff;
          color: #003a7b;
        }
        .inactiveTabButton:hover {
          color: #003a7b;
        }
      `}</style>
        </>
    );
};

export default BlogDetails;
