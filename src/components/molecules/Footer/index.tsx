import { IcDiscord, IcLinkedin, IcTelegram } from "@/assets/icons";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="pt-10 pb-5 bg-dark">
      <div className="layout">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="col-span-full  lg:col-span-1 lg:block">
            <div>
              <img src="/images/brand.png" className="w-max h-7" alt="" />
              <div className="text-soft mt-7 text-sm ">{t("footer.desc")}</div>
              <div className="flex  mt-6 gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-gray-700 group hover:bg-white transition-colors ease-in-out duration-200">
                  <IcDiscord className="group-hover:text-[#5765f2] w-6 h-6" />
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-gray-700 group hover:bg-white transition-colors ease-in-out duration-200">
                  <IcLinkedin className="group-hover:text-[#0b65c2] w-6 h-6" />
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-gray-700 group hover:bg-white transition-colors ease-in-out duration-200">
                  <IcTelegram className="group-hover:text-[#1e98db] w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full   lg:col-span-1 lg:block">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h2 className="mb-6 text-sm font-bold uppercase text-white">
                  {t("footer.title.one")}
                </h2>
                <ul className="text-soft font-medium space-y-4">
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Jobs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      In Press
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-bold uppercase text-white">
                  {t("footer.title.two")}
                </h2>
                <ul className="text-soft font-medium space-y-4">
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Online Chat
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Whatsapp
                    </a>
                  </li>

                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Ticketing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-bold  uppercase text-white">
                  {t("footer.title.three")}
                </h2>
                <ul className="text-soft font-medium space-y-4">
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Account
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Manage Deliveries
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Orders
                    </a>
                  </li>

                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
                      Payments
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underlin text-sm font-light">
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
        © 2024, 0xSD All Rights Reserved
      </div>
    </footer>
  );
};
