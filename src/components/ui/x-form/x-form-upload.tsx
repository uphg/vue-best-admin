import type { ExtractPublicPropTypes } from 'vue'
import { NUpload } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { nFormItemProps, nUploadDefaultProps, nUploadPropNames, nUploadProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

const xUploadProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nUploadProps,
}

const fieldType = 'upload'

const XFormUpload = defineComponent({
  ...xFormItemOptions,
  name: 'XFormUpload',
  props: xUploadProps,
  emits: ['update:fileList'],
  setup(rawProps: XUploadProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nUploadPropNames, defaultProps: nUploadDefaultProps, provideProps: formContext.defaultProps.value.upload })
    const [FormUpload, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const uploadSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateFileList(...args: any[]) {
      context.emit('update:fileList', ...args)
    }

    function render() {
      return (
        <NUpload
          class="w-full"
          {...fieldProps.value}
          fileList={rawProps.fileList}
          onUpdate:fileList={handleUpdateFileList}
        >
          {uploadSlots.value.default?.() || <div>点击或拖拽文件到此区域上传</div>}
        </NUpload>
      )
    }
    return FormUpload
  },
})

type XUploadProps = ExtractPublicPropTypes<typeof xUploadProps>

export default XFormUpload
