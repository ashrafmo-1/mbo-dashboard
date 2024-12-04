import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MAINPATH } from "../constant/MAINPATH";
import avatar from "../assets/300-2.png";
import { useTranslation } from "react-i18next";
import icovAvatarMyProfile from "../assets/myProfileIcon.svg";
// import { PermissionsContext } from "../context/PermissionsContext";
import { checkPermission } from "../helpers/checkPermission";

export const Side_bar = () => {
  const [profileModal, setProfileModal] = useState(false);
  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
  };

  // const permissions = useContext(PermissionsContext);
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event) => {
    const newLanguage = event.target.value;
    setCurrentLanguage(newLanguage);
    i18n.changeLanguage(newLanguage); // تغيير اللغة باستخدام i18n
  };

  const links = [
    { title: "users", path: `all_users` },
    { title: "roles", path: `all_roles` },
    { title: "customers", path: `all_customers` },
    { title: "products", path: `all_products` },
  ];
  
  return (
    <section
      className={`side-bar h-[100vh] text-white relative py-4 pb-20 transition-all left-0 w-[300px] px-4 overflow-y-scroll`}
      style={{
        backgroundColor: "var(--dark-color)",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "#888 #333",
      }}>
      <h2 className="text-2xl text-white mb-10">MBO Dashboard</h2>

      <div className="mb-3 text-[#888]">{t("Main Links")}</div>
      <div className="side-links px-3 mb-10 flex flex-col gap-2">
        <Link
          to={`/${MAINPATH}/Dashboard`}
          className="capitalize side-link hover:bg-[#1b1c22] py-1 px-4 rounded-md"
        >
          {t("dashboard.title")}
        </Link>


        {links.map((link, index) => {
          const hasPermission = checkPermission(link.path);
          return hasPermission ? (
            <Link
              key={index}
              to={`/${MAINPATH}/${link.path}`}
              className="capitalize side-link hover:bg-[#1b1c22] py-1 px-4 rounded-md"
            >
              {link.title}
            </Link>
          ) : null;
        })}
      
      
      </div>

      <div className="fixed bg-[var(--dark-color)] w-fit pr-[150px] bottom-0 left-0">
        <button onClick={toggleProfileModal}>
          <img
            src={avatar}
            width={50}
            className="flex justify-center m-2 items-center bottom-[20px] rounded-full border-blue-700 border-[4px] transition-transform duration-500 ease-in-out transform hover:scale-110"
            alt="avatar"
          />
        </button>

        <div
          className={`bg-white absolute -right-20 z-50 shadow-2xl bottom-16 p-2 w-[270px] rounded-md ${
            profileModal ? "flex-col" : "hidden"
          }`}
        >
          <div className="profile mb-2 bg-slate-100 rounded-md px-2 py-1 flex items-center justify-between">
            <img
              src={avatar}
              alt="avatar"
              width={40}
              className="rounded-full border-blue-700 border-[2px]"
            />
            <div>
              <h4 className="font-bold text-black">Ashraf Mohamed</h4>
              <p className="text-gray-700 font-semibold">
                ashraf.qopiah@gmail.com
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 hover:bg-slate-100 rounded-md text-left w-full px-2 py-2 text-black capitalize font-semibold mb-2">
            <img
              src={icovAvatarMyProfile}
              width={20}
              alt="icov Avatar My Profile"
              loading="lazy"
            />
            <span>{t("my_profile")}</span>
          </button>
          <div className="hover:bg-slate-100 rounded-md text-left w-full px-2 py-2 text-black capitalize font-semibold flex justify-between mb-2">
            <span>{t("language")}</span>
            <select
              className="block rounded-md border border-gray-300 pb-1 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              id="language"
              onChange={handleChangeLanguage}
              value={currentLanguage}
            >
              <option value="en">🇺🇸 English</option>
              <option value="ar">🇸🇦 Arabic</option>
            </select>
          </div>
          <button className="hover:bg-slate-100 rounded-md text-left w-full px-2 py-2 text-black capitalize font-semibold mb-2">
            {t("theme")}
          </button>
          <button className="bg-red-500 rounded-md text-left w-full px-2 py-2 text-white capitalize font-semibold">
            {t("logout")}
          </button>
        </div>
      </div>
    </section>
  );
};