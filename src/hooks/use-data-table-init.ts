import { reactive, ref } from 'vue'

interface TableInitOptions<T> {
  fetchApi: (params: any) => Promise<{ list: T[], total: number }>
  defaultParams?: Record<string, any>
  defaultPageSize?: number
}

export function useDataTableInit<T>(options: TableInitOptions<T>) {
  const tableData = ref<T[]>([])
  const loading = ref(false)
  const pagination = reactive({
    current: 1,
    pageSize: options.defaultPageSize || 10,
    total: 0,
  })
  const searchParams = reactive({ ...options.defaultParams })

  const fetchData = async () => {
    loading.value = true
    try {
      const res = await options.fetchApi({
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...searchParams,
      })
      tableData.value = res.list
      pagination.total = res.total
    } finally {
      loading.value = false
    }
  }

  const handlePageChange = (page: number) => {
    pagination.current = page
    fetchData()
  }

  const handlePageSizeChange = (size: number) => {
    pagination.pageSize = size
    fetchData()
  }

  return {
    tableData,
    loading,
    pagination,
    searchParams,
    fetchData,
    handlePageChange,
    handlePageSizeChange,
  }
}
