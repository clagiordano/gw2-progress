export interface IGroup {
    id: string;
    name: string;
    description: string;
    order: number;
    categories: ICategory[];
    gPtsPercent: number;
    ugPts: number;
    gPts: number;
}

export interface ICategory {
    id: number;
    name: string;
    description: string;
    order: number;
    icon: string;
    achievements: IAchievement[];
    cPtsPercent: number;
    ucPts: number;
    cPts: number;
}

export interface IAchievement {
    id: number;
    icon?: string;
    name: string;
    description: string;
    requirement: string;
    locked_text: string;
    type: string; // default or itemset -> collections
    flags: string[];
    tiers: ITier[];
    prerequisites: number[];
    rewards?: IReward[]
    bits?: IBit[]
    aPtsPercent: number;
    uaPts: number;
    aPts: number;
    point_cap: number;
    done?: boolean;
}

export interface ITier {
    count: number;
    points: number;
}

export interface IReward {
    type: string,
    region: string,
    id: number
}

export interface IBit {
    type: string,
    text: string,
    // image?: string,
}

export interface IProgress {
    id: number,
    bits?: IBit[],
    current?: number,
    max?: number,
    done: boolean,
    repeated?: number,
    unlocked?: boolean
}

export interface IAchievements {
    [key: number]: IAchievement[]
}
