import type { TreeSelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NTreeSelect } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nTreeSelectDefaultProps, nTreeSelectPropNames, nTreeSelectProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xTreeSelectProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nTreeSelectProps,
}

const fieldType = 'tree-select'

const XFormTreeSelect = defineComponent({
  name: 'XFormTreeSelect',
  props: xTreeSelectProps,
  emits: ['update:value'],
  setup(rawProps: XTreeSelectProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<TreeSelectProps>(rawProps, context, {
      fieldType,
      fieldPropNames: nTreeSelectPropNames,
      fieldDefaultProps: nTreeSelectDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
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
              <NTreeSelect
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                placeholder={placeholder.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NTreeSelect>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

type XTreeSelectProps = ExtractPublicPropTypes<typeof xTreeSelectProps>

export default XFormTreeSelect
