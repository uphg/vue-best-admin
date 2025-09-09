import type { ExtractPropTypes } from 'vue'

export const xTabsBarProps = {
  // No specific props for now, just pass through attributes
} as const

export type XTabsBarProps = ExtractPropTypes<typeof xTabsBarProps>

export const XTabsBar = defineComponent({
  name: 'XTabsBar',
  props: xTabsBarProps,
  setup(props, { slots, attrs }) {
    return () => (
      <div
        class={[
          'x-tabs-bar',
          'inline-flex h-10 items-center justify-center rounded-md p-1',
          'bg-[var(--muted)] text-[var(--muted-foreground)]',
          attrs.class,
        ]}
        {...attrs}
      >
        {slots.default?.()}
      </div>
    )
  },
})
