import React from "react";

export default function EnvelopeIcon({
  width = 18,
  height = 18,
  color = "black",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 4C0 2.89543 0.895431 2 2 2H14C15.1046 2 16 2.89543 16 4V12C16 13.1046 15.1046 14 14 14H2C0.895431 14 0 13.1046 0 12V4ZM2 3C1.44772 3 1 3.44772 1 4V4.2169L8 8.4169L15 4.2169V4C15 3.44772 14.5523 3 14 3H2ZM15 5.3831L10.2919 8.20794L15 11.1052V5.3831ZM14.9662 12.2586L9.32583 8.7876L8 9.5831L6.67417 8.7876L1.03376 12.2586C1.14774 12.6855 1.53715 13 2 13H14C14.4628 13 14.8523 12.6855 14.9662 12.2586ZM1 11.1052L5.70808 8.20794L1 5.3831V11.1052Z"
        fill={color}
      />
    </svg>
  );
}
