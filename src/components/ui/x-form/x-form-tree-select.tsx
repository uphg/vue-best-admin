import type { TreeSelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NTreeSelect } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nTreeSelectDefaultProps, nTreeSelectPropNames, nTreeSelectProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xTreeSelectProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nTreeSelectProps,
}

const XFormTreeSelect = defineComponent({
  name: 'XFormTreeSelect',
  props: xTreeSelectProps,
  emits: ['update:value'],
  setup(rawProps: XTreeSelectProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<TreeSelectProps>(rawProps, context, {
      fieldType: 'treeSelect' as any,
      fieldPropNames: nTreeSelectPropNames,
      fieldDefaultProps: nTreeSelectDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    const placeholder = computed(() => genPlaceholder('tree-select' as any, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', context.formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NTreeSelect
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NTreeSelect>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

type XTreeSelectProps = ExtractPublicPropTypes<typeof xTreeSelectProps>

export default XFormTreeSelect
