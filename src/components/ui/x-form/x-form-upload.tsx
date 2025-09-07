import type { UploadProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NUpload } from 'naive-ui'
import { defineComponent } from 'vue'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nUploadDefaultProps, nUploadPropNames, nUploadProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xUploadProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nUploadProps,
}

const fieldType = 'upload'

const XFormUpload = defineComponent({
  name: 'XFormUpload',
  props: xUploadProps,
  emits: ['update:fileList'],
  setup(rawProps: XUploadProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<UploadProps>(rawProps, context, {
      fieldType,
      fieldPropNames: nUploadPropNames,
      fieldDefaultProps: nUploadDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    function handleUpdateFileList(...args: any[]) {
      emit('update:fileList', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <XFormItemWrap
          wrap={rawProps.wrap}
          wrapClass={rawProps.wrapClass}
          provideWrapClass={context.formItemWrapClass.value}
          v-slots={{
            itemPrefix: slots.itemPrefix,
            default: () => (
              <NUpload
                class="w-full"
                {...fieldProps.value as any}
                fileList={rawProps.fileList}
                onUpdate:fileList={handleUpdateFileList}
              >
                {slots.default?.() || <div>点击或拖拽文件到此区域上传</div>}
              </NUpload>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

type XUploadProps = ExtractPublicPropTypes<typeof xUploadProps>

export default XFormUpload
