import { pick } from 'lodash-es'
import { NFormItem, NInput } from 'naive-ui'
import { defineComponent } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nInputDefaultProps, nInputPropNames, nInputProps } from './common'
import { genPlaceholder, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xInputProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nInputProps,
}

const XFormInput = defineComponent({
  name: 'XFormInput',
  props: xInputProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps } = inject<Record<string, Ref<any>>>(xFormContextProviderKey, {
      defaultProps: ref({}),
    })

    const formItemProps = computed(() => mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {}))
    const inputProps = computed(() => mergeProps(pick(rawProps, nInputPropNames), nInputDefaultProps, defaultProps.value?.input ?? {}))
    const placeholder = computed(() => genPlaceholder('input', { label: formItemProps.value.label, placeholder: inputProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NInput
            class="w-full"
            {...inputProps.value}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NInput>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormInput
