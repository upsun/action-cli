import { Context } from './base/command';
import { RouteCmd } from './route';

jest.mock('@actions/core');

describe('RouteCmd', () => {
    let routeCmd: RouteCmd;
    let mockCtx: Context;

    beforeEach(() => {
        mockCtx = new Context('', '', '', 'test-project', 'main');
        routeCmd = new RouteCmd(mockCtx);
    });

    test('_isValid() is true when projectId and branch are set', () => {
        expect(routeCmd['_isValid']()).toBe(true);
    });

    test('_isValid() is False when no projectId and/or no branch are set', () => {
        const mockCtxFail = new Context('', '', '', '', '');
        const routeCmdFail = new RouteCmd(mockCtxFail);

        expect(routeCmdFail['_isValid']()).toBe(false);
    });

    test('do() return stdout result', async () => {
        const mockResult = { stdout: 'mocked output' };
        jest.spyOn(routeCmd as any, '_exec').mockResolvedValue(mockResult);
        
        const output = await routeCmd.do();
        
        expect(output).toBe('mocked output');
    });
});
