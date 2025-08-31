import type { DataTableColumn } from 'naive-ui'
import type { ColumnKey, TableColumnTitle } from 'naive-ui/es/data-table/src/interface'
import type { TableDefaultColumns, UseTableProps } from './types'
import { useTable } from './use-table'

type liteColumn = [
  TableColumnTitle,
  ColumnKey,
  Omit<DataTableColumn, 'title' | 'key'>?,
]

export function useTableLite(liteColumns: liteColumn[], props?: Partial<UseTableProps>, slots?: { empty: () => any, loading: () => any }) {
  const columns = convertLiteColumnsToColumns(liteColumns)
  return useTable(columns, props, slots)
}

function convertLiteColumnsToColumns(liteColumns: liteColumn[]): TableDefaultColumns {
  return liteColumns.map(([title, key, options]) => ({
    title,
    key,
    ...(options as Omit<DataTableColumn, 'title' | 'key'>),
  } as DataTableColumn))
}
