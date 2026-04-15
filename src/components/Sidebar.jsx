import React from "react";
import { Moon, Sun } from "lucide-react";

export default function Sidebar({ darkMode, onToggleDark }) {
  const sidebarBg = darkMode ? "hsl(233 30% 11%)" : "hsl(233 32% 18%)";
  const borderColor = darkMode
    ? "hsl(233 28% 22%)"
    : "hsla(233, 30%, 16%, 0.45)";
  const textColor = darkMode ? "hsl(240 20% 88%)" : "hsl(231 28% 22%)";

  return (
    <div
      style={{
        width: 103,
        minWidth: 103,
        background: sidebarBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "120px 0 24px",
        borderRight: `1px solid ${borderColor}`,
        position: "relative",
        zIndex: 1002,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          width: "100%",
        }}
      >
        {/* Logo panel */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 103,
            height: 103,
            borderRadius: "0 44px 44px 0",
            overflow: "hidden",
          }}
        >
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <button
          onClick={onToggleDark}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "none",
            background: darkMode
              ? "rgba(255,255,255,0.08)"
              : "rgba(15, 23, 42, 0.05)",
            color: textColor,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} color="#7E88C3" />}
        </button>

        <div
          style={{
            width: "100%",
            height: 1,
            background: darkMode
              ? "rgba(255,255,255,0.16)"
              : "rgba(93, 101, 128, 0.35)",
            borderRadius: 1,
          }}
        />

        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 24,
            overflow: "hidden",
            background: "#fff",
            boxShadow: darkMode
              ? "0 16px 24px rgba(0,0,0,0.18)"
              : "0 16px 24px rgba(124,93,250,0.08)",
          }}
        >
          <img
            src="/avatar.png"
            alt="User"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}
