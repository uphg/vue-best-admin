import type { TimePickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NTimePicker } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nTimePickerDefaultProps, nTimePickerPropNames, nTimePickerProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xTimePickerProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nTimePickerProps,
}

const fieldType = 'time-picker'

const XFormTimePicker = defineComponent({
  name: 'XFormTimePicker',
  props: xTimePickerProps,
  emits: ['update:value'],
  setup(rawProps: XTimePickerProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<TimePickerProps>(rawProps, context, {
      fieldType,
      fieldPropNames: nTimePickerPropNames,
      fieldDefaultProps: nTimePickerDefaultProps,
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
              <NTimePicker
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                placeholder={placeholder.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NTimePicker>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

type XTimePickerProps = ExtractPublicPropTypes<typeof xTimePickerProps>

export default XFormTimePicker
