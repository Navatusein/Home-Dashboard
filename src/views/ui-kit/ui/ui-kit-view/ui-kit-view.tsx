import {Flex} from "@/shared/ui-kit";
import TypographyTitlePart from "../typography-title-part/typography-title-part";
import TypographyParagraphPart from "../typography-paragraph-part/typography-paragraph-part";
import BootstrapGridPart from "../bootstrap-grid-part/bootstrap-grid-part";
import CardClickablePart from "../card-clickable-part/card-clickable-part";
import GridPart from "../grid-part/grid-part";
import ModalPopUpPart from "../modal-pop-up-part/modal-pop-up-part";
import ButtonPart from "../button-part/button-part";
import SpacePart from "../space-part/space-part";
import SliderPart from "../slider-part/slider-part";
import SegmentHeaderPart from "../segment-header-part/segment-header-part";
import TypographyTextPart from "../typography-text-part/typography-text-part";
import ChipsPart from "../chips-part/chips-part";
import RoundedIconPart from "../rounded-icon-part/rounded-icon-part";
import DropdownPart from "../dropdown-part/dropdown-part";

export default function UiKitView() {
  return (
    <Flex vertical={true} gap="sm" style={{padding: 10}}>
      <TypographyTitlePart/>
      <TypographyParagraphPart/>
      <TypographyTextPart/>
      <BootstrapGridPart/>
      <CardClickablePart/>
      <GridPart/>
      <ModalPopUpPart/>
      <ButtonPart/>
      <SpacePart/>
      <SliderPart/>
      <SegmentHeaderPart/>
      <ChipsPart/>
      <RoundedIconPart/>
      <DropdownPart/>
    </Flex>
  )
}
