import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import fs from 'fs';
import path from 'path';
import { CommandNeutral, Context } from './base/command';

const INSTALLER = 'installer.sh';

export class Installer extends CommandNeutral {
  readonly _installerPath: string;
  binPath: string;

  constructor(ctx: Context) {
    super(ctx);

    // Get Github Workspace.
    let githubWorkspacePath = process.env['GITHUB_WORKSPACE']
    if (!githubWorkspacePath) {
      throw new Error('GITHUB_WORKSPACE not defined');
    }
    githubWorkspacePath = path.resolve(githubWorkspacePath)

    //TODO get from cache
    this._installerPath = `./${INSTALLER}`;
    this.binPath = path.resolve('/home/runner/.local/bin');  //TODO use var-env
  }

  async do(): Promise<string> {
    if (!this.cliExist()) {
      core.info('No CLI found, download and install it!');

      await this.downloadInstaller();
      await this.runInstaller();

    } else {
      core.info('CLI found!');
    }

    return '';
  }

  cliExist(): boolean {
    return fs.existsSync(path.join(this.binPath, this.ctx.cliProvider));
  }

  async downloadInstaller(): Promise<void> {
    core.info(`Download Installer...`);

    const res = await fetch(
      'https://raw.githubusercontent.com/platformsh/cli/main/installer.sh',
    );
    
    if (!res.ok) {
      throw new Error(`Download error: ${res.statusText}`);
    }

    const fileStream = fs.createWriteStream(this._installerPath);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fileStream.write(buffer);
    fileStream.end();
  }

  async runInstaller(): Promise<void> {
    core.info(`Run Installer...`);

    await io.mkdirP(path.join(this.binPath, '.psh'));
    await exec.exec('bash',
      [this._installerPath], 
      {env:{
        PATH: process.env['PATH'] || '',
        VENDOR: this.ctx.cliProvider,
        VERSION: this.ctx.cliVersion,
        INSTALL_DIR: this.binPath,
        INSTALL_METHOD: 'raw'
      }})
  }
}
