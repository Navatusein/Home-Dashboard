"use client"

import {cva, VariantProps} from "class-variance-authority";
import styles from "./modal-background.module.scss";
import {HTMLMotionProps, motion} from "framer-motion";
import {useContext, useEffect} from "react";
import {ModalContext} from "@/shared/contexts/modal-context";

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = HTMLMotionProps<"div"> & VariantProps<typeof variants> & {
}

export default function ModalBackground(props: Props) {
  const {className, ...otherProps} = props;

  const modalContext = useContext(ModalContext);

  useEffect(() => {
    document.body.style.overflowY = modalContext.isOpen ? "hidden" : "unset";
    document.body.style.marginRight = modalContext.isOpen ? "4px" : "unset";
  }, [modalContext.isOpen]);

  return (
    <motion.div
      data-slot="modal-background"
      className={variants({
        className: className
      })}
      initial={{backgroundColor: "rgba(0, 0, 0, 0)"}}
      animate={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}
      exit={{backgroundColor: "rgba(0, 0, 0, 0)"}}
      transition={{duration: 0.3}}
      onMouseUp={() => modalContext.close()}
      {...otherProps}
    />
  )
}