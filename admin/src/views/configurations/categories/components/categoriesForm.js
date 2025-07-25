import {
  Button,
  Drawer,
  FormContainer,
  FormItem,
  Input,
  Notification,
  toast,
} from "components/ui";
import { Field, Formik, Form } from "formik";
import React from "react";
import { AiOutlineSave } from "react-icons/ai";
import { addCategory, updateCategory } from "service/configService";
import { CategoriesSchema } from "validations/configurations/categorySchema";

const CategoriesForm = (props) => {
  const { isOpen, onClose, setFlag, type = "add", data = {} } = props;
  console.log("data", data);
  const onSave = async (values, setSubmitting) => {
    setSubmitting(true);

    const payload = {
      categoryName: values?.categoryName,
    };

    try {
      let resp;

      if (type === "edit") {
        resp = await updateCategory(data?._id, payload);
      } else {
        resp = await addCategory(payload);
      }

      if (resp.success) {
        toast.push(
          <Notification
            title={resp.message}
            type="success"
            duration={1500}
          ></Notification>,
          {
            placement: "top-center",
          }
        );
        onClose();
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
        {
          placement: "top-center",
        }
      );
    } finally {
      setSubmitting(false);
      setFlag(true);
    }
  };

  return (
    <>
      <Drawer
        title={`${type === "edit" ? "Edit" : "Add"} Blog Category`}
        isOpen={isOpen}
        onClose={onClose}
        onRequestClose={onClose}
        placement="right"
        width={400}
      >
        <Formik
          initialValues={{
            categoryName: data?.categoryName,
            // translation_de_categoryName: data?.translation?.de?.categoryName,
          }}
          validationSchema={CategoriesSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await onSave(values, setSubmitting);
          }}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <Form>
              <FormContainer>
                <FormItem
                  className="mb-8"
                  label="Category Name*"
                  invalid={errors.categoryName && touched.categoryName}
                  errorMessage={"Blog Category Required"}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="categoryName"
                    placeholder="Category"
                    component={Input}
                    value={values.categoryName}
                  />
                </FormItem>
                

                <div className="flex justify-end items-center">
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    icon={<AiOutlineSave />}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};

export default CategoriesForm;

// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// import { Input, Button, Drawer } from "components/ui";
// import api from "service/api";
// import openNotification from "common/notification";
// import BlogCategoryValidation from "./blogCategoryValidation";
// import DisplayError from "common/displayError";

// function BlogCategoryForm(props) {
//   const { handleCloseClick, report, isOpen } = props;
//   const themeColor = useSelector((state) => state?.theme?.themeColor);
//   const primaryColorLevel = useSelector(
//     (state) => state?.theme?.primaryColorLevel
//   );

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     blog_category_id: "",
//     name: "",
//   });
//   const resetFormData = () => {
//     setFormData({
//       ...report,
//       blog_category_id: "",
//       name: "",
//     });
//   };
//   const [errorData, setErrorData] = useState({
//     blog_category_id: "",
//     name: "",
//   });
//   const resetErrorData = () => {
//     setErrorData({
//       ...errorData,
//       blog_category_id: "",
//       name: "",
//     });
//   };

//   useEffect(() => {
//     if (report) {
//       setFormData({
//         ...formData,
//         blog_category_id: report.blog_category_id
//           ? report.blog_category_id
//           : "",
//         name: report.name ? report.name : "",
//       });
//     }
//   }, [report]);

//   const addUpdateBlogCategory = async (data) => {
//     try {
//       setLoading(true);
//       const response = await api.post(
//         `admin/cms/blog-category`,
//         data
//       );

//       if (response.status) {
//         openNotification("success", response.message);
//         setLoading(false);
//         resetErrorData();
//         resetFormData();
//         handleCloseClick();
//       } else {
//         setLoading(false);
//         // resetErrorData();
//         // resetFormData();
//         openNotification("danger", response.message);
//       }
//     } catch (error) {
//       openNotification("danger", error.message);
//       setLoading(false);
//     } finally {
//       // setDrawerFlag(()=>!isOpen);
//     }
//   };

//   const handleSubmit = async () => {
//     const infoData = {
//       blog_category_id: formData ? formData.blog_category_id : "",
//       name: formData ? formData.name : "",
//     };

//     const errorStatus = await BlogCategoryValidation(infoData);
//     if (errorStatus.errorStatus) {
//       setErrorData(errorStatus);
//     } else {
//       await addUpdateBlogCategory(infoData);
//       // resetFormData();
//     }
//   };

//   return (
//     <>
//       <Drawer
//         title={
//           <div
//             className={`text-xl font-semibold text-${themeColor}-${primaryColorLevel}`}
//           >
//             {report ? "Update Blog Category" : "Add Blog Category"}
//           </div>
//         }
//         isOpen={isOpen}
//         width={500}
//         onClose={() => {
//           resetErrorData();
//           resetFormData();
//           handleCloseClick();
//         }}
//         onRequestClose={() => {
//           resetErrorData();
//           resetFormData();
//           handleCloseClick();
//         }}
//         footer={
//           <div className="flex w-full justify-between items-center">
//             <div>
//               {report?._id && (
//                 <Button
//                   type="reset"
//                   onClick={() => {
//                     resetErrorData();
//                     resetFormData();
//                   }}
//                 >
//                   Reset
//                 </Button>
//               )}
//             </div>
//             <Button
//               className="white-spinner"
//               variant="solid"
//               onClick={handleSubmit}
//               loading={loading}
//             >
//               {report ? "Update" : "Submit"}
//             </Button>
//           </div>
//         }
//         headerClass="items-start bg-gray-100 dark:bg-gray-700"
//         footerClass="border-t-2 p-3"
//       >
//         <div className="py-2">
//           <div className={`font-semibold mb-2  `}>Name*</div>
//           <div className="col-span-2">
//             <Input
//               type="text"
//               autoComplete="off"
//               placeholder="Please Enter Name"
//               invalid={errorData?.name ? true : false}
//               value={formData?.name}
//               onChange={(e) => {
//                 setFormData({
//                   ...formData,
//                   name: e.target.value,
//                 });
//               }}
//             />
//             {DisplayError(errorData?.name)}
//           </div>
//         </div>

//       </Drawer>
//     </>
//   );
// }

// export default BlogCategoryForm;
