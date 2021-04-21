// this portably runs `npm install` in subpackages.
//
// based off of:
// https://stackoverflow.com/questions/31773546/the-best-way-to-run-npm-install-for-nested-folders

import child_process from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// npm binary based on OS
const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'

// get library path
const functionsPath = path.resolve(__dirname, '../functions/')

fs.readdirSync(functionsPath).forEach(functionSubdir => {
  const functionPath = path.join(functionsPath, functionSubdir)
  const maybePackageJsonPath = path.join(functionPath, 'package.json')

  if (fs.existsSync(maybePackageJsonPath)) {
    child_process.spawn(npmCmd, ['i'], {
      env: process.env,
      cwd: functionPath,
      stdio: 'inherit',
    })
  }
})
