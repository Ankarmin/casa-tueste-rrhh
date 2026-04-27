import path from 'node:path';

let currentPath = typeof process.resourcesPath === 'string'
  ? process.resourcesPath
  : path.dirname(process.execPath || process.cwd());

const appRootPath = {
  get path() {
    return currentPath;
  },
  resolve(targetPath: string) {
    return path.join(currentPath, targetPath);
  },
  require(targetPath: string) {
    return require(appRootPath.resolve(targetPath));
  },
  toString() {
    return currentPath;
  },
  setPath(targetPath: string) {
    currentPath = path.resolve(targetPath);
  },
};

export default appRootPath;
