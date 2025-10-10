import ColumnSelector from '@/components/features/table/column-selector'

export function useColumnSelector(rawColumns: Ref<any[]>) {
  const columns = computed(() => rawColumns.value.filter(item => checkedColumnKeys.value.includes(item.key)))
  const checkedColumnKeys = ref(rawColumns.value.map(item => item.key))

  return [() => (
    <ColumnSelector v-model:value={checkedColumnKeys.value} columns={rawColumns.value} />
  ), { columns, checkedColumnKeys }] as const
}
