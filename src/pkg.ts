import { dirname, resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import type { NuxtModule, Package } from './types'

function guessIsNuxtModule(dependency: string) {
  return dependency.includes('nuxt') && dependency !== 'nuxt'
}

export function parsePkg(projectPath: string) {
  try {
    const pkgPath = resolve(dirname(projectPath), './package.json')
    const pkgContent: Package = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    const nuxtModules: NuxtModule[] = []

    const dependencies: Record<string, string> = {
      ...pkgContent?.dependencies,
      ...pkgContent?.devDependencies,
    }

    Object.entries(dependencies).forEach(([key, value]) => {
      if (guessIsNuxtModule(key)) {
        nuxtModules.push({
          name: key,
          version: `v${value.replace(/^[\^~]/, '')}`,
        })
      }
    })

    return nuxtModules
  }
  catch (error) {
    return []
  }
}
