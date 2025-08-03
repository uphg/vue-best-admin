import { NButton, NSpace } from 'naive-ui'
import { useForm } from '@/hooks/use-form'

interface FormData {
  name: string
  region: number | null
  date: string | null
  type: number[]
  desc: string
}

const FormPage = defineComponent(() => {
  const [Form, formData, { resetForm, validate }] = useForm([
    ['活动名称', 'name', { rules: true }],
    ['活动区域', 'region', {
      type: 'select',
      options: [
        { label: '区域一', value: 0 },
        { label: '区域二', value: 1 },
        { label: '区域三', value: 2 },
      ],
    }],
    ['活动日期', 'date', {
      type: 'date',
      placeholder: '选择日期',
      rules: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
    }],
    ['活动性质', 'type', {
      type: 'checkbox',
      options: [
        { label: '美食/餐厅线上活动', value: 0, name: 'type' },
        { label: '地推活动', value: 1, name: 'type' },
        { label: '线下主题活动', value: 2, name: 'type' },
        { label: '单纯品牌曝光', value: 3, name: 'type' },
      ],
    }],
    ['活动形式', 'desc', { type: 'textarea' }],
  ], { rules: ['name', 'region', 'date'] })

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const result = await validate()
      console.log('表单提交数据:', result)
      // 这里可以调用 API 提交数据
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  // 处理表单重置
  const handleReset = () => {
    resetForm()
    console.log('表单已重置')
  }

  return () => (
    <div class="p-6">
      <div class="mx-auto w-2xl">
        <h2 class="text-2xl font-bold mb-6">活动表单</h2>
        <Form />
        <NSpace class="mt-6" justify="end">
          <NButton onClick={handleReset}>
            重置
          </NButton>
          <NButton type="primary" onClick={handleSubmit}>
            提交
          </NButton>
        </NSpace>
      </div>
    </div>
  )
})

export default FormPage
