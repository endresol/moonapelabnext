// next.js component in typescript that is a popup

import React, {Fragment} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MalButton } from './MalButton';

interface PopupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export const Popup: React.FC<PopupProps> = ({ open, setOpen, title, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all border border-white w-2/3 p-4 rounded-lg --font-gt-america">
              <Dialog.Title
                as="h3"
                className="text-xl leading-6 text-white mt-6 mb-6"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2">
                {children}
              </div>

              <div className="mt-4">
                <MalButton
                  onClick={() => setOpen(false)}  
                >
                  Got it, thanks!
                </MalButton>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}

