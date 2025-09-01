import type { ClassValue } from 'clsx'
import type { DataTableColumn, DataTableProps } from 'naive-ui'
import type { pagingJustifyMap } from './common'

export interface UseTableProps extends DataTableProps {
  dataSource: (options: { page: number, pageSize: number }) => Promise<any>
  initDataSource: boolean
  hasLoading: boolean
  tableClass: ClassValue
  pagingWrapClass: ClassValue
  pagingJustify: PagingJustify
  onBeforeUpdateData: () => void
  onAfterUpdateData: () => void
  defaultColumnProps: Partial<DataTableColumn>
}

export type PagingJustify = keyof typeof pagingJustifyMap

export type TableDefaultColumns = Array<DataTableColumn>
