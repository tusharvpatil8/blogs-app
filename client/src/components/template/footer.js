import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
// import Instagram from "../../svgs/Instagram";
// import LinkedIn from "../../svgs/LinkedIn";
// import Facebook from "../../svgs/Facebook";
import Phone from "../../assets/svg/Phone";
import Email from "../../assets/svg/Email";
// import Visa from "../../svgs/Visa";
// import Paypal from "../../svgs/Paypal";
// import Mastercard from "../../svgs/Mastercard";
import {
  ROOT,
  ABOUT_US_PREFIX_PATH,
  CONTACT_US_PREFIX_PATH,
  FAQS_PREFIX_PATH,
  PRIVACY_POLICY_PREFIX_PATH,
  TERMS_AND_CONDITIONS_PREFIX_PATH,
  RETURN_POLICY_PREFIX_PATH,
  DELIVERY_INFORMATION_PREFIX_PATH,
  TERMS_OF_USE_PREFIX_PATH,
  PRODUCTS_PREFIX_PATH,
} from "../../constants/route.constant";
// import {
//   fetchAllFooterSection,
//   fetchAllQRCodes,
//   getSocialMedia,
// } from "../../../services/commonService";
import { capitalizeFirstLetter } from "../../utils/commonFunctions";

const Footer = () => {
  const location = useLocation();
  const [footerData, setFooterData] = useState();
  const [qrCodes, setQRCodes] = useState();
  const [social, setSocial] = useState([]);

  // const fetchFooterData = async () => {
  //   try {
  //     const resp = await fetchAllFooterSection();
  //     if (resp?.success) setFooterData(resp?.data);
  //     else setFooterData();
  //   } catch (err) {
  //     console.error("Error fetching footer data", err);
  //   }
  // };

  // const fetchAllQRCodesApi = async () => {
  //   try {
  //     const resp = await fetchAllQRCodes();
  //     if (resp?.success) setQRCodes(resp?.data);
  //     else setQRCodes();
  //   } catch (err) {
  //     console.error("Error fetching footer data", err);
  //   }
  // };

  // const fetchSocialData = async () => {
  //   try {
  //     const resp = await getSocialMedia();
  //     if (resp?.success) setSocial(resp?.data);
  //     else setSocial();
  //   } catch (err) {
  //     console.error("Error fetching footer data", err);
  //   }
  // };
  // useEffect(() => {
  //   fetchFooterData();
  //   fetchSocialData();
  //   fetchAllQRCodesApi(); //eslint-disable-next-line
  // }, []);

  // console.log("footerData", footerData);
  // console.log("qrCodes", qrCodes);

  const handleHomeClick = () => {
    if (location.pathname === ROOT) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#003A7b] text-base ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] text-[#000000] pt-[40px]">
          <div>
            <img
              src={footerData?.footerMainLogo || "/img/home/whiteLogo.png"}
              alt="logo"
              className="w-[131px] h-[50px]"
            />
            <div className="mt-[24px] font-semibold text-white">
              {capitalizeFirstLetter(footerData?.details) ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            </div>
            {/* <div className="flex items-center gap-[16px] mt-[16px]">
              {social?.map((item) => {
                const name = item.name.toLowerCase();

                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    target="_blank"
                    className="w-[32px] h-[32px] bg-black bg-opacity-10 flex items-center justify-center rounded-md hover:bg-opacity-25 hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                  >
                    {name === "instagram" && <Instagram />}
                    {name === "linkedin" && <LinkedIn />}
                    {name === "facebook" && <Facebook />}
                  </Link>
                );
              })}
            </div> */}

            <div className="flex items-center gap-[16px] mt-[16px]">
              {social?.map((item) => {
                const name = item.name.toLowerCase();

                return (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[32px] h-[32px] bg-black bg-opacity-10 flex items-center justify-center rounded-md hover:bg-opacity-25 hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                    aria-label={name}
                  >
                    <img
                      src={item.logo}
                      alt={`${name} logo`}
                      className="w-[20px] h-[20px] object-contain"
                      loading="lazy"
                    />
                  </a>
                );
              })}
            </div>

            {/* <div className="flex items-center gap-[16px] mt-[16px]">
              <div className="w-[32px] h-[32px] bg-white bg-opacity-10 flex items-center justify-center rounded-md hover:bg-opacity-25 hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                <Instagram />
              </div>
              <div className="w-[32px] h-[32px] bg-white bg-opacity-10 flex items-center justify-center rounded-md hover:bg-opacity-25 hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                <LinkedIn />
              </div>
              <div className="w-[32px] h-[32px] bg-white bg-opacity-10 flex items-center justify-center rounded-md hover:bg-opacity-25 hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                <Facebook />
              </div>
            </div> */}
          </div>
          <div>
            <div className="text-xl font-bold text-white">Quick Links</div>
            <ul className="font-semibold">
              <li className="mt-[24px] text-white ">
                <NavLink to={`${ROOT}`} onClick={handleHomeClick}>
                  Home
                </NavLink>
              </li>
              <li className="mt-[12px] text-white">
                <NavLink to={`${ABOUT_US_PREFIX_PATH}`}>About Us</NavLink>
              </li>
              <li className="mt-[12px] text-white ">
                <NavLink to={`${PRODUCTS_PREFIX_PATH}`}>Blogs</NavLink>
              </li>
              <li className="mt-[12px] text-white">
                <NavLink to={`${CONTACT_US_PREFIX_PATH}`}>Contact Us</NavLink>
              </li>
              <li className="mt-[12px]  text-white">
                <NavLink to={`${FAQS_PREFIX_PATH}`}> FAQ’s</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xl font-bold text-white">Policies</div>
            <ul className="font-semibold">
              <li className="mt-[24px]  text-white">
                <NavLink to={`${PRIVACY_POLICY_PREFIX_PATH}`}>
                  Privacy Policy
                </NavLink>
              </li>
              <li className="mt-[12px]  text-white">
                <NavLink to={`${TERMS_AND_CONDITIONS_PREFIX_PATH}`}>
                  Terms & Conditions
                </NavLink>
              </li>
              <li className="mt-[12px] text-white">
                <NavLink to={`${RETURN_POLICY_PREFIX_PATH}`}>
                  Refund/Return Policy
                </NavLink>
              </li>
              <li className="mt-[12px] text-white">
                <NavLink to={`${DELIVERY_INFORMATION_PREFIX_PATH}`}>
                  Delivery Information
                </NavLink>
              </li>
              <li className="mt-[12px] text-white">
                <NavLink to={`${TERMS_OF_USE_PREFIX_PATH}`}>
                  Term of Use
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <div className="w-[32px] h-[32px] bg-[#000000] bg-opacity-10 flex items-center justify-center rounded-md">
                <Phone />
              </div>
              <a href="tel:+6468435115" className="font-semibold text-white">
                {footerData?.phoneNo || "+64 8554755"}
              </a>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <div className="min-w-[32px] min-h-[32px] bg-[#000000] bg-opacity-10 flex items-center justify-center rounded-md">
                <Email />
              </div>
              <a
                href={`mailto:${footerData?.email || "sales@xyz.co.nz"}`}
                className="font-semibold text-white"
              >
                {footerData?.email || "sales@xyz.co.nz"}
              </a>
            </div>
            {qrCodes?.length > 0 && (
              <div className="flex items-center  gap-4 mt-6">
                <div>
                  <span className="font-semibold text-white">Android</span>
                  <img
                    className="w-20 h-20 object-cover rounded-lg"
                    src={qrCodes[0]?.android}
                    alt="android"
                  />
                </div>
                <div>
                  <span className="font-semibold text-white">IOS</span>
                  <img
                    className="w-20 h-20 object-cover rounded-lg"
                    src={qrCodes[0]?.ios}
                    alt="ios"
                  />
                </div>
              </div>
            )}
            {/* <div className="text-xl font-bold mt-6">Payment Methods</div>
            <div className="mt-6 flex items-center gap-4">
              <div className="cursor-pointer w-[50px] h-[32px] bg-white bg-opacity-10 flex items-center justify-center rounded-md hover:bg-opacity-25 hover:scale-105 transition duration-300 ease-in-out">
                <Visa />
              </div>
              <div className="cursor-pointer w-[50px] h-[32px] bg-white bg-opacity-10 flex items-center justify-center rounded-md hover:bg-opacity-25 hover:scale-105 transition duration-300 ease-in-out">
                <Paypal />
              </div>
              <div className="cursor-pointer w-[50px] h-[32px] bg-white bg-opacity-10 flex items-center justify-center rounded-md hover:bg-opacity-25 hover:scale-105 transition duration-300 ease-in-out">
                <Mastercard />
              </div>
            </div> */}
          </div>
        </div>
        <div className="mt-[20px] md:mt-[80px] pb-[40px] block lg:grid grid-cols-4">
          <div className="text-[#000000] text-white font-semibold md:flex items-center justify-center gap-4 col-span-3">
            {footerData?.rightReservedText || (
              <div>
                © {new Date().getFullYear()} xyz. All Rights Reserved.
              </div>
            )}

          </div>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
