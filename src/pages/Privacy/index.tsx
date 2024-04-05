import { IcWave } from "@/assets/icons";
import { Footer, Header } from "@/components";
import { useTranslation } from "react-i18next";

export const Privacy = () => {
  const { t } = useTranslation();
  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="relative h-full md:bg-dark2 lg:max-h-[550px] ">
        <div className="layout relative z-10 pt-32 lg:py-28">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div>
              <div className="text-xl md:text-3xl lg:text-5xl font-bold mb-8">
                {t("privacy.title")}
              </div>
              <div className="text-sm lg:text-base font-normal mb-16 text-soft">
                {t("terms.subtitle.one")}{" "}
                <a className="text-primary underline" href="/">
                  {t("terms.subtitle.link")}
                </a>{" "}
                {t("terms.subtitle.two")}
              </div>
              <div className="text-xs md:text-base text-soft">
                Last updated: January 22, 2024
              </div>
            </div>
            <div className="hidden lg:block">
              <img className="scale-90" src="/images/private.png" alt="" />
            </div>
          </div>
        </div>
        <div className="absolute w-full  hidden lg:block bottom-0">
          <IcWave />
        </div>
      </div>

      <div className="relative">
        <div className="layout my-10 space-y-10">
          <div className="space-y-3">
            <div className="text-primary font-dm text-base  lg:text-3xl font-medium">
              {t("privacy.body.section.one.title")}
            </div>
            <div className=" text-base lg:text-2xl text-white font-medium">
              {t("privacy.body.section.one.subtitle.one.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.one.subtitle.one.desc")}
            </div>
            <div className=" text-base lg:text-2xl text-white font-medium">
              {t("privacy.body.section.one.subtitle.two.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.one.subtitle.two.desc")}
            </div>
            <div className="text-base lg:text-2xl text-white font-medium">
              {t("privacy.body.section.one.subtitle.three.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.one.subtitle.three.desc")}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-primary mb-4 font-dm text-base lg:text-3xl font-medium">
              {t("privacy.body.section.two.title")}
            </div>
            <div className="text-base lg:text-2xl text-white font-medium">
              {t("privacy.body.section.two.subtitle.one.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.two.subtitle.one.desc")}
            </div>
            <div className="text-base lg:text-2xl text-white font-medium">
              {t("privacy.body.section.two.subtitle.two.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.two.subtitle.two.desc")}
            </div>
            <div className="lg:text-2xl text-base text-white font-medium">
              {t("privacy.body.section.two.subtitle.three.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.two.subtitle.three.desc")}
            </div>
            <div className="text-base lg:text-2xl text-white font-medium">
              {t("privacy.body.section.two.subtitle.four.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.two.subtitle.four.desc")}
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-primary mb-4 font-dm text-base lg:text-3xl font-medium">
              {t("privacy.body.section.three.title")}
            </div>
            <div className="text-base lg:text-2xl text-white font-medium">
              {t("privacy.body.section.three.subtitle.one.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.three.subtitle.one.desc")}
            </div>
            <div className="text-base lg:text-2xl text-white font-medium">
              {t("privacy.body.section.three.subtitle.two.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.three.subtitle.two.desc")}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-primary mb-4 font-dm text-base lg:text-3xl font-medium">
              {t("privacy.body.section.four.title")}
            </div>
            <div className="lg:text-2xl text-base text-white font-medium">
              {t("privacy.body.section.four.subtitle.one.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.four.subtitle.one.desc")}
            </div>
            <div className="lg:text-2xl text-base text-white font-medium">
              {t("privacy.body.section.four.subtitle.two.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.four.subtitle.two.desc")}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-primary mb-4 font-dm text-base lg:text-3xl font-medium">
              {t("privacy.body.section.five.title")}
            </div>
            <div className="lg:text-2xl text-white text-base font-medium">
              {t("privacy.body.section.five.subtitle.one.heading")}
            </div>
            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.five.subtitle.one.desc")}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-primary mb-4 font-dm text-base lg:text-3xl font-medium">
              {t("privacy.body.section.six.title")}
            </div>

            <div className="text-soft text-sm lg:text-base">
              {t("privacy.body.section.six.desc")}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
