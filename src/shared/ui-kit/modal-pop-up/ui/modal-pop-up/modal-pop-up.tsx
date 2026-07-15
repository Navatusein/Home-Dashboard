"use client"

import {cva, VariantProps} from "class-variance-authority";
import styles from "./modal-pop-up.module.scss";
import ModalPopUpHeader from "../modal-pop-up-header/modal-pop-up-header";
import {AnimatePresence, HTMLMotionProps, motion} from "framer-motion";
import {ModalBackground} from "@/shared/ui-kit/modal-background";
import {ModalContext} from "@/shared/contexts/modal-context";

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = HTMLMotionProps<"div"> & VariantProps<typeof variants> & {
  isOpen: boolean;
  close: () => void;
}

export default function ModalPopUp(props: Props) {
  const {className, isOpen, close, ...otherProps} = props;

  return (
    <ModalContext.Provider value={{isOpen: isOpen, close: close}}>
      <AnimatePresence>
        {isOpen && (
          <ModalBackground>
            <motion.div
              initial={{translate: "-50% 110%"}}
              animate={{translate: "-50% 0%"}}
              exit={{translate: "-50% 110%"}}
              transition={{duration: 0.3}}
              data-slot="modal-pop-up-content"
              className={variants({
                className: className
              })}
              onMouseUp={(e) => e.stopPropagation()}
              {...otherProps}
            />
          </ModalBackground>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  )
}

ModalPopUp.Header = ModalPopUpHeader;