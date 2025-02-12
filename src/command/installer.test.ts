import * as fs from 'fs';
import { Installer } from "./installer";
import { Context } from './base/command';

describe('InstallerCmd', () => {
  let installer: Installer;

  beforeEach(() => {
    const ctx = new Context('upsun', '5.0.23', '', '', '');
    installer = new Installer(ctx);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('downloadInstaller', async () => {
    await installer.downloadInstaller();

    // Vérifications
    expect(fs.existsSync('installer.sh')).toBe(true)
  });

  it('runInstaller', async () => {
    await installer.runInstaller();

    // Vérifications
    expect(fs.existsSync('installer.sh')).toBe(true)
  });

  it('install', async () => {
    await installer.do();

    // Vérifications
    expect(fs.existsSync('installer.sh')).toBe(true)
  });
});
