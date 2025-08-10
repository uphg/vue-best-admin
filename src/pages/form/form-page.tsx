import { NButton, NSpace } from 'naive-ui'
import { useForm } from '@/hooks/use-form/use-form'

interface FormData {
  name: string
  region: number | null
  date: string | null
  type: number[]
  desc: string
}

const FormPage = defineComponent(() => {
  const [Form, formData, { resetForm, validate }] = useForm([
    ['活动名称', 'name', {}],
    ['活动名称', [
      [null, 'name1', { showFeedback: false }],
      [null, 'name2', { showFeedback: false }],
    ], { cols: 2, xGap: 24 }],
    ['活动区域', 'region', {
      as: 'select',
      options: [
        { label: '区域一', value: 0 },
        { label: '区域二', value: 1 },
        { label: '区域三', value: 2 },
      ],
    }],
    ['活动区域（多选）', 'region2', {
      as: 'select',
      multiple: true,
      options: [
        { label: '区域一', value: 0 },
        { label: '区域二', value: 1 },
        { label: '区域三', value: 2 },
      ],
    }],
    ['活动日期', 'date', {
      as: 'date',
      placeholder: '选择日期',
    }],
    ['活动日期', 'date2', {
      as: 'date',
      type: 'daterange',
      placeholder: '选择日期',
      clearable: true,
    }],
    ['活动性质', 'type', {
      as: 'checkbox',
      options: [
        { label: '美食/餐厅线上活动', value: 0, name: 'type' },
        { label: '地推活动', value: 1, name: 'type' },
        { label: '线下主题活动', value: 2, name: 'type' },
        { label: '单纯品牌曝光', value: 3, name: 'type' },
      ],
    }],
    ['活动形式', 'desc', { type: 'textarea' }],
    ['动态录入', 'dynamic', { as: 'dynamic-input', min: 2, max: 6, defaultValue: ['', ''] }],
  ], { autoRules: ['name', 'name1', 'region', 'date', 'date2'] })

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const result = await validate()
      console.log('表单提交数据:', result)
      console.log('formData')
      console.log(formData.value)
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
