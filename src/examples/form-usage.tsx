// 使用示例：展示 FieldProps 支持的各种组件属性

import { useForm } from '../hooks/use-form'

export function FormUsageExample() {
  // 现在 FieldProps 支持类型安全的组件属性
  const [Form, form, { validate, resetField }] = useForm([
    // Input 组件
    ['用户名', 'username', {
      as: 'input',
      placeholder: '请输入用户名',
      clearable: true,
      maxlength: 20,
      rules: true,
    }],

    // InputNumber 组件
    ['年龄', 'age', {
      as: 'input-number',
      min: 0,
      max: 120,
      step: 1,
      precision: 0,
    }],

    // Select 组件
    ['性别', 'gender', {
      as: 'select',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
      clearable: true,
    }],

    // DatePicker 组件
    ['生日', 'birthday', {
      as: 'date-picker',
      type: 'date',
      format: 'yyyy-MM-dd',
      clearable: true,
    }],

    // Switch 组件
    ['是否启用', 'enabled', {
      as: 'switch',
      size: 'medium',
    }],

    // Checkbox Group 组件
    ['兴趣爱好', 'hobbies', {
      as: 'checkbox-group',
      options: [
        { label: '读书', value: 'reading' },
        { label: '运动', value: 'sports' },
        { label: '音乐', value: 'music' },
        { label: '旅行', value: 'travel' },
      ],
    }],

    // Radio Group 组件
    ['学历', 'education', {
      as: 'radio-group',
      options: [
        { label: '高中', value: 'high-school' },
        { label: '本科', value: 'bachelor' },
        { label: '硕士', value: 'master' },
        { label: '博士', value: 'doctor' },
      ],
    }],

    // Slider 组件
    ['评分', 'rating', {
      as: 'slider',
      min: 0,
      max: 10,
      step: 0.5,
      marks: {
        0: '0分',
        5: '5分',
        10: '10分',
      },
    }],
  ])

  const handleSubmit = async () => {
    try {
      const formData = await validate()
      console.log('表单数据:', formData)
    } catch (errors) {
      console.log('验证错误:', errors)
    }
  }

  return (
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">表单示例</h2>
      <Form />
      <div class="mt-6 space-x-4">
        <button
          class="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
          onClick={handleSubmit}
        >
          提交
        </button>
        <button
          class="text-white px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
          onClick={resetField}
        >
          重置
        </button>
      </div>
    </div>
  )
}
