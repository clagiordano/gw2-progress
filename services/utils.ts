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
  if (value <= 25) {
    return "red";
  }

  if (value > 25 && value <= 65) {
    return "purple";
  }

  if (value > 65 && value <= 85) {
    return "teal";
  }

  if (value > 85 && value < 100) {
    return "green";
  }

  return "blue";
};
