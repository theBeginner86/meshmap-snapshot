import { getFormattedDateTime } from "./playwrightSetup";
const path = require("path");

//Defining test functions for playwright to be used in the spec file

//Login to be used for settingup tests
export async function login(page, username, password) {
	await page.goto("https://meshery.layer5.io/login");
	await page.locator('input[name="identifier"]').fill(username);
	// Press the Tab key (to move to the password field)
	await page.locator('input[name="identifier"]').press("Tab");
	await page.fill('input[name="password"]', password);
	await page.waitForSelector('input[name="password"]');
	await page.fill('input[name="password"]', password);

	// Wait for the "Sign in" button to appear and then click it
	const signInButton = await page.waitForSelector('button[type="submit"]');
	await signInButton.click();
	await page.locator('a[href="/logout"]');
	await page.close();
}

export async function MesheryPlayground(page) {
	await page.goto("https://playground.meshery.io/");
	const mesheryHeading = await page.locator('h1:has-text("Meshery")');
	// Describe the "Dashboard" element
	await page.locator('h2:has-text("Dashboard")');
	await page.locator('a[href="/management"]');
	await page.locator('a[href="/configuration/application"]');
	await page.locator('a[href="/performance"]');
	await page.locator('a[href="/extension"]');
	await page.locator('a[href="/extension/meshmap"]');
	await page.close();
}

export async function MeshMap(page) {
	await page.goto("https://playground.meshery.io/extension/meshmap");
	//meshMapBetaHeading
	await page.locator("h1:has-text(/MeshMaps*beta/i)");
	// Use page.locator() to describe the headings under "MeshMap beta."
	await page.locator('h1:has-text(/MeshMap\\s*beta/i) + h2:has-text("Designs")');
	await page.locator('h1:has-text(/MeshMap\\s*beta/i) + h2:has-text("Components")');
	await page.locator('h1:has-text(/MeshMap\\s*beta/i) + h2:has-text("Applications")');
	await page.close();
}

export async function meshmapdesign(page, applicationId) {
	const customUrl = `https://playground.meshery.io/extension/meshmap`;
	await page.goto(customUrl);
	const applicationsSection = await page.locator(
		'h1:has-text(/MeshMap\\s*beta/i) + h2:has-text("Applications")'
	);
	// Find the "Name" heading under the "Applications" section
	const nameLabel = await applicationsSection.locator('label:has-text("Name")');
	const appUrl = `https://playground.meshery.io/extension/meshmapmeshmap?application=${applicationId}`;
	await page.goto(appUrl);
	const fileName = getFormattedDateTime();
	const filePath = path.join(__dirname, fileName);
	//capture and Save meshmapscreenshot and generate a download link.
	await page.screenshot({ path: filePath });

	// Return the download link for the captured screenshot
	const downloadLink = `/download?fileName=${encodeURIComponent(fileName)}`;
	console.log(`Screenshot saved as ${fileName}`);
	console.log("Download link:", downloadLink);
	return downloadLink;
}
