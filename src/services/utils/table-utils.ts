/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";

import { renderToStaticMarkup } from "react-dom/server";

export const badgeRenderer = (text: string, backgroundColor: string): HTMLElement => {
    const badgeElement = document.createElement("div");
    badgeElement.style.margin = "-3px 0";
    badgeElement.style.display = "flex";
    badgeElement.style.alignItems = "center";
    badgeElement.style.justifyContent = "center";
    badgeElement.style.backgroundColor = backgroundColor;
    badgeElement.style.color = "#fff";
    badgeElement.style.padding = "4px";
    badgeElement.style.borderRadius = "4px";
    badgeElement.style.maxWidth = "60px";
    badgeElement.innerText = text;
    return badgeElement;
};

export const buttonRenderer = (
    reactElement: ReactElement,
    value: any,
    handleClick: (value: any) => void
): HTMLElement => {
    const outputElement = document.createElement("div");
    outputElement.innerHTML = renderToStaticMarkup(reactElement);
    outputElement.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        handleClick(value);
    });
    return outputElement;
};
