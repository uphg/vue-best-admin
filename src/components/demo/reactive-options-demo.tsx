import { defineComponent, onMounted, ref } from 'vue'
import { useForm } from '@/hooks/use-form'

export default defineComponent({
  name: 'ReactiveOptionsDemo',
  setup() {
    // 响应式的选项数据
    const genderOptions = ref([
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ])

    const cityOptions = ref([])
    const skillOptions = ref([])

    // 模拟异步获取城市数据
    const fetchCities = async () => {
      // 模拟 API 延迟
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 更新城市选项
      cityOptions.value = [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
      ]
    }

    // 模拟异步获取技能数据
    const fetchSkills = async () => {
      // 模拟 API 延迟
      await new Promise(resolve => setTimeout(resolve, 1500))

      // 更新技能选项
      skillOptions.value = [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Vue.js', value: 'vue' },
        { label: 'React', value: 'react' },
        { label: 'Node.js', value: 'node' },
      ]
    }

    // 表单字段定义
    const fields = [
      ['姓名', 'name', { as: 'input', placeholder: '请输入姓名' }],
      ['性别', 'gender', {
        as: 'select',
        placeholder: '请选择性别',
        options: genderOptions,
      }],
      ['城市', 'city', {
        as: 'select',
        placeholder: '请选择城市',
        options: cityOptions,
      }],
      ['技能', 'skills', {
        as: 'checkbox-group',
        options: skillOptions,
      }],
    ]

    // 创建表单
    const [Form, form, { validate, resetForm }] = useForm(fields, {
      autoRules: ['name'],
    })

    // 提交处理
    const handleSubmit = async () => {
      try {
        const values = await validate()
        console.log('表单数据:', values)
        // 这里可以处理提交逻辑
      } catch (errors) {
        console.error('验证失败:', errors)
      }
    }

    // 组件挂载时获取数据
    onMounted(() => {
      fetchCities()
      fetchSkills()
    })

    // 动态添加选项的示例
    const addGenderOption = () => {
      genderOptions.value.push({
        label: `选项${genderOptions.value.length + 1}`,
        value: `option${genderOptions.value.length + 1}`,
      })
    }

    return () => (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>响应式 Options 示例</h2>
        <p>此示例演示了如何在 useForm 中使用响应式的 options 数据。</p>

        <Form />

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={handleSubmit} style={{ marginRight: '10px' }}>
            提交
          </button>
          <button onClick={resetForm} style={{ marginRight: '10px' }}>
            重置
          </button>
          <button onClick={addGenderOption}>
            动态添加性别选项
          </button>
        </div>

        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
          <h3>当前表单数据:</h3>
          <pre>{JSON.stringify(form.value, null, 2)}</pre>
        </div>
      </div>
    )
  },
})
