import { pick } from 'lodash-es'
import { NFormItem, NUpload } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nUploadDefaultProps, nUploadPropNames, nUploadProps } from './common'
import { genFormItemRule, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xUploadProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nUploadProps,
}

const XFormUpload = defineComponent({
  name: 'XFormUpload',
  props: xUploadProps,
  emits: ['update:fileList'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const uploadProps = computed(() => mergeProps(pick(rawProps, nUploadPropNames), nUploadDefaultProps, defaultProps.value?.upload ?? {}))

    genFormItemRule({ ...formItemProps.value, type: 'upload' }, rules.value, autoRules.value)

    function handleUpdateFileList(...args: any[]) {
      emit('update:fileList', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NUpload
            class="w-full"
            {...uploadProps.value}
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

export default XFormUpload