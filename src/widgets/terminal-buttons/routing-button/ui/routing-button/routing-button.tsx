import {BaseButton, BaseButtonProps} from "@/widgets/terminal-buttons/base-button";
import {usePathname, useRouter} from "next/navigation";

import ArrowBackIcon from "@public/icons/symbols/arrow-back.svg"
import {buildPath} from "@/shared/helpers/terminal-path-builder";

type Props = BaseButtonProps & {
  path: string,
}

export default function RoutingButton(props: Props) {
  const {path, title, icon, ...otherProps} = props;

  const pathname = usePathname();
  const router = useRouter();

  return (
    <BaseButton
      icon={path == pathname ? ArrowBackIcon : icon}
      title={title}
      onClickAction={() => router.push(path == pathname ? buildPath() : path)}
      {...otherProps}
    />
  )
}