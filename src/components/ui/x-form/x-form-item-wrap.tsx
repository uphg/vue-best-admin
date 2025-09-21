import { mergeClass } from '@/utils/merge-class'
import { xFormItemOptions } from './common'

const XFormItemWrap = defineComponent({
  ...xFormItemOptions,
  name: 'XFormItemWrap',
  inheritAttrs: false,
  props: {
    wrap: {
      type: Boolean,
      default: false,
    },
    wrapClass: [String, Object, Array],
    provideWrapClass: [String, Object, Array],
  },
  setup(props, { attrs, slots }) {
    const classNames = computed(() => mergeClass(attrs.class as string, props.provideWrapClass, props.wrapClass))
    return () => (
      props.wrap
        ? (
            <div class={classNames.value}>
              {slots.itemPrefix ? slots.itemPrefix() : null}
              {slots.default?.()}
              {slots.itemSuffix ? slots.itemSuffix() : null}
            </div>
          )
        : slots.default?.()
    )
  },
})

export default XFormItemWrap
