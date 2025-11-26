export interface Account {
	id: string;
	age: number;
	name: string;
	world: {
		id: number;
		name: string;
		population: "Low" | "Medium" | "High" | "VeryHigh" | "Full";
	};
	guilds: any[];
	guild_leader: any[];
	created: string;
	access: string[];
	commander: boolean;
	fractal_level: number;
	daily_ap: number;
	monthly_ap: number;
	wvw_rank: number;
	last_modified: string;
	build_storage_slots: number;
}
