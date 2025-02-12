
import { Context } from './base/command';
import { UndefinedCmd } from './undefined';

jest.mock('@actions/core');

describe('RouteCmd', () => {
    let undefinedCmd: UndefinedCmd;
    let mockCtx: Context;

    beforeEach(() => {
        mockCtx = new Context('', '', '', 'test-project', 'main');
        undefinedCmd = new UndefinedCmd(mockCtx);
    });

    test('_isValid() is true when projectId and branch are set', () => {
        expect(undefinedCmd['_isValid']()).toBe(true);
    });

    test('_isValid() is true when no projectId and/or no branch are set', () => {
        const mockCtxFail = new Context('', '', '', '', '');
        const routeCmdFail = new UndefinedCmd(mockCtxFail);

        expect(routeCmdFail['_isValid']()).toBe(true);
    });

    test('do() return stdout result', async () => {
        const expected = 'Not implemented !';
        
        const output = await undefinedCmd.do();
        
        expect(output).toBe(expected);
    });
});