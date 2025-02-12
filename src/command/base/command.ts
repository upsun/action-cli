import * as exec from '@actions/exec'
import path from 'path';

/**
 * Context of command.
 */
export class Context {
  home: string = path.join('/home/runner/.local/bin', '.psh'); //TODO fix this !!

  constructor(
    public readonly cliProvider: string,
    public readonly cliVersion: string,
    public readonly cliToken: string,
    public readonly projectId: string,
    public readonly branch: string)
    {}
}

/**
 * Toolbox/'Builder' of command parameter.
 */
export abstract class UtilsCommand {
  static getProjectParams(ctx: Context) {
    return ['-p', ctx.projectId]
  }

  static getProjectEnvirnmentParams(ctx: Context) {
    const result = this.getProjectParams(ctx);

    return result.concat(['-e', ctx.branch]);
  }
}


export interface Command {

  /**
   * Do action !
   */
  do(): Promise<string>;

}

/**
 * Generic base command.
 */
export abstract class CommandNeutral implements Command {
  /**
   * Constructor
   * @param ctx Current context. 
   */
  constructor(public readonly ctx: Context) {}

  do(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

/**
 * Command base use CLI.
 */
export abstract class CommandCLI extends CommandNeutral {

  /**
   * Check if valid (Parameters...)
   * @returns True if valid.
   */
  protected abstract _isValid(): boolean;

  /**
   * Internal function to Execute CLI command.
   * 
   * @param ctx Current context.
   * @param cmd Command to call.
   * @param param Parameter of the command.
   * @returns Output
   */
  protected async _exec(cmd: string, param: string[]): Promise<exec.ExecOutput> {
    if (this._isValid()) {
      param.unshift(cmd);

      return await exec.getExecOutput(
        this.ctx.cliProvider,
        param, 
        {env:{
          UPSUN_CLI_HOME: this.ctx.home,
          UPSUN_CLI_TOKEN: this.ctx.cliToken,
        }}
      );

    } else {
      return {exitCode: -1, stderr: 'Command is invalid !', stdout: ''};
    }
  }
}
