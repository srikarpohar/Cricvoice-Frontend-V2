import { ReactNode } from "react";

export interface IDropdownOption {
    value: string | Object;
    label: string;
    href?: string;
    onClick?: Function
}

export interface IDropdownProps {
    title: ReactNode;
    options: IDropdownOption[];
}