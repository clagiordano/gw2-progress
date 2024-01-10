import { promises as fs } from 'fs';

async function load(path: string) {
	const data = await fs.readFile(path, 'utf-8');
	return JSON.parse(path);
}

async function save(data: any, path: string) {
	return fs.writeFile(path, JSON.stringify(data, null, 4));
}

export const jsonFile = {
	load,
	save
};

