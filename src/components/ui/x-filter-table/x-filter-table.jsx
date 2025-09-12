import { uniq } from 'lodash-es'
import { computed, defineComponent, ref } from 'vue'

const XFilterTable = defineComponent({
  props: {
    data: {
      type: Object,
      default: () => ({
        columns: [],
        rows: [],
      }),
    },
  },
  setup(props) {
    const rawColumns = computed(() => props.data.columns.map((item, colIndex) => ({
      title: item.title,
      data: props.data.rows.map(row => row[colIndex]),
    })))
    const filteredRows = ref(JSON.parse(JSON.stringify(props.data.rows)))
    const columnFilters = ref({})

    function updateFilteredAndSortedData() {
      let result = JSON.parse(JSON.stringify(props.data.rows))

      // 应用过滤
      Object.entries(columnFilters.value).forEach(([columnIndex, filter]) => {
        const { selectedValues } = filter
        if (selectedValues.length <= 0) {
          result = []
          return
        }
        const colIndex = Number.parseInt(columnIndex)
        result = result.filter(row => selectedValues.includes(row[colIndex]))
      })

      // 应用排序
      Object.entries(columnFilters.value).forEach(([columnIndex, filter]) => {
        if (filter.sortOrder) {
          const colIndex = Number.parseInt(columnIndex)
          result.sort((a, b) => {
            const valA = a[colIndex]
            const valB = b[colIndex]

            if (typeof valA === 'number' && typeof valB === 'number') {
              return filter.sortOrder === 'asc' ? valA - valB : valB - valA
            } else {
              const strA = String(valA)
              const strB = String(valB)
              return filter.sortOrder === 'asc'
                ? strA.localeCompare(strB, 'zh-CN')
                : strB.localeCompare(strA, 'zh-CN')
            }
          })
        }
      })

      filteredRows.value = result
    }

    // 处理排序
    function handleSort(columnIndex, order) {
      const key = columnIndex.toString()
      // 如果已经按这个顺序排序，则取消排序
      if (columnFilters.value[key].sortOrder === order) {
        columnFilters.value[key].sortOrder = null
      } else {
        columnFilters.value[key].sortOrder = order
      }

      updateFilteredAndSortedData()
    }

    // 处理多选变化
    function handleCheckboxChange(columnIndex, newValue) {
      const key = columnIndex
      const uniqValue = uniq(newValue)
      const defaultSelectedLen = uniq(rawColumns.value[key].data).length
      const newValueLen = uniqValue.length
      const isIndet = newValueLen > 0 && newValueLen < defaultSelectedLen
      columnFilters.value[key].selectedValues = uniqValue
      columnFilters.value[key].isIndeterminate = isIndet
      columnFilters.value[key].isAllSelected = newValueLen === defaultSelectedLen
      updateFilteredAndSortedData()
    }

    // 处理全选
    function handleSelectAll(columnIndex) {
      const newChecked = !columnFilters.value[columnIndex].isAllSelected
      if (newChecked) {
        const selectAllColumns = uniq(rawColumns.value[columnIndex].data)
        columnFilters.value[columnIndex].selectedValues = selectAllColumns
        columnFilters.value[columnIndex].isIndeterminate = false
      } else {
        columnFilters.value[columnIndex].selectedValues = []
        columnFilters.value[columnIndex].isIndeterminate = false
      }

      columnFilters.value[columnIndex].isAllSelected = newChecked
      updateFilteredAndSortedData()
    }

    function initColumnFilters() {
      rawColumns.value.forEach((item, index) => {
        const uniqData = uniq(item.data)
        columnFilters.value[index] = {
          selectedValues: [...uniqData],
          defaultSelected: [...uniqData],
          sortOrder: null,
          isAllSelected: true,
          isIndeterminate: false,
        }
      })
    }

    initColumnFilters()

    return () => (
      <div class="p-6">
        <NTable bordered striped>
          <thead>
            <tr>
              {props.data.columns.map((column, columnIndex) => {
                const filter = columnFilters.value[columnIndex]
                return (
                  <th key={column.title}>
                    <NPopover
                      trigger="click"
                      placement="bottom"
                      width={300}
                      scrollable
                    >
                      {{
                        trigger: () => (
                          <div class="flex gap-1 cursor-pointer items-center hover:text-blue-600">
                            {column.title}
                            {filter.sortOrder && (
                              <span class="text-xs">
                                {filter.sortOrder === 'asc' ? '↑' : '↓'}
                              </span>
                            )}
                          </div>
                        ),
                        default: () => (
                          <div class="p-2">
                            {/* 排序操作 */}
                            <div class="mb-3">
                              <div class="text-sm font-medium mb-2">排序</div>
                              <NSpace size="small" vertical>
                                <NButton
                                  class="w-full"
                                  size="small"
                                  type={filter.sortOrder === 'asc' ? 'primary' : 'default'}
                                  onClick={() => handleSort(columnIndex, 'asc')}
                                >
                                  正序
                                </NButton>
                                <NButton
                                  class="w-full"
                                  size="small"
                                  type={filter.sortOrder === 'desc' ? 'primary' : 'default'}
                                  onClick={() => handleSort(columnIndex, 'desc')}
                                >
                                  倒序
                                </NButton>
                              </NSpace>
                            </div>

                            {/* 多选过滤 */}
                            <div class="mb-3">
                              <div class="text-sm font-medium mb-2">筛选</div>
                              {/* 全选复选框 - 独立于 NCheckboxGroup */}
                              <div class="py-1 flex items-center">
                                <NCheckbox
                                  checked={filter.isAllSelected}
                                  indeterminate={filter.isIndeterminate}
                                  onUpdate:checked={checked => handleSelectAll(columnIndex)}
                                >
                                  全选
                                </NCheckbox>
                              </div>

                              {/* 分隔线 */}
                              <div class="my-1 border-t border-gray-200"></div>
                              <div class="max-h-40 overflow-y-auto">
                                <NCheckboxGroup
                                  value={filter.selectedValues}
                                  onUpdate:value={newValue => handleCheckboxChange(columnIndex, newValue)}
                                >
                                  <div class="flex flex-col gap-2">
                                    {filter.defaultSelected.map(value => (
                                      <NCheckbox
                                        key={value}
                                        value={value}
                                      >
                                        {value}
                                      </NCheckbox>
                                    ))}
                                  </div>
                                </NCheckboxGroup>
                              </div>
                            </div>
                          </div>
                        ),
                      }}
                    </NPopover>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {filteredRows.value.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </NTable>
      </div>
    )
  },
})

export default XFilterTable
