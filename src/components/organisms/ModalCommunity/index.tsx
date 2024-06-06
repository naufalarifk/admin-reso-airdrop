import { IcClose, IcExternalLink } from '@/assets/icons';
import { ButtonGlow } from '@/components/atoms';
import { cn } from '@/utils';
import {
   CloseButton,
   Description,
   Dialog,
   DialogPanel,
   DialogTitle,
   Transition,
   TransitionChild,
} from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const variants = {
   hidden: {
      y: '-100vh',
      opacity: 0,
   },
   visible: {
      y: '0',
      opacity: 1,
      transition: {
         duration: 0.1,
         type: 'spring',
         damping: 25,
         stiffness: 500,
      },
   },
   exit: {
      y: '100vh',
      opacity: 0,
   },
};

export function ModalCommunity() {
   const { t } = useTranslation();

   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <button
            onClick={() => setIsOpen(true)}
            className="text-left text-base font-medium text-white hover:text-primary">
            {t(`navbar.menu.supports`)}
         </button>

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
                              <DialogPanel
                                 as={motion.div}
                                 variants={variants}
                                 initial="hidden"
                                 animate="visible"
                                 exit="exit"
                                 className="w-full max-w-2xl space-y-4 rounded-2xl border border-white/10 bg-dark px-4 py-6">
                                 <div className="flex items-center justify-between gap-2">
                                    <DialogTitle
                                       as="h3"
                                       className="text-base font-semibold text-white lg:text-2xl">
                                       {t(`navbar.menu.supports`)}
                                    </DialogTitle>
                                    <CloseButton className="grid size-6 place-items-center rounded-full transition-all duration-300 data-[hover]:scale-110">
                                       <IcClose />
                                    </CloseButton>
                                 </div>
                                 <Description className="text-sm text-gray3">
                                    Connect with us in the Community section! Follow us on social
                                    media to stay updated, join discussions, and share your
                                    insights. Be part of the conversation and help shape the future
                                    of ResoEX.
                                 </Description>
                                 <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
                                    <div className="space-y-4 rounded-2xl bg-dark2 p-4 text-center">
                                       <div className="mx-auto grid size-20 place-items-center rounded-xl bg-dark">
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="49"
                                             height="48"
                                             viewBox="0 0 49 48"
                                             fill="none">
                                             <path
                                                d="M35.669 6H41.803L28.403 21.25L44.167 42H31.823L22.157 29.414L11.095 42H4.95499L19.289 25.69L4.16699 6H16.823L25.563 17.504L35.669 6ZM33.517 38.344H36.917L14.975 9.464H11.327L33.517 38.344Z"
                                                fill="#F23F5D"
                                             />
                                          </svg>
                                       </div>
                                       <div className="text-lg">Twitter</div>
                                       <ButtonGlow
                                          className={cn(
                                             'flex w-auto items-center gap-2 rounded-full px-10 py-2',
                                          )}
                                          onClick={() =>
                                             window.open('https://x.com/rectoverso_dex', '_blank')
                                          }>
                                          Follow
                                          <IcExternalLink className="size-4 text-white" />
                                       </ButtonGlow>
                                    </div>
                                    <div className="space-y-4 rounded-2xl bg-dark2 p-4 text-center">
                                       <div className="mx-auto grid size-20 place-items-center rounded-xl bg-dark">
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="49"
                                             height="48"
                                             viewBox="0 0 49 48"
                                             fill="none">
                                             <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12.0757 28.04C12.1616 28.0686 12.25 28.0894 12.3397 28.102C12.9055 29.4353 13.4682 30.77 14.0277 32.106C15.0337 34.51 16.0477 36.986 16.2697 37.698C16.5477 38.574 16.8397 39.17 17.1597 39.578C17.3257 39.786 17.5157 39.97 17.7397 40.11C17.8563 40.183 17.9812 40.2421 18.1117 40.286C18.7517 40.526 19.3357 40.426 19.7017 40.304C19.9164 40.2307 20.1208 40.1298 20.3097 40.004L20.3197 40L25.9717 36.476L32.5017 41.48C32.5977 41.554 32.7017 41.616 32.8137 41.666C33.5977 42.006 34.3577 42.126 35.0737 42.03C35.7857 41.93 36.3517 41.632 36.7737 41.294C37.2582 40.9034 37.6445 40.4048 37.9017 39.838L37.9197 39.794L37.9257 39.778L37.9297 39.77V39.766L37.9317 39.764C37.9664 39.6779 37.9932 39.5889 38.0117 39.498L43.9717 9.44797C43.9905 9.35178 43.9999 9.25399 43.9997 9.15597C43.9997 8.27597 43.6677 7.43797 42.8897 6.93197C42.2217 6.49797 41.4797 6.47797 41.0097 6.51397C40.5057 6.55397 40.0377 6.67797 39.7237 6.77797C39.5479 6.83368 39.3744 6.8964 39.2037 6.96597L39.1817 6.97597L5.75365 20.088L5.74965 20.09C5.63655 20.1316 5.52513 20.1776 5.41565 20.228C5.15058 20.3471 4.8963 20.489 4.65565 20.652C4.20165 20.962 3.15565 21.814 3.33365 23.222C3.47365 24.342 4.24165 25.032 4.71165 25.364C4.96765 25.546 5.21165 25.676 5.39165 25.762C5.47165 25.802 5.64365 25.87 5.71765 25.902L5.73765 25.908L12.0757 28.04ZM40.3517 9.73597H40.3477C40.3305 9.74362 40.3131 9.75095 40.2957 9.75797L6.82765 22.888C6.81043 22.8949 6.7931 22.9016 6.77565 22.908L6.75565 22.914C6.69451 22.938 6.63446 22.9647 6.57565 22.994C6.63132 23.0259 6.68874 23.0546 6.74765 23.08L13.0317 25.196C13.1439 25.2338 13.2514 25.2848 13.3517 25.348L34.1057 13.198L34.1257 13.188C34.2063 13.139 34.289 13.0936 34.3737 13.052C34.5177 12.978 34.7477 12.87 35.0077 12.79C35.1877 12.734 35.7217 12.576 36.2977 12.762C36.6032 12.8583 36.8755 13.0385 37.0834 13.2822C37.2913 13.5259 37.4266 13.8231 37.4737 14.14C37.5481 14.4175 37.5502 14.7094 37.4797 14.988C37.3397 15.538 36.9557 15.966 36.6057 16.294C36.3057 16.574 32.4137 20.326 28.5757 24.03L23.3497 29.07L22.4197 29.97L34.1637 38.974C34.3222 39.0405 34.4943 39.0679 34.6657 39.054C34.752 39.0423 34.8331 39.0062 34.8997 38.95C34.9807 38.8815 35.0503 38.8005 35.1057 38.71L35.1097 38.708L40.8897 9.56197C40.7076 9.60577 40.5291 9.66327 40.3557 9.73397L40.3517 9.73597ZM23.4297 34.524L21.0857 32.728L20.5177 36.338L23.4297 34.524ZM18.9357 29.164L21.2657 26.914L26.4917 21.87L28.4377 19.994L15.3977 27.628L15.4677 27.792C16.2901 29.7348 17.1034 31.6815 17.9077 33.632L18.4737 30.032C18.5249 29.6981 18.6877 29.3934 18.9357 29.164Z"
                                                fill="#F23F5D"
                                             />
                                          </svg>
                                       </div>
                                       <div className="text-lg">Telegram</div>
                                       <ButtonGlow
                                          className={cn(
                                             'flex w-auto items-center gap-2 rounded-full px-10 py-2',
                                          )}
                                          onClick={() =>
                                             window.open('https://t.me/rectoverso_chat', '_blank')
                                          }>
                                          Join
                                          <IcExternalLink className="size-4 text-white" />
                                       </ButtonGlow>
                                    </div>
                                    <div className="space-y-4 rounded-2xl bg-dark2 p-4 text-center">
                                       <div className="mx-auto grid size-20 place-items-center rounded-xl bg-dark">
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="49"
                                             height="48"
                                             viewBox="0 0 49 48"
                                             fill="none">
                                             <path
                                                d="M16.834 14C14.1818 14 11.6383 15.0536 9.76289 16.9289C7.88753 18.8043 6.83396 21.3478 6.83396 24C6.83396 26.6522 7.88753 29.1957 9.76289 31.0711C11.6383 32.9464 14.1818 34 16.834 34C19.4861 34 22.0297 32.9464 23.905 31.0711C25.7804 29.1957 26.834 26.6522 26.834 24C26.834 21.3478 25.7804 18.8043 23.905 16.9289C22.0297 15.0536 19.4861 14 16.834 14ZM16.834 10C19.1265 9.99862 21.3842 10.5608 23.4084 11.6371C25.4325 12.7133 27.1611 14.2707 28.442 16.172L28.51 16.034C29.52 14.014 31.288 12 33.834 12C36.196 12 37.888 13.732 38.928 15.596C39.004 15.496 39.086 15.396 39.168 15.302C39.748 14.652 40.642 14 41.834 14C43.026 14 43.922 14.652 44.498 15.3C45.078 15.954 45.508 16.786 45.828 17.64C46.474 19.366 46.834 21.614 46.834 24C46.834 26.386 46.474 28.634 45.828 30.36C45.508 31.214 45.078 32.046 44.498 32.7C43.922 33.348 43.026 34 41.834 34C40.642 34 39.746 33.348 39.17 32.7C39.0857 32.6043 39.005 32.5056 38.928 32.404C37.888 34.268 36.194 36 33.834 36C31.288 36 29.52 33.988 28.51 31.966C28.4871 31.9201 28.4644 31.8741 28.442 31.828C27.091 33.8311 25.2447 35.4505 23.0825 36.5287C20.9203 37.6069 18.5159 38.1072 16.1031 37.9809C13.6904 37.8546 11.3513 37.106 9.31353 35.808C7.27574 34.5099 5.60855 32.7066 4.47413 30.5734C3.3397 28.4402 2.77665 26.0497 2.83973 23.6345C2.90282 21.2192 3.58989 18.8614 4.83412 16.7903C6.07836 14.7192 7.83741 13.0054 9.94018 11.8155C12.043 10.6256 14.4179 10.0002 16.834 10ZM40.834 24C40.834 25.826 40.994 27.866 41.834 29.528C42.674 27.868 42.834 25.828 42.834 24C42.834 22.174 42.674 20.134 41.834 18.472C40.994 20.132 40.834 22.172 40.834 24ZM36.834 24C36.834 22.48 36.408 16 33.834 16C31.26 16 30.834 22.48 30.834 24C30.834 25.52 31.26 32 33.834 32C36.408 32 36.834 25.52 36.834 24Z"
                                                fill="#F23F5D"
                                             />
                                          </svg>
                                       </div>
                                       <div className="text-lg">Medium</div>
                                       <ButtonGlow
                                          className={cn(
                                             'flex w-auto items-center gap-2 rounded-full px-10 py-2',
                                          )}
                                          onClick={() =>
                                             window.open('https://rectoverso.medium.com/', '_blank')
                                          }>
                                          Read
                                          <IcExternalLink className="size-4 text-white" />
                                       </ButtonGlow>
                                    </div>
                                 </div>
                              </DialogPanel>
                           </TransitionChild>
                        </div>
                     </div>
                  </Dialog>
               </Transition>
            )}
         </AnimatePresence>
      </>
   );
}
