import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";

const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    baseProfile="basic"
    x="0px"
    y="0px"
    viewBox="0 0 48 48"
    xmlSpace="preserve"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g id="Layer_10" />
    <g id="win10" />
    <g id="ssm" />
    <g id="mat_2" />
    <g id="ios" />
    <g id="fluent">
      <polygon
        style={{
          fill: "#616161",
        }}
        points="41,6 9.929,42 6.215,42 37.287,6  "
      />
      <polygon
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          fill: "#FFFFFF",
        }}
        points="31.143,41 7.82,7 16.777,7 40.1,41  "
      />
      <path
        style={{
          fill: "#616161",
        }}
        d="M15.724,9l20.578,30h-4.106L11.618,9H15.724 M17.304,6H5.922l24.694,36h11.382L17.304,6L17.304,6z"
      />
    </g>
  </svg>
);
export const X = forwardRef(SvgComponent);
