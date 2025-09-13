import { NAutoComplete, NButton, NForm, NFormItem, NSpace } from 'naive-ui'

interface FormData {
  name: string
  region: number | null
  date: string | null
  type: number[]
  desc: string
}

const FormPage = defineComponent(() => {
  const formRef = shallowRef<InstanceType<typeof NForm> | null>(null)
  const form = ref({
    name: '',
  })

  const rules = {
    name: [
      { required: true, message: '请输入活动名称', trigger: ['blur', 'input'] },
    ],
  }

  function handleReset() {
    formRef.value?.restoreValidation()
  }

  function handleSubmit() {
    formRef.value?.validate((errors) => {
      if (!errors) {
        console.log('验证通过，可以提交表单')
      } else {
        console.log('验证失败，错误信息:', errors)
      }
    })
  }
  return () => (
    <div class="p-6">
      <div class="mx-auto w-2xl">
        <h2 class="text-2xl font-bold mb-6">活动表单</h2>
        <NForm ref={formRef} model={form.value} labelWidth="80px" rules={rules}>
          <NFormItem label="活动名称" path="name">
            <NAutoComplete v-model:value={form.value.name} placeholder="请输入活动名称" />
          </NFormItem>
        </NForm>
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
