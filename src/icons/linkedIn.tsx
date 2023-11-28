import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";

const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 48 48"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <path
      style={{
        fill: "#0288D1",
      }}
      d="M8.421,14h0.052h0C11.263,14,13,12,13,9.5C12.948,6.945,11.263,5,8.526,5C5.789,5,4,6.945,4,9.5  C4,12,5.736,14,8.421,14z"
    />
    <rect
      x={4}
      y={17}
      style={{
        fill: "#0288D1",
      }}
      width={9}
      height={26}
    />
    <path
      style={{
        fill: "#0288D1",
      }}
      d="M44,26.5c0-5.247-4.253-9.5-9.5-9.5c-3.053,0-5.762,1.446-7.5,3.684V17h-9v26h9V28h0  c0-2.209,1.791-4,4-4s4,1.791,4,4v15h9C44,43,44,27.955,44,26.5z"
    />
  </svg>
);
export const LinkedIn = forwardRef(SvgComponent);
