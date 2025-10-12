import { isFunction, omit } from 'lodash-es'
import { useTable } from './use-table.jsx'

export function useTableLite(liteColumns, props, slots) {
  const columns = convertLiteColumnsToColumns(liteColumns)
  return useTable(columns, props, slots)
}

function convertLiteColumnsToColumns(liteColumns) {
  return liteColumns.map(([title, key, _options]) => {
    const options = isFunction(_options) ? { render: _options } : omit(_options, 'title', 'key')
    return {
      title,
      key,
      ...(options),
    }
  })
}