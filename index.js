import core from "@actions/core";
import exec from "@actions/exec";
import io from "@actions/io";
import { promises as fs } from "node:fs";
import path from "node:path";

const WORKSPACE = process.env.GITHUB_WORKSPACE || process.cwd();

async function run() {
  try {
    const filePath = core.getInput("path") || "domain-profile.json";
    const absPath = path.resolve(WORKSPACE, filePath);

    core.startGroup("AI Domain Data: Preparing workspace");
    core.info(`Validating file: ${absPath}`);

    try {
      await fs.access(absPath);
    } catch {
      core.setFailed(
        `domain-profile.json not found at ${absPath}. Ensure the path input points to your AI Domain Data record.`
      );
      return;
    }

    await setupCli();
    core.endGroup();

    core.startGroup("AI Domain Data: Running aidd validate");
    const exitCode = await exec.exec("npx", ["@ai-domain-data/cli@latest", "aidd", "validate", `--path=${absPath}`]);
    core.endGroup();

    if (exitCode !== 0) {
      core.setFailed("AI Domain Data validation failed. See logs above for details.");
      return;
    }

    core.info("✅ AI Domain Data validation passed (v0.1.1 schema, backward-compatible with v0.1).");
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

async function setupCli() {
  core.info("Installing AI Domain Data CLI");

  await exec.exec("npm", ["install", "@ai-domain-data/cli@latest"], {
    cwd: WORKSPACE
  });
}

run();

