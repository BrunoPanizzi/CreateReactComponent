import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'createreactcomponent.helloWorld',
    () => {
      vscode.window.showInformationMessage(
        'Hello World from CreateReactComponent!'
      )
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
