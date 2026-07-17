import styles from "./navbar-child-modal.module.scss";
import {NavbarCardItemChild} from "../../types/types";
import {Flex, ModalBackground} from "@/shared/ui-kit";
import {motion} from "framer-motion";
import NavbarButton from "../../ui/navbar-button/navbar-button";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";

type Props = {
  items: NavbarCardItemChild[];
  textLeft: boolean;
  checkIsActive: (path?: string, modal?: string) => boolean;
  handleChildClick: (path?: string, modal?: string) => void;
}

const ContainerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const ItemVariantsDesktop = {
  hidden: {
    x: -50,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      damping: 12,
      stiffness: 100,
    },
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const ItemVariantsMobile = {
  hidden: {
    y: 50,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      damping: 12,
      stiffness: 100,
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

export default function NavbarChildModal(props: Props) {
  const isMobile = useBreakpoint("sm");

  const items = props.items.filter((item) => ((
    isMobile && item.hideOnMobile != true) || !isMobile
  ));

  return (
    <>
      <ModalBackground fixScroll/>
      <motion.div
        variants={ContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Flex gap="sm" className={styles["base"]}>
          {items.map((item, index) => (
            <motion.div
              variants={isMobile ? ItemVariantsMobile : ItemVariantsDesktop}
              key={`nav-item-child-${index}`}
            >
              <NavbarButton
                item={item}
                isChild={true}
                textLeft={props.textLeft}
                isActive={props.checkIsActive(item.path, item.modal)}
                onClick={() => props.handleChildClick(item.path, item.modal)}
              />
            </motion.div>
          ))}
        </Flex>
      </motion.div>
    </>
  )
}
