"use client"

import {ComponentProps, useContext} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./modal-pop-up-header.module.scss";
import {Button, Icon, Typography} from "@/shared/ui-kit";
import {mdiClose} from '@mdi/js';
import {ModalContext} from "@/shared/contexts/modal-context";

const variants = cva(
  styles["header"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = Omit<ComponentProps<"div">, "children"> & VariantProps<typeof variants> & {
  title: string
  icon?: string;
}

export default function ModalPopUpHeader(props: Props) {
  const {className, title, icon, ...otherProps} = props;

  const modalContext = useContext(ModalContext);

  return (
    <div data-slot="modal-pop-up-header" className={styles["base"]}>
      <div
        className={variants({
          className: className
        })}
        {...otherProps}
      >
        {icon && (
          <div className={styles["icon-container"]}>
            <Icon path={icon}/>
          </div>
        )}
        <Typography.Paragraph className={styles["title"]}>
          {title}
        </Typography.Paragraph>
      </div>
      <Button
        icon={mdiClose}
        shape="round"
        onClick={() => modalContext.close()}
      />
    </div>
  )
}