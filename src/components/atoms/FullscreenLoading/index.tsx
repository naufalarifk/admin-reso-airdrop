import {
    Dialog,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import './index.css'
interface Loading {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function FullScreenLoading({ isOpen, setIsOpen }: Loading) {

    const controls = useAnimation();
    const direction = 1

    useEffect(() => {
        controls.start({
            rotate: [null, 360 * direction],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "linear"
            }
        });
    }, [direction, controls]);

    return (
        <AnimatePresence>
            {isOpen && (
                <Transition
                    appear
                    show={isOpen}>
                    <Dialog
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        className="relative z-50">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                        />
                        <div className="fixed inset-0 z-full w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <TransitionChild
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 transform-[scale(95%)]"
                                    enterTo="opacity-100 transform-[scale(100%)]"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 transform-[scale(100%)]"
                                    leaveTo="opacity-0 transform-[scale(95%)]">
                                    {/* <motion.div
                                        className="block"
                                        animate={{
                                            rotate: [null, 360, 1],
                                        }}
                                    >
                                        <img src="/images/loading-reso.svg" alt="" srcSet="/images/loading-reso.svg" />
                                    </motion.div> */}
                                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </AnimatePresence>
    );
}
