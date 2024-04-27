import type { CompletionItem, ExtensionContext } from 'vscode'
import { languages, window } from 'vscode'
import type { WithScope } from 'ast-kit'
import { babelParse, walkAST } from 'ast-kit'
import type { Node } from '@babel/types'

export function activate(context: ExtensionContext) {
  const channel = window.createOutputChannel('Nuxt Module Intellisense')
  channel.appendLine('Nuxt Module Intellisense')
  const provider = languages.registerCompletionItemProvider(
    ['javascript', 'typescript'],
    {
      async provideCompletionItems(document, position) {
        if (document.fileName.includes('nuxt.config')) {
          const fileContent = document.getText()

          const ast = babelParse(fileContent, '', {
            plugins: ['typescript'],
          })

          let completionItems: CompletionItem[] = []

          walkAST<WithScope<Node>>(ast, {
            enter(node) {
              if (node.type === 'ObjectProperty' && node.key.loc?.identifierName === 'modules' && node.value.type === 'ArrayExpression') {
                const currentModules = node.value.elements

                const findIndex = currentModules.findIndex((item) => {
                  if (item?.loc?.start.line === position.line + 1 && item?.loc?.start.column === position.character - 1)
                    return true

                  return false
                })

                if (findIndex > -1) {
                  completionItems = [
                    { label: 'hello' },
                  ]
                }
              }
            },
          })

          return completionItems
        }
        return []
      },
    },
    // 通过引号触发
    '\'',
    '\"',
  )

  context.subscriptions.push(provider)
}

export function deactivate() {

}
