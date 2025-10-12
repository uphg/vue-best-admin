import { createDiscreteApi } from 'naive-ui'

// Interface definitions (kept as comments for reference)
// OpenDialogOptions extends DialogOptions with onConfirm callback
// Confirm interface with create, error, info, success, warning methods

const confirmTypes = ['create', 'error', 'info', 'success', 'warning']
const { dialog, message } = createDiscreteApi(['dialog', 'message'])

const defaultOptions = {
  title: '提示',
  positiveText: '确定',
  negativeText: '取消',
}

function createConfirmDialog() {
  const confirm = {}
  confirmTypes.forEach((type) => {
    confirm[type] = createConfirmTypes(type)
  })

  return confirm
}

function createConfirmTypes(type) {
  return (options) => {
    const { onConfirm, ...rest } = Object.assign(defaultOptions, options)
    const dialogOptions = Object.assign({
      onPositiveClick: async () => {
        try {
          await onConfirm()
        } catch (e) {
          return false
        }
        return true
      },
    }, rest)
    dialog[type](dialogOptions)
  }
}

export const $confirm = createConfirmDialog()
export const $dialog = dialog
export const $message = message