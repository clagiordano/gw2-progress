// import { promises as fs } from "fs";

// async function load(path: string) {
//   const data = await fs.readFile(path, "utf-8");
//   return JSON.parse(path);
// }

// async function save(data: any, path: string) {
//   return fs.writeFile(path, JSON.stringify(data, null, 4));
// }

// export const jsonFile = {
//   load,
//   save,
// };

export const getProgressIndex = (value: number) => {
  if (value <= 14) return 0;
  if (value <= 28) return 1;
  if (value <= 42) return 2;
  if (value <= 56) return 3;
  if (value <= 70) return 4;
  if (value <= 84) return 5;
  if (value <= 97) return 6;
  return 7;
};
