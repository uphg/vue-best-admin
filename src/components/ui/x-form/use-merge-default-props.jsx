import { assign, pick } from 'lodash-es'
import { ref, watch } from 'vue'
import { resolveProps } from './helpers.jsx'

export function useMergeDefaultProps({ rawProps, propNames, defaultProps, provideProps }) {
  const staticProps = resolveProps(
    pick(rawProps, propNames),
    defaultProps,
    provideProps ?? {},
  )
  const props = ref(assign({}, staticProps))

  watch(() => pick(rawProps, propNames), (newProps) => {
    props.value = assign({}, props.value, newProps)
  }, { deep: true })

  return props
}