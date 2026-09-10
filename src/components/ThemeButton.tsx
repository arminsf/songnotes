import { useState } from "react";

import { SunIcon } from "@phosphor-icons/react/dist/csr/Sun";
import { MoonStarsIcon } from "@phosphor-icons/react/dist/csr/MoonStars";
import { ClickableIcon } from "./ClickableIcon";

export function ThemeButton() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  return (
    <button
      onClick={() => {
        document.documentElement.classList.toggle("dark");
        setDark(document.documentElement.classList.contains("dark"));
      }}
    >
      {dark ? (
        <ClickableIcon Icon={MoonStarsIcon} size={24} />
      ) : (
        <ClickableIcon Icon={SunIcon} size={24} />
      )}
    </button>
  );
}
