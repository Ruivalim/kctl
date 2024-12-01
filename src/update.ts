import { promises as fs } from "fs";
import os from "os";
import path from "path";

const INSTALL_PATH = path.join(os.homedir(), ".local", "bin", "kctl");

export const checkForUpdates = async (silent: boolean = false) => {
	const response = await fetch("https://api.github.com/repos/Ruivalim/kctl/releases/latest");
	if (!response.ok) {
		console.error("Failed to fetch release information.");
		return false;
	}

	const release = await response.json() as { tag_name: string, assets: {url: string, name: string, browser_download_url: string}[] };
	const latestVersion = release.tag_name;

	const platform = `${process.platform}-${process.arch}`;

	if (latestVersion !== `v${require('../package.json').version}`) {
		if(silent === false) {
			console.log(`New version available: ${latestVersion}`);
			console.log("Run `kctl --update` to update to the latest version.");
		}

		const asset = release.assets.find((a: any) =>
			a.name.includes(platform)
		);
		if (!asset) {
			console.error("No compatible binary found for your platform.");
			return false;
		}
		return { downloadUrl: asset.browser_download_url, version: latestVersion};
	}

	return false;
}

export const update = async () => {
	const checkUpdate = await checkForUpdates(true);
	if (checkUpdate === false) {
		console.log("You are already on the latest version.");
		return;
	}

	const { downloadUrl, version } = checkUpdate;

	console.log(`Downloading kctl version ${version}...`);
	const tempPath = path.join(os.tmpdir(), "kctl");

	const response = await fetch(downloadUrl);
	if (!response.ok) {
		console.error("Failed to download the binary.");
		return;
	}

	const binary = await response.arrayBuffer();
	await fs.writeFile(tempPath, Buffer.from(binary));
	await fs.chmod(tempPath, 0o755);

	await fs.mkdir(path.dirname(INSTALL_PATH), { recursive: true });
	await fs.rename(tempPath, INSTALL_PATH);

	console.log(`Update complete! Ensure ${path.dirname(INSTALL_PATH)} is in your PATH.`);
	console.log(`To use the updated version, restart your terminal or run:`);
	console.log(`export PATH=$PATH:${path.dirname(INSTALL_PATH)}`);
}
