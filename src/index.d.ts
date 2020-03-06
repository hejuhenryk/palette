export type ColorT = {
    name: string;
    color: string;
}

export type PaletteT = {
    paletteName: string;
    id: string;
    emoji: string;
    colors: ColorT[]
}
