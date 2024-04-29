import type { CompletionItem, ExtensionContext } from 'vscode'
import { languages } from 'vscode'
import type { WithScope } from 'ast-kit'
import { babelParse, walkAST } from 'ast-kit'
import type { Node } from '@babel/types'
import { parsePkg } from './pkg'
import { channel } from './utils'

export function activate(context: ExtensionContext) {
  channel.appendLine('Nuxt Module Intellisense activated')
  const provider = languages.registerCompletionItemProvider(
    ['javascript', 'typescript'],
    {
      async provideCompletionItems(document, position) {
        if (document.fileName.includes('nuxt.config')) {
          const configFileContent = document.getText()
          const nuxtModules = parsePkg(document.fileName)

          const ast = babelParse(configFileContent, '', {
            plugins: ['typescript'],
          })

          let completionItems: CompletionItem[] = []

          walkAST<WithScope<Node>>(ast, {
            enter(node) {
              if (node.type === 'ObjectProperty'
                && node.key.loc?.identifierName === 'modules'
                && node.value.type === 'ArrayExpression') {
                const currentModules = node.value.elements
                const currentModulesNames = currentModules.map((item) => {
                  // @ts-expect-error missing type
                  if (item.type === 'StringLiteral')
                    return item?.value
                  else if (item?.type === 'ArrayExpression')
                    // @ts-expect-error missing type
                    return item.elements[0]?.value
                  else
                    return null
                })

                channel.appendLine(JSON.stringify(currentModulesNames))

                const isHitOnModules = currentModules.findIndex((item) => {
                  if (item?.loc?.start.line === position.line + 1 && item?.loc?.start.column === position.character - 1)
                    return true

                  return false
                })

                if (isHitOnModules > -1) {
                  completionItems = nuxtModules.filter(item => !currentModulesNames.includes(item.name)).map((item) => {
                    return {
                      label: item.name,
                      kind: 20,
                      detail: item.version,
                    }
                  })
                }
              }
            },
          })

          return completionItems
        }
        return []
      },
    },
    '\'',
    '\"',
  )

  context.subscriptions.push(provider)
}

export function deactivate() {

}
