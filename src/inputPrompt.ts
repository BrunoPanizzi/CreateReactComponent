import { window } from 'vscode'

export default function () {
  return window.showInputBox({
    prompt: 'Pick a name for your react component',
    placeHolder: 'Component name...',
  })
}
