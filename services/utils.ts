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

export const getColor = (value: number) => {
  /**
   * "whiteAlpha" | "blackAlpha" | "gray" | "red" | "orange" | "yellow" | "green"
   * 	| "teal" | "blue" | "cyan" | "purple" | "pink" | "linkedin"
   * 	| "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram"
   */
  if (value <= 17) {
    return "red";
  }

  if (value > 17 && value <= 34) {
    return "purple";
  }

  if (value > 34 && value <= 51) {
    return "blue";
  }

  if (value > 51 && value <= 68) {
    return "teal";
  }

  if (value > 68 && value <= 85) {
    return "cyan";
  }

  if (value > 85 && value <= 99) {
    return "green";
  }

  return "whatsapp";
};
