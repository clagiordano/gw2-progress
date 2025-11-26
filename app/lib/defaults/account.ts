import { Account } from "@/models/account";

export const initialAccountState: Account = {
  id: "",
  name: "",
  age: 0,
  last_modified: "",
  world: {
    id: 0,
    name: "",
    population: "Full",
  },
  guilds: [],
  guild_leader: [],
  created: "",
  access: ["None"],
  commander: false,
  fractal_level: 0,
  daily_ap: 0,
  monthly_ap: 0,
  wvw_rank: 0,
  build_storage_slots: 0,
};
