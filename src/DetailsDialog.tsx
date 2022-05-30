import { IGif } from '@giphy/js-types'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { CloseIconSVG } from './Svgs'

interface Props {
  gif: IGif
  modalClosed: () => void
}
export default function GifDetailsDialog({ gif, modalClosed }: Props) {
  const [isOpen, setIsOpen] = useState(true)
  const images: any = gif.images

  function closeModal() {
    setIsOpen(false)
    setTimeout(() => {
      modalClosed()
    }, 200)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
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
                <Dialog.Panel className="max-h-[70vh] overflow-auto max-w-[90%] min-w-[400px] transform rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <div
                    className="sticky top-0 w-full flex justify-end px-5 py-4"
                    role="button"
                    onClick={closeModal}
                  >
                    <CloseIconSVG />
                  </div>

                  <div className="px-4 py-5 flex flex-col gap-3 max-h-[90%] overflow-auto items-center">
                    {Object.keys(images).map((rendition) => {
                      const widthApplied = images[rendition].width
                      const heightApplied = images[rendition].height
                      if (images[rendition].mp4) {
                        return (
                          <video
                            key={rendition}
                            src={images[rendition].mp4}
                            playsInline
                            autoPlay
                            loop
                            muted
                            controls={false}
                            width={widthApplied}
                            height={heightApplied}
                            className="object-contain"
                          />
                        )
                      }
                      return (
                        <img
                          key={rendition}
                          src={images[rendition].url}
                          alt={gif.title}
                          width={widthApplied}
                          height={heightApplied}
                          className="object-contain"
                        />
                      )
                    })}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
