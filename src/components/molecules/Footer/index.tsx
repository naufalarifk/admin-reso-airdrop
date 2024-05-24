import { IcMedium, IcTelegram, IcTwitter } from "@/assets/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="pt-10 pb-5 bg-dark">
      <div className="layout">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="col-span-full  lg:col-span-1 lg:block">
            <div>
              <img src="/images/brand.png" className="w-max h-14" alt="" />
              <div className="text-soft mt-7 text-sm ">{t("footer.desc")}</div>
              <div className="flex  mt-6 gap-3">
                <a target="_blank" href="https://x.com/rectoverso_dex" className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-gray-700 group hover:bg-white transition-colors ease-in-out duration-200">
                  <IcTwitter className="group-hover:text-[#5765f2] w-6 h-6" />
                </a>
                <a target="_blank" href="https://t.me/rectoverso_chat" className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-gray-700 group hover:bg-white transition-colors ease-in-out duration-200">
                  <IcTelegram className="group-hover:text-[#1e98db] w-6 h-6" />
                </a>
                <a target="_blank" href="https://rectoverso.medium.com/" className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-gray-700 group hover:bg-white transition-colors ease-in-out duration-200">
                  <IcMedium className="group-hover:text-[#0b65c2] w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-span-full  lg:col-span-1   lg:block">
            <div className="grid grid-cols-2 gap-8 text-left md:text-center">
              <div>
                <h2 className="mb-6 text-sm font-bold uppercase text-white">
                  {t("footer.title.one")}
                </h2>
                <ul className="text-soft font-medium space-y-4">
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-primary ease-in-out transition-colors text-sm font-light"
                    >
                      {t("footer.about")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-primary ease-in-out transition-colors text-sm font-light"
                    >
                      {t("footer.blog")}
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="hover:underline hover:text-primary ease-in-out transition-colors text-sm font-light"
                    >
                      {t("footer.terms")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="hover:underline hover:text-primary ease-in-out transition-colors text-sm font-light"
                    >
                      {t("footer.privacy")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="invisible">
                <h2 className="mb-6 text-sm font-bold uppercase text-white">
                  {t("footer.title.three")}
                </h2>
                <ul className="text-soft font-medium space-y-4">
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-primary ease-in-out transition-colors text-sm font-light"
                    >
                      Account
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-primary ease-in-out transition-colors text-sm font-light"
                    >
                      Manage Deliveries
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-primary ease-in-out transition-colors text-sm font-light"
                    >
                      Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-primary ease-in-out transition-colors text-sm font-light"
                    >
                      Payments
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-primary ease-in-out transition-colors text-sm font-light"
                    >
                      Returns
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm font-normal text-soft">
        © 2024, Rectoverso All Rights Reserved
      </div>
    </footer>
  );
};
