import {ReactNode} from "react";
import {Typography} from "@/shared/ui-kit";
import {ColorToken} from "@/shared/constants/colors";
import styles from "./distribution-node.module.scss";

type Props = {
  title: string;
  color: ColorToken;
  left: number;
  top: number;
  children: ReactNode;
}

export default function DistributionNode(props: Props) {
  return (
    <div
      className={styles["base"]}
      style={{
        left: props.left,
        top: props.top,
        ["--node-color" as never]: `var(--color-${props.color})`,
      }}
    >
      <div className={styles["circle"]}>
        {props.children}
      </div>
      <Typography.Text fontSize="sm" textColor="secondary">
        {props.title}
      </Typography.Text>
    </div>
  )
}
