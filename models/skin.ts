export default interface Skin {
    id: number;
    name: string;
    type: string;
    flags: string[];
    restrictions: string[];
    rarity: string;
    icon: string;
    details: {
        type: string;
        weight_class: string;
    };
    dye_slots: {
        default: {
            color_id: number;
            material: string;
        }[];
        overrides: Record<string, never>;
    };
}
