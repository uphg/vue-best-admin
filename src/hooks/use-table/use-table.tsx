import type { PagingJustify, TableDefaultColumns, UseTableProps } from './types'
import { isNil, omit } from 'lodash-es'
import { NDataTable, NPagination } from 'naive-ui'
import { mergeClass } from '@/utils/merge-class'
import { pagingJustifyMap } from './common'

const defaultProps = {
  // 自定义 props
  initDataSource: true,
  hasLoading: true,
  defaultColumnProps: null,

  // table props
  striped: true,
  bordered: true,
  // loading: true,
  pagination: {
    pageSizes: [10, 20, 50, 100],
    showSizePicker: true,
  },
  pagingJustify: 'end' as PagingJustify,
}

const customPropsNames = ['pagination', 'dataSource', 'initDataSource', 'hasLoading', 'onBeforeUpdateData', 'onAfterUpdateData', 'pagingWrapClass', 'pagingJustify', 'defaultColumnProps']

export function useTable(
  defaultColumns: TableDefaultColumns,
  props?: Partial<UseTableProps>,
  slots?: { empty: () => any, loading: () => any },
) {
  const rawProps = Object.assign({}, defaultProps, props) as Partial<UseTableProps>
  const nTableProps = omit(rawProps, customPropsNames)

  const data = ref<any[]>([])
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const sorter = ref()
  const loading = ref(false)
  const columns = ref(defaultColumns)

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

  const Table = defineComponent({
    inheritAttrs: false,

    setup(_, { attrs }) {
      return () => (
        <div {...attrs} class={mergeClass('flex flex-col gap-3', attrs.class as string)}>
          <NDataTable {...nTableProps} class={rawProps.tableClass} data={data.value} columns={columns.value} loading={loading.value}>
            {slots}
          </NDataTable>
          <div class={mergeClass('flex', pagingJustifyMap[rawProps.pagingJustify!], rawProps.pagingWrapClass)}>
            <NPagination {...rawProps.pagination} item-count={total.value} page={page.value} pageSize={pageSize.value} onUpdate:page={onPageChange} onUpdate:pageSize={onPageSizeChange} />
          </div>
        </div>
      )
    },
  })

  return [Table, { data, columns, page, pageSize, sorter, refresh }] as const
}
