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
      // translation: {
      //   de: {
      //     categoryName: values?.translation_de_categoryName,
      //   },
      // },
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
                  label="Category *"
                  invalid={errors.categoryName && touched.categoryName}
                  errorMessage={errors.categoryName}
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
                {/* 
                <FormItem
                  className="mb-8"
                  label="Category (German)"
                  invalid={
                    errors.translation_de_categoryName &&
                    touched.translation_de_categoryName
                  }
                  errorMessage={'Required'}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="translation_de_categoryName"
                    placeholder="Category in German"
                    component={Input}
                    value={values.translation_de_categoryName}
                  />
                </FormItem> */}

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
