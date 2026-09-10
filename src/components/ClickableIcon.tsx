import type { Icon } from "@phosphor-icons/react";
import { useState } from "react";

export function ClickableIcon({Icon, size, color}: {Icon: Icon, size: number, color?: string}) {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);

    return (
        <Icon 
            size={size} 
            color={color}
            weight={active ? "fill" : hover ? "duotone" : "regular"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {setHover(false); setActive(false);}}
            onPointerDown={() => setActive(true)}
            onPointerUp={() => setActive(false)}
        />
    );
}