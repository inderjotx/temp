import * as glob from "glob";

interface CompanyConfig {
  name: string;
  url: string;
}


// Function to load a single company config dynamically
async function loadConfig(file: string): Promise<CompanyConfig> {
  const module = await import(file);
  return module; // Assuming the configs use `export default`
}

// Function to load all configs and return a promise
export async function loadAllConfigs(): Promise<Record<string, CompanyConfig>> {
  const files = glob.sync(`${__dirname}/**/*.config.js`);
  const configs: Record<string, CompanyConfig> = {};

  for (const file of files) {
    const config = await loadConfig(file);
    const companyId = file
      .substr(file.lastIndexOf("/") + 1)
      .replace(/\.config\.js$/, ""); // Properly escape the dot
    configs[companyId] = config;
  }

  return configs; // Return the compiled dictionary of configurations
}

// Example of how you might use loadAllConfigs in another part of your application
// Not needed if you just want to export the function
