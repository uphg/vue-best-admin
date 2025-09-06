import type { UploadProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NUpload } from 'naive-ui'
import { defineComponent } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nUploadDefaultProps, nUploadPropNames, nUploadProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xUploadProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nUploadProps,
}

const XFormUpload = defineComponent({
  name: 'XFormUpload',
  props: xUploadProps,
  emits: ['update:fileList'],
  setup(rawProps: XUploadProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<UploadProps>(rawProps, context, {
      fieldType: 'upload',
      fieldPropNames: nUploadPropNames,
      fieldDefaultProps: nUploadDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    function handleUpdateFileList(...args: any[]) {
      emit('update:fileList', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', context.formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NUpload
            class="w-full"
            {...fieldProps.value as any}
            fileList={rawProps.fileList}
            onUpdate:fileList={handleUpdateFileList}
          >
            {slots.default?.() || <div>点击或拖拽文件到此区域上传</div>}
          </NUpload>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

type XUploadProps = ExtractPublicPropTypes<typeof xUploadProps>

export default XFormUpload
