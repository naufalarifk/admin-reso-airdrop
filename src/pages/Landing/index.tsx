import { motion, useScroll, useTransform } from "framer-motion";
import { type ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";

import { loadSlim } from "@tsparticles/slim";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ButtonWalletConnectV2,
  Footer,
  Header,
  useWalletStore,
} from "@/components";
import { useTranslation } from "react-i18next";
import { IcShape, IcStar } from "@/assets/icons";

export function Landing() {
  // const data = [90, 20, 50, 100, 70];

  const { t } = useTranslation();

  const { connected } = useWalletStore((state) => state);

  const containerRef = useRef<HTMLDivElement>(null);
  // const account = useAccount();
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [init, setInit] = useState(false);

  const translate = useTransform(scrollYProgress, [0, 1], [30, 0]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const optionsFire: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 40,
      fullScreen: {
        enable: false,
      },
      particles: {
        number: {
          value: 250,
          density: {
            enable: true,
          },
        },
        color: {
          value: ["#F23F5D", "#F3506C", "#DC3955", "#800909", "#f07f13"],
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
        },
        size: {
          value: { min: 1, max: 3 },
        },
        move: {
          enable: true,
          speed: 6,
          random: false,
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
        },
      },
    }),
    []
  );

  const optionSnow: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 40,
      fullScreen: {
        enable: false,
      },
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
          },
        },
        color: {
          value: "#fff",
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
        },
        size: {
          value: { min: 0.5, max: 2 },
        },
        move: {
          enable: true,
          speed: 1,
          random: true,
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
        },
      },
    }),
    []
  );

  return (
    <div className="h-full overflow-x-hidden min-h-screen bg-dark">
      <img
        src="/images/wave.png"
        className="absolute w-[1920px] h-[1080px] -top-1"
        alt=""
      />
      {init && (
        <div className="bg-transparent absolute lg:-top-5">
          <Particles
            id="tsparticles"
            options={optionsFire}
            className="h-[600px] opacity-80  w-full"
          />
        </div>
      )}

      <motion.div
        className="gradient_1 w-[350px] h-[350px]  lg:w-[850px]
    lg:h-[850px]"
      />

      {/* Navbar Section */}
      <Header isLanding />
      {/* Hero Section */}
      <div ref={containerRef} className="layout pt-12 md:pt-28">
        <div className="flex items-center flex-col justify-center h-full min-h-screen pb-20">
          <motion.div
            initial={{
              y: 50,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: {
                y: {
                  duration: 1,
                },
                opacity: {
                  duration: 2,
                },
              },
            }}
            viewport={{
              once: true,
            }}
            className="flex relative flex-col text-center justify-center py-10 items-center space-y-8"
          >
            <div
              className={`border border-white/20 rounded-full py-1.5 text-white h-[42px] w-max text-xs md:text-base px-4 flex items-center gap-3`}
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity={0.2}
                  d="M11 7l-6.354 6.354a.5.5 0 01-.707 0l-1.293-1.291a.5.5 0 010-.707L9 5l2 2z"
                  fill="#fff"
                />
                <path
                  d="M15.5 9.5a.5.5 0 01-.5.5h-1v1a.5.5 0 01-1 0v-1h-1a.5.5 0 010-1h1V8a.5.5 0 011 0v1h1a.5.5 0 01.5.5zm-12-5h1v1a.5.5 0 101 0v-1h1a.5.5 0 000-1h-1v-1a.5.5 0 10-1 0v1h-1a.5.5 0 000 1zm8 7.5H11v-.5a.5.5 0 00-1 0v.5h-.5a.5.5 0 000 1h.5v.5a.5.5 0 001 0V13h.5a.5.5 0 000-1zm2.207-7L5 13.707a1 1 0 01-1.414 0l-1.294-1.293a1 1 0 010-1.414L11 2.293a1 1 0 011.414 0l1.293 1.293a1.002 1.002 0 010 1.414zm-3.415 2L9 5.707l-6 6L4.292 13l6-6zM13 4.293L11.707 3l-2 2L11 6.293l2-2z"
                  fill="#fff"
                />
              </svg>
              {t("landing.cta")}
            </div>
            <div className="w-11/12">
              <h1 className="text-white z-10 leading-snug font-extrabold text-base lg:text-5xl">
                {t("landing.hero.title.one")}
                <span className="text-primary">
                  {" "}
                  {t("landing.hero.title.two")}
                </span>
              </h1>
            </div>
            <p className="text-soft text-xs md:text-base font-medium">
              {t("landing.hero.subtitle")}
            </p>

            {!connected && <ButtonWalletConnectV2 />}
          </motion.div>
          <div
            style={{
              perspective: "1000px",
            }}
            className="w-full flex items-center justify-center"
          >
            <motion.div
              className="w-full relative  flex items-center justify-center"
              style={{
                rotateX: translate, // rotate in X-axis
              }}
            >
              <img className="w-10/12" src="/images/herolanding.png" alt="" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* <div className="pb-16 xl:py-28 hidden md:block">
        <div className="layout">
          <div className="flex w-full items-center justify-center  ">
            <div className="flex relative justify-around items-center">
              <div className="flex w-5/12 overflow-hidden flex-col gap-3 ">
                <div className="overflow-hidden">
                  <Marquee speed={180} direction="right">
                    <img
                      className="md:h-10 xl:h-14"
                      src="/images/slider1.png"
                      alt="coin-slider-first"
                    />
                  </Marquee>
                </div>
                <div className="overflow-hidden">
                  <Marquee speed={100} direction="right">
                    <img
                      className="md:h-10 xl:h-14"
                      src="/images/slider2.png"
                      alt="coin-sider-second"
                    />
                  </Marquee>
                </div>
                <div className="overflow-hidden">
                  <Marquee speed={250} direction="right">
                    <img
                      className="md:h-10 xl:h-14"
                      src="/images/slider1.png"
                      alt="coin-slider-third"
                    />
                  </Marquee>
                </div>
              </div>
              <div className="absolute z-10">
                <img
                  className="md:w-[150px] md:h-[150px] xl:w-[250px] xl:h-[250px] animation-ping"
                  src="/images/logosquare.png"
                  alt="logo-square"
                />
              </div>
              <div className="md:w-[60px] lg:w-[150px] xl:w-[90px] md:ml-48 xl:ml-80 absolute h-0.5 z-0 bg-primary" />
              <div className="relative">
                <div className="flex absolute xl:bottom-14 items-end bottom-9 inset-x-5 xl:inset-x-10 justify-between">
                  {data.map((height, i) => (
                    <div
                      key={i}
                      style={{
                        ["--height" as string]: `${height}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                      className="w-7 xl:w-10 rounded-t-lg bar bg-primary"
                    />
                  ))}
                </div>
                <img
                  className="md:w-[230px] xl:w-full"
                  src="/images/table.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Features Section */}
      <div className="pb-[8rem] md:pb-[30rem] h-full lg:pb-20 relative overflow-hidden pt-1 ">
        <div className="absolute top-1 left-0">
          <svg
            width={438}
            height={535}
            viewBox="0 0 438 535"
            className="opacity-10 blur-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M384.444-368.61l51.518 78.99-404.62 633.613-28.15-115.582L384.443-368.61z"
              fill="#BC123C"
            />
            <path
              d="M382.215-180.246l55.33 81.424L32.925 534.79.963 416.775l381.252-597.021z"
              fill="#F23F5D"
            />
          </svg>
        </div>
        <div className="absolute top-10 left-20">
          <IcStar className="text-red-200" />
        </div>
        <div className="absolute top-10 right-20">
          <IcStar className="text-red-400" />
        </div>
        <div className="absolute bottom-10 left-20">
          <IcStar className="text-red-100 w-12 h-12" />
        </div>
        <div className="absolute bottom-0 right-0">
          <svg
            width={438}
            height={540}
            viewBox="0 0 438 540"
            fill="none"
            className="opacity-10 blur-sm"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M384.444.39l51.518 78.99-404.62 633.613-28.15-115.582L384.443.39z"
              fill="#BC123C"
            />
            <path
              d="M382.216 188.754l55.329 81.424-404.62 633.613L.963 785.775l381.253-597.021z"
              fill="#F23F5D"
            />
          </svg>
        </div>
        <div className="h-[1.5px] gradient_border w-full absolute top-0" />
        <div className="layout relative">
          <div className="absolute gradient_2" />
          {init && (
            <div className="bg-transparent absolute -top-40">
              <Particles
                id="tsparticlessnow"
                className="h-[600px]"
                options={optionSnow}
              />
            </div>
          )}

          <motion.div
            initial={{
              y: 150,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: {
                y: {
                  ease: "easeIn",
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                },
                opacity: {
                  duration: 1,
                },
              },
            }}
            viewport={{
              once: true,
            }}
            className="py-24"
          >
            <div className="flex flex-col items-center justify-center ">
              <div className="border border-white/10 mb-10 rounded-full py-1.5 text-white h-[42px] w-max px-4 flex items-center gap-3">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity={0.2}
                    d="M11 7l-6.354 6.354a.5.5 0 01-.707 0l-1.293-1.291a.5.5 0 010-.707L9 5l2 2z"
                    fill="#fff"
                  />
                  <path
                    d="M15.5 9.5a.5.5 0 01-.5.5h-1v1a.5.5 0 01-1 0v-1h-1a.5.5 0 010-1h1V8a.5.5 0 011 0v1h1a.5.5 0 01.5.5zm-12-5h1v1a.5.5 0 101 0v-1h1a.5.5 0 000-1h-1v-1a.5.5 0 10-1 0v1h-1a.5.5 0 000 1zm8 7.5H11v-.5a.5.5 0 00-1 0v.5h-.5a.5.5 0 000 1h.5v.5a.5.5 0 001 0V13h.5a.5.5 0 000-1zm2.207-7L5 13.707a1 1 0 01-1.414 0l-1.294-1.293a1 1 0 010-1.414L11 2.293a1 1 0 011.414 0l1.293 1.293a1.002 1.002 0 010 1.414zm-3.415 2L9 5.707l-6 6L4.292 13l6-6zM13 4.293L11.707 3l-2 2L11 6.293l2-2z"
                    fill="#fff"
                  />
                </svg>
                {t("landing.tags.provide")}
              </div>
              <div className="space-y-2 md:space-y-5 text-2xl md:text-3xl font-semibold text-center">
                <div className="flex items-center text-center text-white">
                  {t("landing.features.title.one")}
                </div>
                <div className="text-primary">
                  {t("landing.features.title.two")}
                </div>
              </div>
              <div className="text-soft mt-4 text-base md:text-xl font-medium w-full md:w-7/12 text-center">
                {t("landing.features.subtitle")}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-0 md:mx-10 mt-10 lg:gap-16">
                <div className="flex flex-col  items-center">
                  <div className="border-animate-wrapper rounded-lg w-[52px] min-w--[52px] min-h-[48px]">
                    <div className="border-animate-content text-white bg-black rounded-lg p-3 flex items-center justify-center">
                      <svg
                        width={33}
                        height={33}
                        viewBox="0 0 33 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 15.29v12m0-12H6.633c-.747 0-1.12 0-1.405.145-.251.127-.455.331-.583.582-.145.285-.145.66-.145 1.406v9.866h8m0-12v-7.2c0-.746 0-1.12.145-1.405.128-.251.332-.455.583-.583.285-.145.658-.145 1.405-.145h3.733c.747 0 1.121 0 1.406.145.251.128.454.332.582.583.146.285.146.659.146 1.405v3.2m-8 16h8m0 0h8V13.424c0-.747 0-1.12-.146-1.406a1.33 1.33 0 00-.581-.582c-.285-.146-.66-.146-1.406-.146H20.5m0 16v-16"
                          stroke="#fff"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center mt-4 space-y-2">
                    <div className="text-white">
                      {t("landing.features.card.title.one")}
                    </div>
                    <div className="text-soft">
                      {t("landing.features.card.desc.one")}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col  items-center">
                  <div className="border-animate-wrapper rounded-lg w-[52px] min-w--[52px] min-h-[48px]">
                    <div className="border-animate-content text-white bg-black rounded-lg p-2 flex items-center justify-center">
                      <svg
                        width={33}
                        height={25}
                        viewBox="0 0 33 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.563 2.545V23.45h1.875V2.545H7.562zm-1.125.907L1.625 6.009v1.03l4.813-2.554V3.452zm4.125 0v1.033l20.175 10.716h.637v-.69L10.562 3.452zM6.436 5.244L1.625 8.63v1.158l4.813-3.385V5.244zm4.125 0v1.158l12.513 8.799h1.65L10.562 5.244zm0 2.335V9.19l4.932 6.01h1.325l-6.256-7.622zm-4.124.005l-4.813 5.864v1.607l4.813-5.864V7.584zm-4.813 8.46v1.407h4.813v-1.406H1.625zm8.938 0v1.407h20.812v-1.406H10.562z"
                          fill="#fff"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center mt-4 space-y-2">
                    <div className="text-white">
                      {t("landing.features.card.title.two")}
                    </div>
                    <div className="text-soft">
                      {t("landing.features.card.desc.two")}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  items-center">
                  <div className="border-animate-wrapper rounded-lg w-[52px] min-w--[52px] min-h-[48px]">
                    <div className="border-animate-content text-white bg-black rounded-lg p-3 flex items-center justify-center">
                      <svg
                        width={33}
                        height={33}
                        viewBox="0 0 33 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30.207 22.915a1.001 1.001 0 010 1.415l-3 3a1 1 0 01-1.415-1.415l1.294-1.292h-5.071a2 2 0 01-1.625-.838l-9.405-13.162H4.5a1 1 0 010-2h6.485a2 2 0 011.625.837l9.405 13.163h5.071l-1.293-1.293a1 1 0 011.415-1.415l3 3zm-11.832-8.917a1 1 0 001.395-.233l2.25-3.14h5.071l-1.299 1.29a1 1 0 101.415 1.415l3-3a1.001 1.001 0 000-1.415l-3-3a1 1 0 10-1.415 1.415l1.294 1.293h-5.071a2 2 0 00-1.625.837l-2.246 3.14a1 1 0 00.231 1.398zm-3.75 5.25a1 1 0 00-1.395.232l-2.245 3.143H4.5a1 1 0 100 2h6.485a2 2 0 001.625-.838l2.244-3.14a1 1 0 00-.229-1.397z"
                          fill="#fff"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center mt-4 space-y-2">
                    <div className="text-white">
                      {t("landing.features.card.title.three")}
                    </div>
                    <div className="text-soft">
                      {t("landing.features.card.desc.three")}
                    </div>
                  </div>
                </div>
                <div className="lg:col-start-1 lg:row-start-2">
                  <div className="flex flex-col  items-center">
                    <div className="border-animate-wrapper rounded-lg w-[52px] min-w--[52px] min-h-[48px]">
                      <div className="border-animate-content text-white bg-black rounded-lg p-3 flex items-center justify-center">
                        <svg
                          width={33}
                          height={33}
                          viewBox="0 0 33 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.5 3.623c-6.729 0-12 3.075-12 7v12c0 3.925 5.271 7 12 7s12-3.075 12-7v-12c0-3.925-5.271-7-12-7zm10 13c0 1.202-.985 2.428-2.701 3.365-1.933 1.053-4.525 1.635-7.299 1.635s-5.366-.582-7.299-1.635C7.485 19.05 6.5 17.825 6.5 16.623v-2.08c2.133 1.875 5.779 3.08 10 3.08s7.867-1.21 10-3.08v2.08zM9.201 7.258c1.933-1.054 4.525-1.635 7.299-1.635s5.366.58 7.299 1.635c1.716.936 2.701 2.162 2.701 3.365 0 1.202-.985 2.428-2.701 3.365-1.933 1.053-4.525 1.635-7.299 1.635s-5.366-.582-7.299-1.635C7.485 13.05 6.5 11.825 6.5 10.623c0-1.203.985-2.43 2.701-3.365zM23.8 25.988c-1.933 1.053-4.525 1.635-7.299 1.635s-5.366-.582-7.299-1.635C7.485 25.05 6.5 23.825 6.5 22.623v-2.08c2.133 1.875 5.779 3.08 10 3.08s7.867-1.21 10-3.08v2.08c0 1.202-.985 2.428-2.701 3.365z"
                            fill="#fff"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center mt-4 space-y-2">
                      <div className="text-white capitalize">
                        {t("landing.features.card.title.four")}
                      </div>
                      <div className="text-soft">
                        {t("landing.features.card.desc.four")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-start-3 lg:row-start-2">
                  <div className="flex flex-col  items-center">
                    <div className="border-animate-wrapper rounded-lg w-[52px] min-w--[52px] min-h-[48px]">
                      <div className="border-animate-content text-white bg-black rounded-lg p-2 flex items-center justify-center">
                        <svg
                          width={33}
                          height={25}
                          viewBox="0 0 33 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M28.1338 18.7168C27.3913 15.8289 25.6074 13.3175 23.1251 11.6655H30.5001C30.7653 11.6655 31.0196 11.5602 31.2072 11.3726C31.3947 11.1851 31.5001 10.9307 31.5001 10.6655C31.5001 10.4003 31.3947 10.146 31.2072 9.95842C31.0196 9.77088 30.7653 9.66553 30.5001 9.66553H20.3751C20.1548 8.80511 19.6544 8.04249 18.9528 7.49789C18.2511 6.95329 17.3882 6.65768 16.5001 6.65768C15.6119 6.65768 14.749 6.95329 14.0474 7.49789C13.3458 8.04249 12.8454 8.80511 12.6251 9.66553H2.50006C2.23485 9.66553 1.98049 9.77088 1.79296 9.95842C1.60542 10.146 1.50006 10.4003 1.50006 10.6655C1.50006 10.9307 1.60542 11.1851 1.79296 11.3726C1.98049 11.5602 2.23485 11.6655 2.50006 11.6655H9.87506C7.39276 13.3175 5.60883 15.8289 4.86631 18.7168C3.90615 18.87 3.03467 19.3677 2.41481 20.1168C1.79496 20.8659 1.46918 21.8151 1.49839 22.787C1.5276 23.7588 1.9098 24.6868 2.57352 25.3973C3.23724 26.1079 4.13704 26.5523 5.10467 26.6476C6.0723 26.7428 7.0415 26.4824 7.83104 25.9149C8.62058 25.3475 9.17641 24.5119 9.39458 23.5644C9.61276 22.6169 9.47834 21.6223 9.01648 20.7667C8.55461 19.9111 7.79691 19.253 6.88506 18.9155C7.31441 17.4352 8.07769 16.0731 9.11616 14.9341C10.1546 13.795 11.4406 12.9095 12.8751 12.3455C13.196 13.0376 13.7082 13.6234 14.3511 14.0339C14.994 14.4445 15.741 14.6626 16.5038 14.6626C17.2667 14.6626 18.0136 14.4445 18.6565 14.0339C19.2995 13.6234 19.8116 13.0376 20.1326 12.3455C21.5656 12.9104 22.8501 13.7964 23.8872 14.9354C24.9244 16.0743 25.6865 17.4359 26.1151 18.9155C25.2028 19.2519 24.4443 19.909 23.9813 20.7641C23.5184 21.6191 23.3827 22.6135 23.5997 23.5613C23.8167 24.5091 24.3715 25.3454 25.1604 25.9138C25.9492 26.4822 26.9181 26.7439 27.8859 26.6498C28.8536 26.5557 29.754 26.1124 30.4186 25.4026C31.0832 24.6929 31.4665 23.7654 31.4969 22.7936C31.5273 21.8217 31.2026 20.8721 30.5837 20.1222C29.9647 19.3724 29.0938 18.8736 28.1338 18.7193V18.7168ZM7.50006 22.6655C7.50006 23.0611 7.38277 23.4478 7.163 23.7767C6.94324 24.1056 6.63088 24.3619 6.26543 24.5133C5.89998 24.6647 5.49784 24.7043 5.10988 24.6271C4.72192 24.5499 4.36555 24.3594 4.08585 24.0797C3.80614 23.8 3.61566 23.4437 3.53849 23.0557C3.46132 22.6677 3.50093 22.2656 3.6523 21.9002C3.80368 21.5347 4.06002 21.2224 4.38892 21.0026C4.71782 20.7828 5.1045 20.6655 5.50006 20.6655C6.0305 20.6655 6.5392 20.8762 6.91428 21.2513C7.28935 21.6264 7.50006 22.1351 7.50006 22.6655ZM16.5001 12.6655C16.1045 12.6655 15.7178 12.5482 15.3889 12.3285C15.06 12.1087 14.8037 11.7963 14.6523 11.4309C14.5009 11.0654 14.4613 10.6633 14.5385 10.2753C14.6157 9.88739 14.8061 9.53102 15.0859 9.25131C15.3656 8.97161 15.7219 8.78113 16.1099 8.70396C16.4978 8.62679 16.9 8.66639 17.2654 8.81777C17.6309 8.96914 17.9432 9.22549 18.163 9.55439C18.3828 9.88329 18.5001 10.27 18.5001 10.6655C18.5001 11.196 18.2893 11.7047 17.9143 12.0797C17.5392 12.4548 17.0305 12.6655 16.5001 12.6655ZM27.5001 24.6655C27.1045 24.6655 26.7178 24.5482 26.3889 24.3285C26.06 24.1087 25.8037 23.7963 25.6523 23.4309C25.5009 23.0654 25.4613 22.6633 25.5385 22.2753C25.6157 21.8874 25.8061 21.531 26.0858 21.2513C26.3656 20.9716 26.7219 20.7811 27.1099 20.704C27.4978 20.6268 27.9 20.6664 28.2654 20.8178C28.6309 20.9691 28.9432 21.2255 29.163 21.5544C29.3828 21.8833 29.5001 22.27 29.5001 22.6655C29.5001 23.196 29.2893 23.7047 28.9143 24.0797C28.5392 24.4548 28.0305 24.6655 27.5001 24.6655Z" fill="white" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center mt-4 space-y-2">
                      <div className="text-white">
                        {t("landing.features.card.title.five")}
                      </div>
                      <div className="text-soft">
                        {t("landing.features.card.desc.five")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/*  Fusing Section */}
      <div className="pt-28 pb-10 relative">
        <img
          src="/images/wave.png"
          className="absolute w-[1920px] h-[1080px] -top-32"
          alt=""
        />
        <div className="layout">
          <motion.div
            initial={{
              x: -100,
              opacity: 0,
            }}
            whileInView={{
              x: 0,
              opacity: 1,
              transition: {
                x: {
                  delay: 1.2,
                  duration: 1.2,
                  ease: "easeIn",
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                },
                opacity: {
                  duration: 1,
                  delay: 1,
                },
              },
            }}
            viewport={{
              once: true,
            }}
            className="flex flex-col justify-between items-center md:flex-row gap-10"
          >
            <div className="w-full">
              <div className="border border-white/20 rounded-full text-xs py-1.5 text-white h-[42px] w-max px-4 flex items-center gap-3">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity={0.2}
                    d="M11 7l-6.354 6.354a.5.5 0 01-.707 0l-1.293-1.291a.5.5 0 010-.707L9 5l2 2z"
                    fill="#fff"
                  />
                  <path
                    d="M15.5 9.5a.5.5 0 01-.5.5h-1v1a.5.5 0 01-1 0v-1h-1a.5.5 0 010-1h1V8a.5.5 0 011 0v1h1a.5.5 0 01.5.5zm-12-5h1v1a.5.5 0 101 0v-1h1a.5.5 0 000-1h-1v-1a.5.5 0 10-1 0v1h-1a.5.5 0 000 1zm8 7.5H11v-.5a.5.5 0 00-1 0v.5h-.5a.5.5 0 000 1h.5v.5a.5.5 0 001 0V13h.5a.5.5 0 000-1zm2.207-7L5 13.707a1 1 0 01-1.414 0l-1.294-1.293a1 1 0 010-1.414L11 2.293a1 1 0 011.414 0l1.293 1.293a1.002 1.002 0 010 1.414zm-3.415 2L9 5.707l-6 6L4.292 13l6-6zM13 4.293L11.707 3l-2 2L11 6.293l2-2z"
                    fill="#fff"
                  />
                </svg>
                {t("landing.tags.decentralize")}
              </div>
              <div className="text-white mt-4 text-2xl md:text-4xl w-12/12 leading-normal font-bold">
                {t("landing.info.phaseOne.title.one")}{" "}
                <span className="text-primary">
                  {t("landing.info.phaseOne.title.two")}
                </span>
              </div>
              <div>
                <div className="w-full md:w-5/6 text-xs md:text-base space-y-4 mt-8 text-soft">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-4 fill-current text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    {t("landing.info.phaseOne.list.one")}
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-4 fill-current text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    {t("landing.info.phaseOne.list.two")}
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-4 fill-current text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    {t("landing.info.phaseOne.list.three")}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full relative">
              <div className="absolute z-auto hidden lg:block gradient_red w-[500px] h-[500px] opacity-50 -top-[10px] -right-20" />
              <div
                className="w-full z-10 relative pointer-events-none lg:h-full h-[300px]"
              >
                <img
                  height={3000}
                  width={3000}
                  className="z-10 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-40%] max-w-[150%]"
                  src="/images/bordertrade.svg"
                  alt="border-trade"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/*  Fusing Section */}
      <div className="pt-16 pb-32 relative">
        <img
          src="/images/wave.png"
          className="absolute w-[1920px] h-[1080px] -top-20 pointer-events-none"
          alt=""
        />
        <div className="layout">
          <motion.div
            initial={{
              x: 100,
              opacity: 0,
            }}
            whileInView={{
              x: 0,
              opacity: 1,
              transition: {
                x: {
                  delay: 1.2,
                  duration: 1.2,
                  ease: "easeIn",
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                },
                opacity: {
                  duration: 1,
                  delay: 1,
                },
              },
            }}
            viewport={{
              once: true,
            }}
            className="flex flex-col items-center md:flex-row justify-end gap-10"
          >
            <div
              className="w-full order-2 md:order-1 md:w-6/12 relative"
              style={{
                perspective: "20000px",
              }}
            >
              <div className="absolute z-auto hidden lg:block gradient_red w-[500px] h-[500px] opacity-50 -top-[10px] left-0" />
              <div
                className="w-full z-10 relative pointer-events-none lg:h-full h-[300px]"
              >
                <img
                  height={3000}
                  width={3000}
                  className="z-10 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-40%] max-w-[150%]"
                  src="/images/bordertrade.svg"
                  alt="border-trade"
                />
              </div>
            </div>
            <div className="w-full md:w-6/12 order-1 lg:order-1 flex flex-col items-end justify-end text-right">
              <div className="border text-xs border-white/20 rounded-full py-1.5 text-white h-[42px] w-max px-4 flex items-center gap-3">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity={0.2}
                    d="M11 7l-6.354 6.354a.5.5 0 01-.707 0l-1.293-1.291a.5.5 0 010-.707L9 5l2 2z"
                    fill="#fff"
                  />
                  <path
                    d="M15.5 9.5a.5.5 0 01-.5.5h-1v1a.5.5 0 01-1 0v-1h-1a.5.5 0 010-1h1V8a.5.5 0 011 0v1h1a.5.5 0 01.5.5zm-12-5h1v1a.5.5 0 101 0v-1h1a.5.5 0 000-1h-1v-1a.5.5 0 10-1 0v1h-1a.5.5 0 000 1zm8 7.5H11v-.5a.5.5 0 00-1 0v.5h-.5a.5.5 0 000 1h.5v.5a.5.5 0 001 0V13h.5a.5.5 0 000-1zm2.207-7L5 13.707a1 1 0 01-1.414 0l-1.294-1.293a1 1 0 010-1.414L11 2.293a1 1 0 011.414 0l1.293 1.293a1.002 1.002 0 010 1.414zm-3.415 2L9 5.707l-6 6L4.292 13l6-6zM13 4.293L11.707 3l-2 2L11 6.293l2-2z"
                    fill="#fff"
                  />
                </svg>
                {t("landing.tags.methods")}
              </div>
              <div className="text-white mt-4 text-2xl lg:text-4xl w-12/12 leading-normal font-bold">
                {t("landing.info.phaseTwo.title.one")}{" "}
                <span className="text-primary">
                  {t("landing.info.phaseTwo.title.two")}
                </span>
              </div>

              <div className="text-sm space-y-4 mt-8 text-soft">
                <div className="flex items-start">
                  {t("landing.info.phaseTwo.list.one")}
                  <svg
                    className="w-5 h-5 ml-4  fill-current text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="flex items-start">
                  {t("landing.info.phaseTwo.list.two")}
                  <svg
                    className="w-5 h-5 ml-4  fill-current text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="flex items-start">
                  {t("landing.info.phaseTwo.list.three")}
                  <svg
                    className="w-5 h-5 ml-4  fill-current text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative">
        <div className="h-[1.5px] gradient_border w-full absolute top-0" />
        <motion.div
          initial={{
            y: 50,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              y: {
                duration: 1,
              },
              opacity: {
                duration: 2,
              },
            },
          }}
          viewport={{
            once: true,
          }}
          className="flex flex-col justify-center items-center p-6 lg:p-11"
        >
          <div className="border border-white/20 rounded-full py-1.5 text-white h-[42px] w-max px-4 flex items-center gap-3">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity={0.2}
                d="M11 7l-6.354 6.354a.5.5 0 01-.707 0l-1.293-1.291a.5.5 0 010-.707L9 5l2 2z"
                fill="#fff"
              />
              <path
                d="M15.5 9.5a.5.5 0 01-.5.5h-1v1a.5.5 0 01-1 0v-1h-1a.5.5 0 010-1h1V8a.5.5 0 011 0v1h1a.5.5 0 01.5.5zm-12-5h1v1a.5.5 0 101 0v-1h1a.5.5 0 000-1h-1v-1a.5.5 0 10-1 0v1h-1a.5.5 0 000 1zm8 7.5H11v-.5a.5.5 0 00-1 0v.5h-.5a.5.5 0 000 1h.5v.5a.5.5 0 001 0V13h.5a.5.5 0 000-1zm2.207-7L5 13.707a1 1 0 01-1.414 0l-1.294-1.293a1 1 0 010-1.414L11 2.293a1 1 0 011.414 0l1.293 1.293a1.002 1.002 0 010 1.414zm-3.415 2L9 5.707l-6 6L4.292 13l6-6zM13 4.293L11.707 3l-2 2L11 6.293l2-2z"
                fill="#fff"
              />
            </svg>
            {t("landing.tags.exchange")}
          </div>

          <div className="text-white md:w-6/12 text-center font-bold text-2xl lg:text-3xl mt-4">
            {t("landing.provider.title.one")}{" "}
            <span className="text-primary">
              {t("landing.provider.title.two")}
            </span>
          </div>
          <div className="text-soft mt-4 font-light text-sm lg:text-lg lg:w-8/12 text-center">
            {t("landing.provider.desc")}
          </div>

          <div className="grid grid-cols-4 items-center lg:grid-cols-8 lg:gap-10 layout gap-5 mt-10">
            <img
              className="lg:w-full"
              src="/images/binance.png"
              alt="binance"
            />
            <img
              className="lg:w-full lg:h-auto"
              src="/images/bitget.png"
              alt="bitget"
            />
            <img
              className="lg:w-full lg:h-auto"
              src="/images/coinbase.png"
              alt="coinbase"
            />
            <img
              className="lg:w-full lg:h-auto"
              src="/images/metamask.png"
              alt="metamask"
            />
            <img
              className="lg:w-full lg:h-auto"
              src="/images/phantom.png"
              alt="phantom"
            />
            <img
              className="lg:w-full lg:h-auto"
              src="/images/safepal.png"
              alt="safepal"
            />
            <img
              className="lg:w-full lg:h-auto"
              src="/images/trustwallet.png"
              alt="trustwallet"
            />
            <img
              className="lg:w-full lg:h-auto"
              src="/images/walletconnect.png"
              alt="walletconnect"
            />
          </div>
        </motion.div>
      </div>

      {/* Connect Section */}
      <div className="relative py-20 lg:py-36">
        <div className=" ">
          <div className="overflow-hidden relative lg:h-[475px]  p-[0.99px] bg-dark2  flex items-center justify-center">
            <div className="h-[1.5px] gradient_border_long w-full absolute top-0" />
            <div
              className="absolute gradient_2 lg:w-[750px]
    lg:h-[180px] w-20 h-48"
            />
            {init && (
              <div className="bg-transparent absolute -top-10">
                <Particles id="tsparticlessnowSecond" options={optionSnow} />
              </div>
            )}
            <div className="absolute -top-4 lg:-top-14 lg:-right-20 -right-10">
              <IcShape className="lg:w-[220px] lg:h-[221px] w-20 h-20" />
            </div>
            <div className="h-full w-full p-6 lg:p-0 bg-dark flex items-center justify-center flex-col">
              <motion.div
                initial={{
                  y: 50,
                  opacity: 0,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    y: {
                      duration: 1,
                    },
                    opacity: {
                      duration: 2,
                    },
                  },
                }}
                viewport={{
                  once: true,
                }}
                className="flex items-center justify-center flex-col"
              >
                <div className="text-white mb-4 text-center text-2xl lg:text-4xl font-semibold">
                  {t("landing.connect.title.one")}{" "}
                  <span className="text-primary">
                    {t("landing.connect.title.two")}
                  </span>
                </div>
                <div className="lg:text-lg text-sm font-light text-center text-soft mb-10">
                  {t("landing.connect.desc")}
                </div>
                <div className="border-animate-wrapper cursor-pointer rounded-full lg:w-[450px] lg:min-w--[150px] lg:min-h-[48px] w-full h-[50px]">
                  <div className="border-animate-content text-white bg-black rounded-full flex items-center justify-center">
                    {t("button.tryNow")}
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="absolute lg:-bottom-14 -bottom-4 -left-6   lg:-left-20">
              <IcShape className="lg:w-[220px] lg:h-[221px] w-20 h-20" />
            </div>
            <div
              className="absolute gradient_3 lg:w-[750px]
    lg:h-[180px] w-28 h-32"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
