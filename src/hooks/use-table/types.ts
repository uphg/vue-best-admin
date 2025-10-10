import type { ClassValue } from 'clsx'
import type { DataTableColumn, DataTableProps } from 'naive-ui'

export interface UseTableProps extends DataTableProps {
  dataSource: (options: { page: number, pageSize: number }) => Promise<any>
  initDataSource: boolean
  hasLoading: boolean
  tableClass: ClassValue
  pagingWrapClass: ClassValue
  onBeforeUpdateData: () => void
  onAfterUpdateData: () => void
  defaultColumnProps: Partial<DataTableColumn>
}

export type TableDefaultColumns = Array<DataTableColumn>
