import type { DataTableColumn, DataTableProps } from 'naive-ui'
import { NPagination, NTable } from 'naive-ui'

const defaultProps = {
  striped: true,
  bordered: true,
  loading: true,
}

export function useTable(columns: Ref<Array<DataTableColumn>>, props: Partial<DataTableProps> = defaultProps, slots: { empty: () => any, loading: () => any }) {
  const data = ref([])
  const page = ref(1)
  const pageSize = ref(10)
  const sorter = ref()
  return [
    () => (
      <>
        <NTable columns={columns.value} {...props}>
          {{
            empty: slots.empty,
            loading: slots.loading,
          }}
        </NTable>
        <NPagination v-model:page={page.value} v-model:pageSize={pageSize.value} />
      </>
    ),
    data,
    { page, pageSize, sorter },
  ]
}
