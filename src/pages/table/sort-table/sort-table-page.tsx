import { NButton, NCheckbox, NCheckboxGroup, NPopover, NSpace, NTable } from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'

interface ColumnFilter {
  selectedValues: any[]
  defaultSelected: any[]
  sortOrder: 'asc' | 'desc' | null
  isAllSelected: boolean
  isIndeterminate: boolean
}

const SortTablePage = defineComponent(() => {
  const data = {
    columns: ['ID', '姓名', '年龄', '性别', '城市', '职业', '薪资', '入职日期', '部门', '绩效评分', '邮箱', '电话'],
    rows: [
      [1, '张三', 28, '男', '北京', '软件工程师', 18500, '2020-03-15', '研发部', 4.5, 'zhangsan@email.com', '13800138001'],
      [2, '李四', 32, '女', '上海', '产品经理', 22000, '2018-07-22', '产品部', 4.8, 'lisi@email.com', '13900139002'],
      [3, '王五', 25, '男', '深圳', 'UI设计师', 15000, '2021-01-10', '设计部', 4.2, 'wangwu@email.com', '13700137003'],
      [4, '赵六', 29, '女', '广州', '前端开发', 17500, '2019-05-18', '研发部', 4.6, 'zhaoliu@email.com', '13600136004'],
      [5, '钱七', 35, '男', '杭州', '后端开发', 21000, '2017-11-05', '研发部', 4.9, 'qianqi@email.com', '13500135005'],
      [6, '孙八', 27, '女', '南京', '测试工程师', 14500, '2020-08-30', '质量保障部', 4.3, 'sunba@email.com', '13400134006'],
      [7, '周九', 31, '男', '成都', '运维工程师', 19500, '2018-02-14', '运维部', 4.7, 'zhoujiu@email.com', '13300133007'],
      [8, '吴十', 26, '女', '武汉', '数据分析师', 16500, '2021-03-25', '数据分析部', 4.4, 'wushi@email.com', '13200132008'],
      [9, '郑十一', 33, '男', '西安', '项目经理', 25000, '2016-09-12', '项目管理部', 4.9, 'zhengshiyi@email.com', '13100131009'],
      [10, '陈十二', 24, '女', '苏州', '人力资源', 13500, '2022-02-08', '人力资源部', 4.1, 'chenshier@email.com', '13000130010'],
      [11, '林十三', 30, '男', '天津', '市场专员', 15500, '2019-08-17', '市场部', 4.5, 'linshisan@email.com', '15900159011'],
      [12, '黄十四', 28, '女', '重庆', '销售经理', 23000, '2018-04-23', '销售部', 4.8, 'huangshisi@email.com', '15800158012'],
      [13, '刘十五', 29, '男', '宁波', '财务分析师', 18500, '2020-06-19', '财务部', 4.6, 'liushiwu@email.com', '15700157013'],
      [14, '张十六', 27, '女', '厦门', '内容运营', 14500, '2021-07-11', '运营部', 4.2, 'zhangshiliu@email.com', '15600156014'],
      [15, '王十七', 34, '男', '长沙', '技术总监', 32000, '2015-12-03', '管理层', 5.0, 'wangshiqi@email.com', '15500155015'],
      [16, '李十八', 26, '女', '青岛', '行政助理', 12000, '2022-01-28', '行政部', 4.0, 'lishiba@email.com', '15400154016'],
    ],
  }

  const columnData = computed(() => data.columns.map((item, colIndex) => ({
    title: item,
    data: data.rows.map(row => row[colIndex]),
  })))
  const filteredAndSortedData = ref(JSON.parse(JSON.stringify(data.rows)) as string[][])

  // 存储每列的过滤状态
  const columnFilters = ref<Record<string, ColumnFilter>>({})

  function updateFilteredAndSortedData() {
    let result = JSON.parse(JSON.stringify(data.rows))
    // 应用过滤
    Object.entries(columnFilters.value).forEach(([columnIndex, filter]) => {
      if (filter.selectedValues.length > 0) {
        const colIndex = Number.parseInt(columnIndex)
        result = result.filter(row => filter.selectedValues.includes(row[colIndex]))
      }
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

    filteredAndSortedData.value = result
    // return result
  }

  // 处理排序
  const handleSort = (columnIndex: number, order: 'asc' | 'desc') => {
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
  function handleCheckboxChange(columnIndex: number, newValue: any[]) {
    const key = columnIndex
    columnFilters.value[key].selectedValues = newValue
    const defaultSelectedLen = uniq(columnData.value[key].data).length
    const newValueLen = uniq(newValue).length
    const isIndet = newValueLen > 0 && newValueLen < defaultSelectedLen
    columnFilters.value[key].isIndeterminate = isIndet
    updateFilteredAndSortedData()
  }

  // 处理全选
  function handleSelectAll(columnIndex: number) {
    const newChecked = !columnFilters.value[columnIndex].isAllSelected
    if (newChecked) {
      const selectAllColumns = [...columnData.value[columnIndex].data]
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
    columnData.value.forEach((item, index) => {
      const xxx = uniq(item.data)
      columnFilters.value[index] = {
        selectedValues: [...xxx],
        defaultSelected: [...xxx],
        sortOrder: null,
        isAllSelected: true,
        isIndeterminate: false,
      }
    })
  }

  function uniq(columns: any[]) {
    return [...new Set(columns)]
  }

  initColumnFilters()

  return () => (
    <div class="p-6">
      <NTable bordered striped>
        <thead>
          <tr>
            {data.columns.map((column, columnIndex) => {
              const filter = columnFilters.value[columnIndex]
              return (
                <th key={column}>
                  <NPopover
                    trigger="click"
                    placement="bottom"
                    width={300}
                    scrollable
                  >
                    {{
                      trigger: () => (
                        <div class="flex gap-1 cursor-pointer items-center hover:text-blue-600">
                          {column}
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
                            <NSpace size="small">
                              <NButton
                                size="small"
                                type={filter.sortOrder === 'asc' ? 'primary' : 'default'}
                                onClick={() => handleSort(columnIndex, 'asc')}
                              >
                                正序
                              </NButton>
                              <NButton
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
                            <div class="max-h-40 overflow-y-auto">
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
                              <NCheckboxGroup
                                value={filter.selectedValues}
                                onUpdate:value={newValue => handleCheckboxChange(columnIndex, newValue)}
                              >
                                <div class="space-y-1">

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
          {filteredAndSortedData.value.map((row, rowIndex) => (
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
})

export default SortTablePage
