/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Button, Drawer, Upload } from "components/ui";
import api from "service/api";
import openNotification from "common/notification";
import WriterValidation from "./writerValidation";
import DisplayError from "common/displayError";
import { HiTrash } from "react-icons/hi";
import { BsPlusLg } from "react-icons/bs";

function WriterForm(props) {
  const { handleCloseClick, report, isOpen } = props;
  const themeColor = useSelector((state) => state?.theme?.themeColor);
  const primaryColorLevel = useSelector(
    (state) => state?.theme?.primaryColorLevel
  );

  const [photoUrl, setPhotoUrl] = useState(report ? report.image : "");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    writer_id: "",
    writer_name: "",
    email: "",
    display_name: "",
    writer_alt: "",
    image: "",
  });
  const resetFormData = () => {
    setFormData({
      ...report,
      writer_id: "",
      writer_name: "",
      email: "",
      display_name: "",
      writer_alt: "",
      image: "",
    });
    setPhotoUrl("");
    setPhoto("");
  };
  const [errorData, setErrorData] = useState({
    writer_name: "",
    email: "",
    display_name: "",
    writer_alt: "",
    errorImage: "",
  });
  const resetErrorData = () => {
    setErrorData({
      ...errorData,
      writer_name: "",
      email: "",
      display_name: "",
      writer_alt: "",
      errorImage: "",
    });
  };

  useEffect(() => {
    if (report) {
      setFormData({
        ...formData,
        writer_id: report.writer_id ? report.writer_id : "",
        writer_name: report.writer_name ? report.writer_name : "",
        email: report.email ? report.email : "",
        display_name: report.display_name ? report.display_name : "",
        writer_alt: report.writer_alt ? report.writer_alt : "",
      });
      setPhotoUrl(report ? report.image : "");
    }
  }, [report]);

  const beforeUpload = (files) => {
    let valid = true;

    const allowedFileType = [
      "image/svg",
      "image/svg+xml",
      "image/png",
      "image/x-citrix-png",
      "image/x-png",
      "image/jpeg",
      "image/x-citrix-jpeg",
      "image/bmp",
      "image/webp",
    ];
    const maxFileSize = 5000000;
    for (let file of files) {
      if (!allowedFileType.includes(file.type)) {
        setErrorData({
          ...errorData,
          errorImage: "Please upload a .jpeg or .png file!",
        });
        valid = false;
      }
      if (file.size >= maxFileSize) {
        setErrorData({
          ...errorData,
          errorImage: "Upload image cannot more then 5MB!",
        });
        valid = false;
      }
    }
    if (valid) {
      setErrorData({ ...errorData, errorImage: "" });
    }
    return valid;
  };

  const addUpdateWriter = async (data) => {
    try {
      setLoading(true);
      const response = await api.post(`admin/cms/writer`, data);

      if (response.status) {
        openNotification("success", response.message);
        setLoading(false);
        resetErrorData();
        resetFormData();
        handleCloseClick();
      } else {
        setLoading(false);
        // resetErrorData();
        // resetFormData();
        openNotification("danger", response.message);
      }
    } catch (error) {
      openNotification("danger", error.message);
      setLoading(false);
    } finally {
      // setDrawerFlag(()=>!isOpen);
    }
  };

  const handleSubmit = async () => {
    const infoData = {
      writer_id: formData ? formData.writer_id : "",
      writer_name: formData ? formData.writer_name : "",
      email: formData ? formData.email : "",
      display_name: formData ? formData.display_name : "",
      writer_alt: formData ? formData.writer_alt : "",
    };
    if (photo?.length > 0) {
      infoData.image = photo[0];
    }
    const errorStatus = await WriterValidation(infoData, photoUrl || photo);
    if (errorStatus.errorStatus) {
      setErrorData(errorStatus);
    } else {
      await addUpdateWriter(infoData);
      // resetFormData();
    }
  };
  useEffect(() => {
    if (photo) {
      const imageURL = photoUrl?.concat(URL.createObjectURL(photo.at(-1)));
      setPhotoUrl(imageURL);
    }
  }, [photo]);

  return (
    <>
      <Drawer
        title={
          <div
            className={`text-xl font-semibold text-${themeColor}-${primaryColorLevel}`}
          >
            {report ? "Update Writer" : "Add Writer"}
          </div>
        }
        isOpen={isOpen}
        width={500}
        onClose={() => {
          resetErrorData();
          resetFormData();
          handleCloseClick();
        }}
        onRequestClose={() => {
          resetErrorData();
          resetFormData();
          handleCloseClick();
        }}
        footer={
          <div className="flex w-full justify-between items-center">
            <div>
              {report?._id && (
                <Button
                  type="reset"
                  onClick={() => {
                    resetErrorData();
                    resetFormData();
                    setPhoto("");
                    setPhotoUrl("");
                  }}
                >
                  Reset
                </Button>
              )}
            </div>
            <Button
              className="white-spinner"
              variant="solid"
              onClick={handleSubmit}
              loading={loading}
            >
              {report ? "Update" : "Submit"}
            </Button>
          </div>
        }
        headerClass="items-start bg-gray-100 dark:bg-gray-700"
        footerClass="border-t-2 p-3"
      >
        <div className="">
          <p className="mb-2 text-inherit font-semibold">Image*</p>
          <div className="items-center ">
            {!photoUrl && !photo && (
              <div className="h-32 w-32">
                <Upload
                  draggable
                  showList={false}
                  accept="image/*"
                  uploadLimit={1}
                  label="image"
                  beforeUpload={beforeUpload}
                  multiple={false}
                  onChange={async (file) => {
                    await setPhoto(file);
                  }}
                >
                  <div className="my-2 text-center">
                    <div className="text-6xl w-full  flex justify-center">
                      <BsPlusLg />
                    </div>
                  </div>
                </Upload>
              </div>
            )}

            {(photoUrl || photo) && (
              <>
                <div className="flex flex-wrap items-center justify-start mb-4">
                  <div className="group relative p-2 rounded flex h-32 mt-2">
                    <img
                      className="h-32 w-32 rounded"
                      src={photoUrl || URL.createObjectURL(photo[0])}
                      alt={photoUrl || photo[0]?.name}
                    />
                    <div className="h-32 w-32 rounded absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                      <span
                        onClick={async () => {
                          setPhoto("");
                          setPhotoUrl("");
                        }}
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                      >
                        <HiTrash />
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {DisplayError(errorData?.errorImage)}
        </div>

        <div className="py-2">
          <div className={`font-semibold mb-2  `}>Writer Name*</div>
          <div className="col-span-2">
            <Input
              type="text"
              autoComplete="off"
              placeholder="Please Enter Writer Name"
              invalid={errorData?.writer_name ? true : false}
              value={formData?.writer_name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  writer_name: e.target.value,
                });
              }}
            />
            {DisplayError(errorData?.writer_name)}
          </div>
        </div>
        <div className="py-2">
          <div className={`font-semibold mb-2  `}>Email*</div>
          <div className="col-span-2">
            <Input
              type="text"
              autoComplete="off"
              placeholder="Please Enter Email"
              invalid={errorData?.email ? true : false}
              value={formData?.email}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
            />
            {DisplayError(errorData?.email)}
          </div>
        </div>
        <div className="py-2">
          <div className={`font-semibold mb-2  `}>Display Name*</div>
          <div className="col-span-2">
            <Input
              type="text"
              autoComplete="off"
              placeholder="Please Enter Display Name"
              invalid={errorData?.display_name ? true : false}
              value={formData?.display_name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  display_name: e.target.value,
                });
              }}
            />
            {DisplayError(errorData?.display_name)}
          </div>
        </div>
        <div className="py-2">
          <div className={`font-semibold mb-2  `}>Writer Alt*</div>
          <div className="col-span-2">
            <Input
              type="text"
              autoComplete="off"
              placeholder="Please Enter Writer Alt"
              invalid={errorData?.writer_alt ? true : false}
              value={formData?.writer_alt}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  writer_alt: e.target.value,
                });
              }}
            />
            {DisplayError(errorData?.writer_alt)}
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default WriterForm;
