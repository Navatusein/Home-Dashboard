import {ModalContext} from "@/shared/contexts/modal-context";
import {ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Grid, ModalBackground} from "@/shared/ui-kit";

const AMINATION_DURATION = 0.1;
const ANIMATION_DELAY = 0.2;

type Props = {
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}

export default function TerminalModal(props: Props) {
  return (
    <ModalContext.Provider value={{isOpen: props.isOpen, close: props.close}}>
      <AnimatePresence>
        {props.isOpen && (
          <ModalBackground duration={AMINATION_DURATION} exitDelay={ANIMATION_DELAY}>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 100}}
              exit={{opacity: 0, transition: {delay: ANIMATION_DELAY}}}
              transition={{duration: AMINATION_DURATION}}
              style={{height: "100%"}}
            >
              <Grid columns={12} rows={7} gap="xxs" style={{height: "100%"}}>
                {props.children}
              </Grid>
            </motion.div>
          </ModalBackground>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  )
}
