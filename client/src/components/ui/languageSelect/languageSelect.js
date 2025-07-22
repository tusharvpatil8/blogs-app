import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
// import { useTranslation } from "react-i18next";
// import i18n from "../i18n";
import Button from "../button";
import {languageOptions} from "../../../utils/options/headerOptions"
import { FaChevronUp } from "react-icons/fa6";
import { setSelectedLanguage } from "store/language/languageSlice";

const LanguageSelect = ({width="w-auto"}) => {
  const dispatch = useDispatch()
  const dropdownRef = useRef(null);
  const selectedLanguage = useSelector((state) => state?.language?.language?.selectedLanguage);
  const [language, setLanguage] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    setLanguage(languageOptions?.languages?.filter((item)=>item.code===selectedLanguage.code)[0])
  },[selectedLanguage])
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // const changePlatFormLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };

  const handleCountrySelect = (language) => {
    setLanguage(language);
    setIsOpen(false);
    dispatch(setSelectedLanguage(language))
    // changePlatFormLanguage(language?.code);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left ${width}`}
    >
      <Button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-[150px] "
      >
        <div className="w-5 h-5 rounded-full mr-2">
          {language?.icon}
        </div>
        <div>
          {language?.code ? language.code : "EN"}
        </div>
        <div className="pl-2">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </Button>

      {isOpen && (
        <div className="absolute origin-top-right z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {languageOptions?.languages?.map((language) => {
              return (
                <>
                  <button
                    key={language?.code}
                    onClick={() => handleCountrySelect(language)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-800 flex hover:bg-gray-100"
                  >
                    <div className="w-5 h-5 rounded-full mr-2 ">
                      {language?.icon}
                    </div>
                    {language?.code}
                  </button>
                </>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
