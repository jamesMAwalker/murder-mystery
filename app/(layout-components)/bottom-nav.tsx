"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Use "next/router" instead of "next/navigation"

import { cn } from "@/lib/utils";
import { RoundTimer } from "./round-timer";

interface IDropdownContent {
  page: string;
  path: string;
  hidden?: boolean;
}

const pages: IDropdownContent[] = [
  { page: "Home", path: "/" },
  { page: "Background", path: "/background" },
  { page: "Instructions", path: "/instructions" },
  { page: "Notes", path: "/notes" },
  { page: "Suspects", path: "/suspects" },
  { page: "Evidence Reports", path: "/reports" },
  { page: "Profile", path: "/user-profile" },
];

export const BottomNav = () => {
  const { push } = useRouter(); // Directly destructure `pathname` from `useRouter()`
  const pathname = usePathname(); // Use `usePathname()` instead of `useRouter().pathname`
  console.log("pathname: ", pathname);
  const [open, setOpen] = useState(false);
  console.log("open: ", open);
  const [current, setCurrent] = useState(0);
  console.log("current: ", current);

  useEffect(() => {
    const updatedCurrent = pages.findIndex((p) => p.path === pathname);
    if (updatedCurrent !== -1 && current !== updatedCurrent) {
      setCurrent(updatedCurrent);
    }
  }, [pathname]);

  const rotated = open ? "rotate-180" : "rotate-0";

  const handleClick = (idx: number, path: string) => {
    setCurrent(idx);
    push(path);
    setOpen(false);
  };

  return (
    <div className="fixed z-50 bottom-0 left-0 rounded-none collapse bg-primary w-full">
      <input onClick={() => setOpen(!open)} type="checkbox" className="peer" />
      <p className="collapse-title font-bold flex items-center justify-between bg-primary peer-checked:text-secondary-content">
        <span>{pages[current].page}</span>
        <span className={cn(rotated)}>▲</span>
      </p>

      <ul className="w-full collapse-content flex-col-center p-0">
        {pages.map(({ page, path, hidden }, idx) => {
          const active = idx === current;

          if (!active && !hidden) {
            return (
              <li
                className={cn(
                  "w-full px-4 py-2 text-primary-content peer-checked:text-secondary-content"
                )}
                onClick={() => handleClick(idx, path)}
                key={page}
              >
                {page}
              </li>
            );
          }
        })}
      </ul>
      <RoundTimer />
    </div>
  );
};
