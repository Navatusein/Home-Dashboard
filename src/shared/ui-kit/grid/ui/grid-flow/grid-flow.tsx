import {Children, cloneElement, isValidElement, ReactElement, ReactNode} from "react";
import {GridFlowDirection, GridPlacementProps} from "../../types/types";

type Props = {
  direction: GridFlowDirection;
  rowStart?: number;
  colStart?: number;
  children: ReactNode;
}

export default function GridFlow(props: Props) {
  const {direction, rowStart, colStart, children} = props;

  let cursor = (direction == "horizontal" ? colStart : rowStart) ?? 1;

  return Children.map(children, child => {
    if (!isValidElement(child)) return child;

    const childProps = child.props as GridPlacementProps;
    const element = child as ReactElement<GridPlacementProps>;

    if (direction == "horizontal") {
      const childColStart = childProps.colStart ?? cursor;
      cursor = childColStart + (childProps.colSpan ?? 1);
      return cloneElement(element, {colStart: childColStart});
    }

    const childRowStart = childProps.rowStart ?? cursor;
    cursor = childRowStart + (childProps.rowSpan ?? 1);
    return cloneElement(element, {rowStart: childRowStart});
  });
}