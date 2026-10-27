"use client"

import {cva, VariantProps} from "class-variance-authority";
import styles from "./modal-pop-up.module.scss";
import ModalPopUpHeader from "../modal-pop-up-header/modal-pop-up-header";
import ModalPopUpContent from "../modal-pop-up-content/modal-pop-up-content";
import {AnimatePresence, HTMLMotionProps, motion} from "framer-motion";
import {ModalBackground} from "@/shared/ui-kit/modal-background";
import {ModalContext} from "@/shared/contexts/modal-context";
import {useSyncExternalStore} from "react";
import {createPortal} from "react-dom";

const variants = cva(
  styles["base"],
  {
    variants: {
      placement: {
        bottom: styles["placement-bottom"],
        center: styles["placement-center"],
      },
      size: {
        default: null,
        large: styles["size-large"],
      },
    },
    defaultVariants: {
      placement: "bottom",
    },
  }
)

const animations = {
  bottom: {
    initial: {translate: "-50% 110%"},
    animate: {translate: "-50% 0%"},
    exit: {translate: "-50% 110%"},
  },
  center: {
    initial: {translate: "-50% -50%", scale: 0.9, opacity: 0},
    animate: {translate: "-50% -50%", scale: 1, opacity: 1},
    exit: {translate: "-50% -50%", scale: 0.9, opacity: 0},
  },
}

const subscribe = () => () => {};

type Props = HTMLMotionProps<"div"> & VariantProps<typeof variants> & {
  isOpen: boolean;
  close: () => void;
}

export default function ModalPopUp(props: Props) {
  const {className, placement, size, isOpen, close, ...otherProps} = props;

  const isClient = useSyncExternalStore(subscribe, () => true, () => false);

  if (!isClient)
    return null;

  return createPortal(
    <ModalContext.Provider value={{isOpen: isOpen, close: close}}>
      <AnimatePresence>
        {isOpen && (
          <ModalBackground fixScroll>
            <motion.div
              {...animations[placement ?? "bottom"]}
              transition={{duration: 0.3}}
              data-slot="modal-pop-up-content"
              className={variants({
                placement: placement,
                size: size,
                className: className
              })}
              onPointerUp={(e) => e.stopPropagation()}
              {...otherProps}
            />
          </ModalBackground>
        )}
      </AnimatePresence>
    </ModalContext.Provider>,
    document.body
  )
}

ModalPopUp.Header = ModalPopUpHeader;
ModalPopUp.Content = ModalPopUpContent;
