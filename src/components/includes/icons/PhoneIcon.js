import React from "react";

export default function PhoneIcon({
  width = 18,
  height = 18,
  color = "black",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2V3C15 3.55228 14.5523 4 14 4H10C9.44772 4 9 3.55228 9 3V2Z"
        fill={color}
      />
      <rect
        x="5.75"
        y="1.75"
        width="12.5"
        height="20.5"
        rx="1.75"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M9 19.5H15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
