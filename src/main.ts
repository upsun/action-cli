import * as core from '@actions/core'
import { Command, Context } from './command/base/command';

import { Installer } from './command/installer';
import { RouteCmd } from './command/route';
import { UndefinedCmd } from './command/undefined';


export async function run(): Promise<void> {
  try {
    // Input section
    const cliProvider = core.getInput('cli_provider') || 'upsun';
    const cliVersion = core.getInput('cli_version');
    const cliToken = core.getInput('cli_token');
    const projectId = core.getInput('project_id');
    const branch = core.getInput('environment_name');
    const cmd = core.getInput('command')

    // Transform to context (more simple with one object).
    const ctx = new Context (
      cliProvider,
      cliVersion,
      cliToken,
      projectId,
      branch
    );

    core.info(`Install ${ctx.cliProvider} CLI, version: ${ctx.cliVersion}`);

    // Hide secret value!
    if (ctx.cliToken != '') {
      core.setSecret(ctx.cliToken);
      core.setSecret(ctx.projectId);
    }

    // Main Workflow
    try {
      // Check and install CLI.
      core.startGroup('Prepare CLI...');
      const installer = new Installer(ctx)
      await installer.do();
      //TODO ctx.home = installer.home
      core.endGroup();

      // Check and run command.
      let result: string = '';
      if (cmd != '') {
        core.startGroup('Run CLI command...');

        let objCmd: Command;
        switch(cmd) {
          case RouteCmd.CMD: objCmd = new RouteCmd(ctx); break;
          case RouteCmd.CMD: objCmd = new RouteCmd(ctx); break;
          default: objCmd = new UndefinedCmd(ctx);
        }
        result = await objCmd.do();

        core.endGroup();
      }

      // Result to return.
      core.setOutput('result', result)

    } finally {
      //TODO 
    }
  } catch (error) {
    const msg = (error as any)?.message ?? error;
    core.setFailed(`${msg}`)
  }
}

async function cleanup(): Promise<void> {
  try {
    core.info(`Cleanup!`);
    
  } catch (error) {
    core.warning(`${(error as any)?.message ?? error}`)
  }
}

/**
 * Indicates whether the POST action is running
 */
const keyIsPost = 'isPost';
export const IsPost = !!core.getState(keyIsPost)

// Main
if (!IsPost) {
  run()
  core.saveState(keyIsPost, true)
}
// Post
else {
  cleanup()
  core.saveState(keyIsPost, false)
}
