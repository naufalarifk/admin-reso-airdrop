import { motion, useScroll, useTransform } from "framer-motion";
import { type ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import Marquee from "react-fast-marquee";

import { loadSlim } from "@tsparticles/slim";

import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonGlow, Header } from "@/components";

export function Landing() {
  const data = [90, 20, 50, 100, 70];
  const containerRef = useRef<HTMLDivElement>(null);

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
          value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
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
    <div className="h-full overflow-x-hidden min-h-screen">
      <img
        src="/images/grid.png"
        className="absolute w-[1920px] h-[1080px] -top-28 "
        alt=""
      />
      {init && (
        <div className="bg-transparent absolute lg:-top-5">
          <Particles
            id="tsparticles"
            options={optionsFire}
            className="w-[400px] lg:w-[800px] h-[500px]"
          />
        </div>
      )}
      <motion.div
        className="absolute gradient_1 w-[350px] h-[350px]  lg:w-[650px] -top-30
    lg:h-[650px]"
      />
      {/* Navbar Section */}
      <Header />
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
            <div className="border z border-white/20 rounded-full py-1.5 text-white h-[42px] w-max text-sm md:text-base px-4 flex items-center gap-3">
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
              All In Platform For Decentralize Blockchain
            </div>
            <h1 className="text-white z-10 font-semibold text-5xl">
              Redefine Your{" "}
              <span className="text-primary"> Crypto Journey</span>
            </h1>
            <p className="text-soft">
              All-in-One Platform for Decentralized Exchange, Staking, and
              Streamlined Bridging, Unlocking Limitless Possibilities
            </p>
            <ButtonGlow>Connect Wallet</ButtonGlow>
          </motion.div>
          <div
            style={{
              perspective: "1000px",
            }}
            className="w-full flex items-center justify-center"
          >
            <motion.div
              className="w-full flex items-center justify-center"
              style={{
                rotateX: translate, // rotate in X-axis
              }}
            >
              <img className="w-11/12" src="/images/herolanding.png" alt="" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pb-16 xl:py-28 hidden md:block">
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
                  <Marquee speed={150} direction="right">
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
      </div>

      {/* Features Section */}
      <div className="pb-[60rem] md:pb-[30rem] h-full lg:pb-20 relative overflow-hidden pt-1 ">
        <div className="h-[1.5px] gradient_border w-full absolute top-0" />
        <div className="layout relative">
          <div className="absolute gradient_2" />
          {init && (
            <div className="bg-transparent absolute -top-40">
              <Particles id="tsparticlessnow" options={optionSnow} />
            </div>
          )}
          <motion.div
            initial={{
              y: -100,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: {
                y: {
                  delay: 1,
                  duration: 1,
                  ease: "easeInOut",
                },
              },
            }}
            viewport={{
              once: true,
            }}
            className="pt-10 md:pt-20 md:hidden"
          >
            <img src="/images/rounded.png" alt="" />
          </motion.div>
          <motion.div
            initial={{
              y: -600,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: {
                y: {
                  delay: 1,
                  duration: 1,
                  ease: "easeInOut",
                },
              },
            }}
            viewport={{
              once: true,
            }}
            className="pt-10 md:pt-20 hidden md:block"
          >
            <img src="/images/rounded.png" alt="" />
          </motion.div>
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
                  delay: 1,
                  duration: 1.2,
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
            className="absolute top-28 md:top-32 w-full"
          >
            <div className="flex flex-col items-center justify-center ">
              <div className="border border-white/20 mb-10 rounded-full py-1.5 text-white h-[42px] w-max px-4 flex items-center gap-3">
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
                What We Provide To You
              </div>
              <div className="space-y-2 md:space-y-5 text-2xl md:text-3xl font-semibold text-center">
                <div className="flex items-center text-center text-white">
                  Access the powerful and
                </div>
                <div className="text-primary">helpful features.</div>
              </div>
              <div className="text-soft mt-4 text-base md:text-xl font-medium w-full md:w-7/12 text-center">
                Unleash unparalleled efficiency as Nexus AI transforms the
                mundane task of web clipping into an extraordinary journey.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10 mt-10 lg:gap-16">
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
                    <div className="text-white">Decentralize Trade</div>
                    <div className="text-soft">
                      Save newsletters with one shortcut, no more forwarding to
                      complicated email
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
                    <div className="text-white">Bridge Platform</div>
                    <div className="text-soft">
                      Save newsletters with one shortcut, no more forwarding to
                      complicated email
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
                    <div className="text-white">Swap</div>
                    <div className="text-soft">
                      Save newsletters with one shortcut, no more forwarding to
                      complicated email
                    </div>
                  </div>
                </div>
                <div className="lg:col-start-2 lg:row-start-2">
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
                      <div className="text-white">Staking Platform</div>
                      <div className="text-soft">
                        Save newsletters with one shortcut, no more forwarding
                        to complicated email
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
      <div className="pt-28 pb-10">
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
            className="flex flex-col md:flex-row gap-10"
          >
            <div className="w-full md:w-7/12">
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
                Decentralize Trade
              </div>
              <div className="text-white mt-4 text-2xl md:text-4xl w-12/12 leading-normal font-semibold">
                Fusing Ideas, Empowering Solutions, Redefining{" "}
                <span className="text-primary">Decentralization</span>
              </div>
              <div>
                <div className="w-full md:w-5/6 text-xs md:text-base space-y-4 mt-8 text-white">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-4 fill-current text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Centralize all customer feedback in a matter of minutes
                    social media, sales calls, support tickets, community
                    forums.
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-4 fill-current text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Centralize all customer feedback in a matter of minutes
                    social media, sales calls, support tickets, community
                    forums.
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-4 fill-current text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Centralize all customer feedback in a matter of minutes
                    social media, sales calls, support tickets, community
                    forums.
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <ButtonGlow>Try Now</ButtonGlow>
              </div>
            </div>
            <div
              className="w-full md:w-5/12 relative"
              style={{
                perspective: "20000px",
              }}
            >
              <img src="/images/bordertrade.png" className="skew-y-3" alt="" />
            </div>
          </motion.div>
        </div>
      </div>

      {/*  Fusing Section */}
      <div className="pt-16 pb-32">
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
            className="flex flex-col md:flex-row justify-end gap-10"
          >
            <div
              className="w-full order-2 md:order-1 md:w-6/12 relative"
              style={{
                perspective: "20000px",
              }}
            >
              <img src="/images/borderbridge.png" className="skew-y-3" alt="" />
            </div>
            <div className="w-full md:w-6/12 order-1 lg:order-1 flex flex-col items-end justify-end text-right">
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
                Decentralize Trade
              </div>
              <div className="text-white mt-4 text-2xl lg:text-4xl w-12/12 leading-normal font-semibold">
                Fusing Ideas, Empowering Solutions, Redefining{" "}
                <span className="text-primary">Decentralization</span>
              </div>

              <div className="text-sm space-y-4 mt-8 text-white">
                <div className="flex items-start">
                  Centralize all customer feedback in a matter of minutes social
                  media, sales calls, support tickets, community forums.
                  <svg
                    className="w-5 h-5 ml-4  fill-current text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="flex items-start">
                  Centralize all customer feedback in a matter of minutes social
                  media, sales calls, support tickets, community forums.
                  <svg
                    className="w-5 h-5 ml-4  fill-current text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="flex items-start">
                  Centralize all customer feedback in a matter of minutes social
                  media, sales calls, support tickets, community forums.
                  <svg
                    className="w-5 h-5 ml-4  fill-current text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
              </div>

              <div className="mt-5">
                <ButtonGlow>Try Now</ButtonGlow>
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
            Decentralize Trade
          </div>

          <div className="text-white text-center font-semibold text-2xl lg:text-3xl mt-4">
            Connect to what you{" "}
            <span className="text-primary">actually need</span>
          </div>
          <div className="text-darkSoft mt-4 font-light text-sm lg:text-lg lg:w-8/12 text-center">
            Through our advanced AI technology, we empower developers with the
            ability to think fast, produce more efficient code
          </div>

          <div className="grid grid-cols-4 lg:grid-cols-8 lg:gap-10 layout gap-5 mt-10">
            <img
              className="lg:w-full lg:h-9"
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
        <div className="layout">
          <div className="overflow-hidden relative lg:h-[475px] bg-gradient-to-r from-[#FFFFFF1A] to-[#FFFFFF1A] p-[0.99px]  flex items-center justify-center">
            <div className="h-[1.5px] gradient_border w-full absolute top-0" />
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
              <svg
                viewBox="0 0 220 221"
                fill="none"
                className="lg:w-[220px] lg:h-[221px] w-20 h-20"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  fill="url(#pattern0)"
                  fillOpacity={0.1}
                  d="M0 0H220V220.843H0z"
                />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                  >
                    <use
                      xlinkHref="#image0_578_6281"
                      transform="scale(.00128 .00127)"
                    />
                  </pattern>
                  <image
                    id="image0_578_6281"
                    width={783}
                    height={786}
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </div>
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
              className="h-full w-full p-6 lg:p-0 bg-black flex items-center justify-center flex-col"
            >
              <div className="text-white mb-4 text-center text-2xl lg:text-4xl font-semibold">
                Connect to what you{" "}
                <span className="text-primary">actually need</span>
              </div>
              <div className="lg:text-lg text-sm font-light text-center text-darkSoft mb-10">
                Through our advanced AI technology, we empower developers with
                the ability to think fast, produce more efficient code
              </div>
              <div className="border-animate-wrapper cursor-pointer rounded-full lg:w-[450px] lg:min-w--[150px] lg:min-h-[48px] w-full h-[50px]">
                <div className="border-animate-content text-white bg-black rounded-full flex items-center justify-center">
                  Try Now
                </div>
              </div>
            </motion.div>
            <div className="absolute lg:-bottom-14 -bottom-4 -left-6   lg:-left-20">
              <svg
                className="lg:w-[220px] lg:h-[221px] w-20 h-20"
                viewBox="0 0 220 221"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  fill="url(#pattern0)"
                  fillOpacity={0.1}
                  d="M0 0H220V220.843H0z"
                />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                  >
                    <use
                      xlinkHref="#image0_578_6281"
                      transform="scale(.00128 .00127)"
                    />
                  </pattern>
                  <image
                    id="image0_578_6281"
                    width={783}
                    height={786}
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </div>
            <div
              className="absolute gradient_3 lg:w-[750px]
    lg:h-[180px] w-28 h-32"
            />
          </div>
        </div>
      </div>

      <footer className="py-10 bg-black">
        <div className="layout">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="col-span-full  lg:col-span-1 lg:block">
              <div>
                <img src="/images/brand.png" className="w-max h-7" alt="" />
                <div className="text-darkSoft mt-7 text-sm ">
                  We ara a lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </div>
              </div>
            </div>
            <div className="col-span-full   lg:col-span-1 lg:block">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    About
                  </h2>
                  <ul className="text-darkSoft font-medium space-y-4">
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
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Support
                  </h2>
                  <ul className="text-darkSoft font-medium space-y-4">
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
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    FAQ
                  </h2>
                  <ul className="text-darkSoft font-medium space-y-4">
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
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
