import { dirname, resolve } from 'node:path'
import { readFileSync } from 'node:fs'

function guessIsNuxtModule(dependency: string) {
  return dependency.includes('nuxt') && dependency !== 'nuxt'
}

export function parsePkg(projectPath: string) {
  try {
    const pkgPath = resolve(dirname(projectPath), './package.json')
    const pkgContent = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    const nuxtModules: string[] = []

    const dependencies = {
      ...pkgContent?.dependencies,
      ...pkgContent?.devDependencies,
    }

    Object.keys(dependencies).forEach((key) => {
      if (guessIsNuxtModule(key))
        nuxtModules.push(key)
    })

    return nuxtModules
  }
  catch (error) {
    return []
  }
}
