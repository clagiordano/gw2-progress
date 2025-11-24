import { Item } from "./item";
import Skin from "./skin";

export interface Group {
    id: string;
    name: string;
    description: string;
    order: number;
    categories: Category[];
    gPtsPercent: number;
    ugPts: number;
    gPts: number;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    order: number;
    icon: string;
    achievements: Achievement[];
    cPtsPercent: number;
    ucPts: number;
    cPts: number;
}

export interface Achievement {
    id: number;
    icon?: string;
    name: string;
    description: string;
    requirement: string;
    locked_text: string;
    type: string; // default or itemset -> collections
    flags: string[];
    tiers: Tier[];
    prerequisites: number[];
    rewards?: Reward[]
    bits?: Bit[]
    aPtsPercent: number;
    uaPts?: number;
    aPts?: number;
    point_cap: number;
    done?: boolean;
}

export interface Tier {
    count: number;
    points: number;
}

export interface Reward {
    type: "Coins" | "Item" | "Mastery" | "Title",
    region: string, // for masteries
    count?: number, // for coins and items
    id: number, // for items and masteries or title id
    item?: Item,
    mastery?: Mastery,
    title?: Title
}

export interface Title {
    id: number,
    name: string,
    achievement: number,
    achievements: number[],
    ap_required?: number
}

export interface Mastery {
    id: number,
    name: string,
    requirement: string,
    order: number,
    background: string,
    region: string,
    levels: {
        name: string,
        description: string,
        instruction: string,
        icon: string,
        point_cost: number,
        exp_cost: number
    }[]
}

/**
 * bits (array of objects, optional) - Contains a number of objects,
 * each corresponding to a bitmask value that can give further information on the progress towards the achievement.
 */
export interface Bit {
    type: "Text" | "Item" | "Minipet" | "Skin",
    id?: number
    text?: string,
    item?: Item,
    skin?: Skin,
    minipet?: Minipet
}

export interface Minipet {
    id: number,
    name: string,
    unlock: string
    icon: string
    order: number
    item_id: number
}

export interface Progress {
    id: number,
    bits?: Bit[],
    current?: number,
    max?: number,
    done: boolean,
    repeated?: number,
    unlocked?: boolean
}

export interface Achievements {
    [key: number]: Achievement[]
}


export interface AnalizedProgress {
    achievements: Group[],
    totalPoints: number,
    userTotalPoints: number,
    totalPercent: number
}
