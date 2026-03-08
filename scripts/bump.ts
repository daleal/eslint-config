import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';

const packagePaths = [
  'packages/eslint-config-core/package.json',
  'packages/eslint-config-ts/package.json',
  'packages/eslint-config-vue/package.json',
] as const;

const internalPackages = new Set([
  '@daleal/eslint-config-core',
  '@daleal/eslint-config-ts',
  '@daleal/eslint-config-vue',
]);

type ReleaseType = 'major' | 'minor' | 'patch';
type PackageJson = {
  name: string
  version: string
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
};

const releaseType = process.argv[2] as ReleaseType | undefined;

if (!releaseType || !['major', 'minor', 'patch'].includes(releaseType)) {
  throw new Error('Usage: bun scripts/bump.ts <major|minor|patch>');
}

const readPackage = (packagePath: string): PackageJson => JSON.parse(readFileSync(join(process.cwd(), packagePath), 'utf8')) as PackageJson;

const versionParts = readPackage(packagePaths[0]).version.split('.').map(Number);

if (versionParts.length !== 3 || versionParts.some((part) => Number.isNaN(part))) {
  throw new Error('Invalid version in package.json');
}

const [major, minor, patch] = versionParts as [number, number, number];

const nextVersion = {
  major: `${major + 1}.0.0`,
  minor: `${major}.${minor + 1}.0`,
  patch: `${major}.${minor}.${patch + 1}`,
}[releaseType];

for (const packagePath of packagePaths) {
  const absolutePath = join(process.cwd(), packagePath);
  const pkg = readPackage(packagePath);

  pkg.version = nextVersion;

  for (const field of ['dependencies', 'peerDependencies', 'devDependencies', 'optionalDependencies'] as const) {
    const dependencies = pkg[field];
    if (!dependencies) {
      continue;
    }

    for (const dependencyName of Object.keys(dependencies)) {
      if (internalPackages.has(dependencyName)) {
        dependencies[dependencyName] = `^${nextVersion}`;
      }
    }
  }

  writeFileSync(absolutePath, `${JSON.stringify(pkg, null, 2)}\n`);
}

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `version=${nextVersion}\n`);
}

process.stdout.write(`${nextVersion}\n`);
