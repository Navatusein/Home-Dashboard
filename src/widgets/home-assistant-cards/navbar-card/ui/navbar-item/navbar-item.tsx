"use client"

import {NavbarCardItem} from "../../types/types";
import styles from "./navbar-item.module.scss";
import {Flex} from "@/shared/ui-kit";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import NavbarButton from "../navbar-button/navbar-button";
import {AnimatePresence} from "framer-motion";
import {ModalContext} from "@/shared/contexts/modal-context";
import {useState} from "react";
import NavbarChildModal from "../../ui/navbar-child-modal/navbar-child-modal";

type Props = {
  item: NavbarCardItem;
  textLeft: boolean;
}

export default function NavbarItem(props: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showChildren, setShowChildren] = useState<boolean>(false);

  const checkIsActive = (path?: string, modal?: string) => {
    return path == pathname && (!modal || searchParams.get("modal") == modal)
  }

  const checkIsParentActive = () => {
    return [props.item, ...(props.item.children ?? [])]
      .some((item) => checkIsActive(item.path, item.modal));
  };

  const navigate = (path?: string, modal?: string) => {
    let resultPath = path ?? pathname;

    if (modal)
      resultPath += `?modal=${modal}`;

    router.push(resultPath);
  }

  const handleParentClick = () => {
    if (props.item.children !== undefined)
      setShowChildren(!showChildren);
    else
      navigate(props.item.path, props.item.modal);
  }

  const handleChildClick = (path?: string, modal?: string) => {
    navigate(path, modal);
    setShowChildren(false);
  }

  return (
    <Flex className={styles["base"]}>
      <NavbarButton
        item={props.item}
        isChild={false}
        isActive={checkIsParentActive()}
        onClick={() => handleParentClick()}
      />
      {props.item.children && (
        <ModalContext.Provider value={{isOpen: showChildren, close: () => setShowChildren(false)}}>
          <AnimatePresence>
            {showChildren && (
              <NavbarChildModal
                items={props.item.children}
                textLeft={props.textLeft}
                checkIsActive={checkIsActive}
                handleChildClick={handleChildClick}
              />
            )}
          </AnimatePresence>
        </ModalContext.Provider>
      )}
    </Flex>
  )
}
