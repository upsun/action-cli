import * as core from '@actions/core'
import { CommandCLI, UtilsCommand } from "./base/command";


export class RouteCmd extends CommandCLI {
    static CMD = "route:list"

    protected _isValid(): boolean {
        return true &&
            (this.ctx.projectId !== '') &&
            (this.ctx.branch !== '')
    }

    async do(): Promise<string> {
        core.info(`Call Command : ${ RouteCmd.CMD }`);

        const param = UtilsCommand.getProjectEnvirnmentParams(this.ctx);
        const result = await this._exec(RouteCmd.CMD, param);

        return result.stdout;
    }
}
