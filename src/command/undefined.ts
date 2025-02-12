import * as core from '@actions/core'
import { CommandNeutral } from "./base/command";


export class UndefinedCmd extends CommandNeutral {

    protected _isValid(): boolean {
        return true;
    }

    async do(): Promise<string> {
        core.info(`Undefined Command`);
        return 'Not implemented !';
    }
}
