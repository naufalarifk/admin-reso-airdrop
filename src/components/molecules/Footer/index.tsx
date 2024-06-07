import { IcMedium, IcTelegram, IcTwitter } from '@/assets/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Footer = () => {
   const { t } = useTranslation();
   return (
      <footer className="bg-dark pb-5 pt-10">
         <div className="layout">
            <div className="flex flex-col">
               <div className="">
                  <div>
                     <img
                        src="/images/brand.png"
                        className="mx-auto h-14 lg:w-max w-auto"
                        alt=""
                     />
                     <div className="col-span-full  lg:col-span-1   lg:block"></div>
                     <div className="mx-auto mt-7 w-full text-center text-sm text-soft lg:w-1/2">
                        {t('footer.desc')}
                     </div>
                     <ul className="mt-4 flex justify-center space-x-3 font-medium text-soft">
                        <li>
                           <a
                              href="#"
                              className="text-xs font-light transition-colors ease-in-out hover:text-primary hover:underline lg:text-sm">
                              {t('footer.about')}
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-xs font-light transition-colors ease-in-out hover:text-primary hover:underline lg:text-sm">
                              {t('footer.blog')}
                           </a>
                        </li>
                        <li>
                           <Link
                              to="/terms"
                              className="text-xs font-light transition-colors ease-in-out hover:text-primary hover:underline lg:text-sm">
                              {t('footer.terms')}
                           </Link>
                        </li>
                        <li>
                           <Link
                              to="/privacy"
                              className="text-xs font-light transition-colors ease-in-out hover:text-primary hover:underline lg:text-sm">
                              {t('footer.privacy')}
                           </Link>
                        </li>
                     </ul>
                     <div className="mx-auto mt-6 flex w-1/2 justify-center gap-3">
                        <a
                           target="_blank"
                           href="https://x.com/rectoverso_dex"
                           className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-700 transition-colors duration-200 ease-in-out hover:bg-white">
                           <IcTwitter className="h-6 w-6 group-hover:text-[#5765f2]" />
                        </a>
                        <a
                           target="_blank"
                           href="https://t.me/rectoverso_chat"
                           className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-700 transition-colors duration-200 ease-in-out hover:bg-white">
                           <IcTelegram className="h-6 w-6 group-hover:text-[#1e98db]" />
                        </a>
                        <a
                           target="_blank"
                           href="https://rectoverso.medium.com/"
                           className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-700 transition-colors duration-200 ease-in-out hover:bg-white">
                           <IcMedium className="h-6 w-6 group-hover:text-[#0b65c2]" />
                        </a>
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
