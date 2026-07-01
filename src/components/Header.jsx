import { useEffect, useState } from "react";
import SelectTheme from "./SelectTheme";

const Header = () => {
    return (
        <header className="app-header">
            <div className="mx-auto flex max-w-6xl justify-between items-center gap-6  py-4 px-5">
                <a href="/" className="text-lg font-bold tracking-normal">тренажер собеседований</a>
                <SelectTheme />
            </div>
        </header>
    );
}

export default Header;
