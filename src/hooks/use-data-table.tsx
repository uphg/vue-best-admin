import type { DataTableColumn, DataTableProps } from 'naive-ui'
import type { ShallowRef } from 'vue'
import { isNil, omit } from 'lodash-es'
import { NDataTable, NPagination } from 'naive-ui'

interface UseTableProps extends DataTableProps {
  dataSource: (options: { page: number, pageSize: number }) => Promise<any>
  initDataSource: boolean
  hasLoading: boolean
  onBeforeUpdateData: () => void
  onAfterUpdateData: () => void
}

const defaultProps = {
  // 自定义 props
  initDataSource: true,
  hasLoading: true,

  // table props
  striped: true,
  bordered: true,
  // loading: true,
  pagination: {
    pageSizes: [10, 20, 50, 100],
    showSizePicker: true,
  },
}

const customPropsNames = ['pagination', 'dataSource', 'initDataSource', 'hasLoading', 'onBeforeUpdateData', 'onAfterUpdateData']

export function useDataTable(
  columns: ShallowRef<Array<DataTableColumn>>,
  props?: Partial<UseTableProps>,
  slots?: { empty: () => any, loading: () => any },
) {
  const rawProps = Object.assign({}, defaultProps, props)
  const nTableProps = omit(rawProps, customPropsNames)

  const data = ref<any[]>([])
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const sorter = ref()
  const loading = ref(false)

  rawProps.initDataSource && refresh()

  async function refresh() {
    onBeforeUpdateData()
    const res = await rawProps.dataSource?.({ page: page.value, pageSize: pageSize.value }).catch((e) => {
      onAfterUpdateData()
      return e
    })
    if (isNil(res)) return
    data.value = res.data
    total.value = res.total
    onAfterUpdateData()
    return res
  }

  function startLoading() {
    loading.value = true
  }
  function stopLoading() {
    loading.value = false
  }

  function onBeforeUpdateData() {
    rawProps.hasLoading && startLoading()
  }

  function onAfterUpdateData() {
    rawProps.hasLoading && stopLoading()
  }

  function onPageChange(newPage: number) {
    page.value = newPage
    refresh()
  }

  function onPageSizeChange(newPageSize: number) {
    pageSize.value = newPageSize
    refresh()
  }

  return [
    () => (
      <div>
        <NDataTable data={data.value} columns={columns.value} loading={loading.value} {...nTableProps}>
          {slots}
        </NDataTable>
        <div class="mt-3 flex justify-end">
          <NPagination {...rawProps.pagination} item-count={total.value} page={page.value} pageSize={pageSize.value} onUpdate:page={onPageChange} onUpdate:pageSize={onPageSizeChange} />
        </div>
      </div>
    ),
    { data, page, pageSize, sorter, refresh },
  ] as const
}
