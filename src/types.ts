export interface NuxtModule {
  name: string
  version: string
}

export interface Package {
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}
