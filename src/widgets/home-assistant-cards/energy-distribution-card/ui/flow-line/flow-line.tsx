import {ColorToken} from "@/shared/constants/colors";

type Props = {
  path: string;
  color: ColorToken;
  active: boolean;
}

export default function FlowLine(props: Props) {
  return (
    <g style={{color: `var(--color-${props.color})`}}>
      <path d={props.path} fill="none" stroke="currentColor" strokeWidth={2}/>
      {props.active && (
        <circle r={4} fill="currentColor">
          <animateMotion dur="3s" repeatCount="indefinite" path={props.path}/>
        </circle>
      )}
    </g>
  )
}
