import React from "react";
import { Moon, Sun } from "lucide-react";

export default function Sidebar({ darkMode, onToggleDark }) {
  return (
    <div className="w-[103px] min-w-[103px] bg-[hsl(233_32%_18%)] dark:bg-[hsl(233_30%_11%)] flex flex-col justify-between items-center pt-32 pb-16 px-0 border-r border-[hsla(233,30%,16%,0.45)] dark:border-[hsl(233_28%_22%)] relative z-[1002]">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="absolute left-0 top-0 w-[103px] h-[103px] rounded-r-[44px] overflow-hidden">
          <svg
            width="103"
            height="103"
            viewBox="0 0 103 103"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path
              d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z"
              fill="#7C5DFA"
            />
            <mask
              id="mask0_1_154"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="103"
              height="103"
            >
              <path
                d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_1_154)">
              <path
                d="M103 52H20C8.95431 52 0 60.9543 0 72V135C0 146.046 8.95431 155 20 155H103V52Z"
                fill="#9277FF"
              />
            </g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M42.6942 33.292L52 51.9998L61.3058 33.292C67.6645 36.6406 72 43.3139 72 50.9998C72 62.0454 63.0457 70.9998 52 70.9998C40.9543 70.9998 32 62.0454 32 50.9998C32 43.3139 36.3355 36.6406 42.6942 33.292Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <button
          onClick={onToggleDark}
          className="w-10 h-10 rounded-full border-none bg-[rgba(15,23,42,0.05)] dark:bg-[rgba(255,255,255,0.08)] text-[hsl(231_28%_22%)] dark:text-[hsl(240_20%_88%)] cursor-pointer grid place-items-center"
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} color="#7E88C3" />}
        </button>

        <div className="w-full h-0.5 bg-[rgba(93,101,128,0.35)] dark:bg-[rgba(255,255,255,0.16)] rounded" />

        <div className="w-[46px] h-[46px] rounded-[24px] overflow-hidden bg-white shadow-[0_16px_24px_rgba(124,93,250,0.08)] dark:shadow-[0_16px_24px_rgba(0,0,0,0.18)]">
          <img
            src="/avatar.png"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
