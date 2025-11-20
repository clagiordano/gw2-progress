export interface Item {
    name: string;
    type: string;
    level: number;
    rarity: string;
    vendor_value: number;
    default_skin: number;
    game_types: string[];
    flags: string[];
    restrictions: string[];
    id: number;
    chat_link: string;
    icon: string;
    details?: ItemDetails;
}
export interface ItemDetails {
    type: string;
    damage_type?: string;
    min_power?: number;
    max_power?: number;
    defense?: number;
    stat_choices?: number[];
    attribute_adjustment?: number;
    secondary_suffix_item_id?: string;
    bonuses?: string[];
}

export interface TypeGroup {
  type: string;
  count: number;
  subtypes: { subtype: string | null; count: number; rarities: { rarity: string; count: number }[] }[];
}

export interface ItemResult {
  id: number;
  created_at: string;
  updated_at: string | null;
  data: Item;
}
