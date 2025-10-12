import { NButton, NIcon } from 'naive-ui'
import IconColumns from '~icons/lucide/columns'
import ColumnSelector from '@/components/features/table/column-selector'

export function useColumnSelector(rawColumns) {
  const columns = computed(() => rawColumns.value.filter(item => checkedColumnKeys.value.includes(item.key)))
  const checkedColumnKeys = ref(rawColumns.value.map(item => item.key))

  return [() => (
    <ColumnSelector v-model:value={checkedColumnKeys.value} columns={rawColumns.value}>
      <NButton>
        <NIcon class="mr-1">
          <IconColumns />
        </NIcon>
        列设置
      </NButton>
    </ColumnSelector>
  ), { columns, checkedColumnKeys }]
}