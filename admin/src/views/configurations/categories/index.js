import { Button, Card } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import useThemeClass from 'utils/hooks/useThemeClass';
import CategoriesForm from './components/categoriesForm';
import CategoriesList from './components/categoriesList';
import { PAGESIZE } from 'constants/pagination.constant';
import { getAllCategory } from 'service/configService';

const Categories = () => {
  const { textTheme } = useThemeClass();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [pagination, setPagination] = useState({
    total: '',
    currentPage: 1,
  });

  useEffect(() => {
    setFlag(true);
  }, []);

  const getCategoryData = async () => {
    setLoading(true);
    try {
      const payload = {
        perPage: PAGESIZE,
        pageNo: pagination?.currentPage,
      };

      const resp = await getAllCategory(
        'status',
        payload?.pageNo,
        payload?.perPage
      );
      if (resp?.success) {
        setCategoryData(resp?.data);
        setPagination({
          ...pagination,
          currentPage: resp.pagination?.pageNo,
          total: resp.pagination?.count,
        });
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (flag) {
      setFlag(false);
      getCategoryData();
    }
  }, [flag]);

  return (
    <>
      <Card bordered className="mb-4">
        <div className="flex items-center justify-between">
          <div className={`text-xl font-bold ${textTheme}`}>Blog Category</div>
          <div>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="solid"
              block
              size="sm"
              icon={<HiPlusCircle />}
            >
              Add Blog Category
            </Button>
          </div>
        </div>
      </Card>

      <CategoriesForm
        type="add"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setFlag={setFlag}
      />
      <CategoriesList
        loading={loading}
        categoryData={categoryData}
        setFlag={setFlag}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

export default Categories;


// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// import { Button, Card } from "components/ui";
// import { HiPlusCircle } from "react-icons/hi";
// import CategoriesForm from "./components/categoriesForm";
// import CategoriesList from "./components/categoriesList";

// const Categories = () => {
//   const themeColor = useSelector((state) => state?.theme?.themeColor);
//   const primaryColorLevel = useSelector(
//     (state) => state?.theme?.primaryColorLevel
//   );

//   const [report, setReport] = useState({
//     blog_category_id: "",
//     name: "",
//     slug_url: "",
//   });
//   const [drawerFlag, setDrawerFlag] = useState(false);

//   const handleAddNewAdminClick = () => {
//     setDrawerFlag(true);
//   };
//   const handleAddNewAdminCloseClick = () => {
//     setReport(null);
//     setDrawerFlag(false);
//   };

//   return (
//     <>
//       <Card className="mb-4">
//         <div className="flex items-center justify-between">
//           <div
//             className={`text-xl font-semibold text-${themeColor}-${primaryColorLevel} dark:text-white`}
//           >
//             Blog Category
//           </div>
//           <div>
//             <Button
//               size="sm"
//               variant="solid"
//               icon={<HiPlusCircle color={"#fff"} />}
//               onClick={async () => {
//                 handleAddNewAdminCloseClick();
//                 setReport();
//                 setTimeout(() => {
//                   handleAddNewAdminClick();
//                 }, 50);
//               }}
//             >
//               Add Blog Category
//             </Button>
//           </div>
//         </div>
//       </Card>

//       <CategoriesForm
//         isOpen={drawerFlag}
//         handleCloseClick={handleAddNewAdminCloseClick}
//         report={report}
//       />
//       <Card>
//         <CategoriesList
//           drawerFlag={drawerFlag}
//           parentCloseCallback={handleAddNewAdminCloseClick}
//           parentCallback={handleAddNewAdminClick}
//           setReport={setReport}
//         />
//       </Card>
//     </>
//   );
// };

// export default Categories;
