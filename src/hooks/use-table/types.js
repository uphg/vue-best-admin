// Table types and interfaces for JavaScript version

// Default props for useTable hook
export const createUseTableProps = (options = {}) => ({
  dataSource: null,
  initDataSource: true,
  hasLoading: true,
  tableClass: '',
  pagingWrapClass: '',
  onBeforeUpdateData: null,
  onAfterUpdateData: null,
  defaultColumnProps: null,
  ...options,
})

// Type for default columns (array of column objects)
export const createTableDefaultColumns = (columns = []) => columns

export default {
  createUseTableProps,
  createTableDefaultColumns,
}