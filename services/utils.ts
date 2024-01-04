import fs from 'fs';

export default function jsonFile() {
	function load(path: string): any {
		return JSON.parse(fs.readFileSync(path));
	}

	function save(data: any, path: string): void {
		fs.writeFileSync(path, JSON.stringify(data, null, 4));
	}
}
