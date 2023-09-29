"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { RoundTimer } from "./round-timer";

interface IDropdownContent {
  page: string;
  path: string;
}

const pages: IDropdownContent[] = [
  { page: "Home", path: "/" },
  { page: "Background", path: "/background" },
  { page: "Instructions", path: "/instructions" },
  { page: "Notes", path: "/notes" },
  { page: "Suspects", path: "/suspects" },
];

export const BottomNav = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const updatedCurrent = pages.findIndex((p) => p.path === pathname);
    if (current !== updatedCurrent) {
      setCurrent(updatedCurrent);
    }
  }, [pathname]);

  const rotated = open ? "rotate-180" : "rotate-0";

  const handleClick = (idx: number, path: string) => {
    setCurrent(idx);
    push(path);
  };

  return (
    <div className="fixed z-50 bottom-0 left-0 rounded-none collapse bg-primary w-full">
      <input onClick={() => setOpen(!open)} type="checkbox" className="peer" />
      <p className="collapse-title font-bold flex items-center justify-between bg-primary peer-checked:text-secondary-content">
        <span>{pages[current].page}</span>
        <span className={cn(rotated)}>▲</span>
      </p>
      <ul className="w-full collapse-content flex-col-center p-0">
        {pages.map(({ page, path }, idx) => {
          const active = idx === current;

          if (!active)
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
        })}
      </ul>
      <RoundTimer />
    </div>
  );
};
