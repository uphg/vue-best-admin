import { NButton } from 'naive-ui'
import {
  XForm,
  XFormInput,
} from '@/components/ui/x-form'

const XFormDemo = defineComponent(() => {
  const basicFormRef = shallowRef<InstanceType<typeof XForm> | null>(null)
  const basicForm = ref({
    username: '',
    username2: '',
  })

  function handleBasicSubmit() {
    basicFormRef.value?.validate((errors) => {
      if (!errors) {
        alert('验证通过，提交成功！')
      } else {
        alert('表单验证失败，请检查输入项。')
      }
    })
  }

  function handleBasicReset() {
    basicFormRef.value?.reset()
  }

  function handleBasicValidate() {
    basicFormRef.value?.validate((errors) => {
      if (!errors) {
        alert('验证通过！')
      } else {
        alert('表单验证失败，请检查输入项。')
      }
    })
  }

  return () => (
    <div class="p-6">
      <div class="mx-auto w-2xl">
        <h2 class="text-2xl font-bold mb-6">XForm 组件演示</h2>

        {/* 基础表单示例 */}
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-4">基础表单</h3>
          <XForm
            ref={basicFormRef}
            model={basicForm.value}
            labelPlacement="left"
            labelWidth="auto"
            autoRules
          >
            <XFormInput v-model:value={basicForm.value.username} label="用户名233" path="username">{{
              itemPrefix: () => 1,
            }}
            </XFormInput>
            <XFormInput v-model:value={basicForm.value.username2} label="用户名" path="username2">{{
              itemPrefix: () => 2,
            }}
            </XFormInput>
          </XForm>

          <div class="mt-6 flex gap-4">
            <NButton type="primary" onClick={handleBasicSubmit}>
              提交
            </NButton>
            <NButton onClick={handleBasicReset}>
              重置
            </NButton>
            <NButton onClick={handleBasicValidate}>
              验证
            </NButton>
          </div>
        </div>

      </div>
    </div>
  )
})

export default XFormDemo
