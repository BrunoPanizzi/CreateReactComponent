import { ExtensionContext, commands, window } from 'vscode'

import showPrompt from './inputPrompt'
import read from './isReactProject'
import writeFiles from './writeFiles'

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand(
    'createreactcomponent.pick',
    async () => {
      const isReact = await read()

      if (!isReact) {
        window.showErrorMessage('The open folder is not a react project')
        return
      }

      const componentName = await showPrompt()

      if (!componentName) {
        return console.log('aborting')
      }

      window.showInformationMessage(
        `creating component with name: ${componentName}`
      )

      writeFiles(componentName)
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
