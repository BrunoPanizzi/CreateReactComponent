import { ExtensionContext, commands, window } from 'vscode'

import showPrompt from './inputPrompt'
import isReactProject from './isReactProject'
import writeFiles from './writeFiles'

async function main(fileType: 'js' | 'ts') {
  const isReact = await isReactProject()

  if (!isReact) {
    return
  }

  const componentName = await showPrompt()

  if (!componentName) {
    return console.log('aborting')
  }

  if (componentName.includes(' ')) {
    return window.showErrorMessage('Component name cannot have spaces')
  }

  window.showInformationMessage(
    `Creating component with name: ${componentName}`
  )

  writeFiles(componentName, fileType)
}

export function activate(context: ExtensionContext) {
  let createTs = commands.registerCommand('createreactcomponent.ts', () =>
    main('ts')
  )
  let createJs = commands.registerCommand('createreactcomponent.js', () =>
    main('js')
  )

  context.subscriptions.push(createTs, createJs)
}

export function deactivate() {}
