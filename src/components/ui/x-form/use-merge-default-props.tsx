import { assign, pick } from 'lodash-es'
import { resolveProps } from './helpers'

interface MergeDefaultProps {
  rawProps: Record<string, any>
  propNames: string[]
  defaultProps: Record<string, any>
  provideProps?: Record<string, any>
}

export function useMergeDefaultProps({ rawProps, propNames, defaultProps, provideProps }: MergeDefaultProps) {
  const staticProps = resolveProps(
    pick(rawProps, propNames),
    defaultProps,
    provideProps ?? {},
  )
  const props = ref(assign({}, staticProps))

  watch(() => pick(rawProps, propNames), (newProps) => {
    props.value = assign({}, props.value, newProps) as Record<string, any>
  }, { deep: true })

  return props
}
