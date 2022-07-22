import { workspace, window } from 'vscode'

export default async function isReactProject() {
  if (workspace.workspaceFolders === undefined) {
    window.showErrorMessage('You don seem to have any folders open')
    return false
  }

  const wf = workspace.workspaceFolders[0].uri.path

  try {
    const doc = await workspace.openTextDocument(wf + '\\package.json')
    const content = JSON.parse(doc.getText())
    const isReact = !!content.dependencies.react

    return isReact
  } catch {
    window.showErrorMessage('The open folder doesn\'t seem to be a react project')
    return false
  }
}
