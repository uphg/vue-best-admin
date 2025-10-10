import type { ClassNameValue } from 'tailwind-merge'
import { pick } from 'lodash-es'
import { NButton, NModal, NScrollbar } from 'naive-ui'
import IconX from '~icons/lucide/x'
import { mergeClass } from '@/utils/merge-class'
import PureButton from '../pure-button/pure-button'

const defaultClass = {
  wrap: 'bg-white rounded-lg min-w-sm max-w-2xl',
  header: 'flex items-center justify-between p-4',
  title: 'text-lg',
  content: 'p-4',
  footer: 'flex items-center justify-end gap-3 p-4',
}

interface ModalProps {
  visible?: boolean
  title?: string
  showClose?: boolean
  showFooter?: boolean
  confirmLoading?: boolean
  confirmText?: string
  cancelText?: string
  onConfirm?: (event: MouseEvent) => boolean | Promise<boolean> | Promise<void> | void
  onCancel?: (event: MouseEvent) => boolean | Promise<boolean> | void
  onClose?: (event: MouseEvent) => boolean | Promise<boolean> | void
  onAfterEnter?: () => void
  onAfterLeave?: () => void
  onEsc?: () => void
  onMaskClick?: () => void
  maskClosable?: boolean
  headerClass?: string
  contentClass?: string
  footerClass?: string
  size?: 'small' | 'medium' | 'large' | 'huge'
}

const NModalPropNames = ['onAfterEnter', 'onAfterLeave', 'onEsc', 'onMaskClick', 'maskClosable']
const sizeMap = {
  small: 'max-w-sm',
  medium: 'max-w-md',
  large: 'max-w-lg',
  huge: 'max-w-2xl',
}

const Modal = defineComponent<ModalProps>({
  props: {
    visible: Boolean,
    title: String,
    showClose: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: true },
    confirmLoading: Boolean,
    confirmText: { type: String, default: '确认' },
    cancelText: { type: String, default: '取消' },
    onConfirm: Function,
    onCancel: Function,
    onClose: Function,
    onAfterEnter: Function,
    onAfterLeave: Function,
    onEsc: Function,
    onMaskClick: Function,
    maskClosable: { type: Boolean, default: true },
    headerClass: [String],
    contentClass: [String],
    footerClass: [String],
    size: { type: String, default: 'medium' },
  },
  emits: ['update:visible'],
  inheritAttrs: false,
  setup(props, { emit, slots, attrs }) {
    const classNames = computed(() => mergeClass(defaultClass.wrap, sizeMap[props.size || 'medium'], attrs.class as ClassNameValue))
    function onUpdateVisible(value: boolean) {
      emit('update:visible', value)
    }

    async function handleConfirm(e: MouseEvent) {
      props.onConfirm?.(e)
    }

    async function handleCancel(e: MouseEvent) {
      props.onCancel?.(e)
    }

    async function handleClose(e: MouseEvent) {
      props.onClose?.(e)
      onUpdateVisible(false)
    }

    return () => (
      <NModal
        {...attrs}
        class={classNames.value}
        show={props.visible}
        onUpdate:show={onUpdateVisible}
        {...pick(props, NModalPropNames) as any}
      >
        <div>
          {(slots.header || props.title || props.showClose) && (
            <div class={mergeClass(defaultClass.header, props.headerClass)}>
              {slots.header
                ? slots.header()
                : (
                    <h3 class={defaultClass.title}>{props.title}</h3>
                  )}
              {props.showClose && (
                <PureButton
                  onClick={handleClose}
                  class="ml-2"
                >
                  <IconX class="h-4.5 w-4.5" />
                </PureButton>
              )}
            </div>
          )}
          <div>
            {/* height: 100vh - header - footer - [top/bottom]gap*2 */}
            <NScrollbar class="max-h-[calc(100vh-60px-66px-(20px*2))]">
              <div class={mergeClass(defaultClass.content, props.contentClass)}>
                {slots.default?.()}
              </div>
            </NScrollbar>
          </div>
          {props.showFooter && (slots.footer || props.showFooter) && (
            <div class={mergeClass(defaultClass.footer, props.footerClass)}>
              {slots.footer
                ? slots.footer()
                : (
                    <>
                      <NButton onClick={handleCancel}>{props.cancelText}</NButton>
                      <NButton
                        type="primary"
                        loading={props.confirmLoading}
                        onClick={handleConfirm}
                      >
                        {props.confirmText}
                      </NButton>
                    </>
                  )}
            </div>
          )}
        </div>
      </NModal>
    )
  },
})

export default Modal
