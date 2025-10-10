import XModal from '@/components/ui/x-modal/x-modal'
import { useForm } from '@/hooks/use-form/use-form'
import { $message } from '@/utils/global'
import { apiCreateUser, apiUpdateUser } from '../user-api'

export function useUserModal({ refresh }: any) {
  const visible = ref(false)
  const type = ref<null | 'create' | 'update'>(null)

  const [Form, { form, resetForm, validate }] = useForm([
    { label: '姓名', key: 'name' },
    { label: '邮箱', key: 'email' },
    { label: '权限', key: 'role' },
    { label: '状态', key: 'status' },
  ], { autoRules: ['name', 'email', 'role', 'status'] })

  function open(_type: 'create' | 'update' = 'create', values?: Record<string, any>) {
    type.value = _type
    visible.value = true
    if (_type === 'create') return
    Object.assign(form.value, values)
  }

  function close() {
    visible.value = false
  }

  async function submit() {
    try {
      await validate()
      // TODO: 调用 API 提交数据
      if (type.value === 'create') {
        await apiCreateUser(form.value)
        $message.success('新增成功')
      } else {
        await apiUpdateUser(form.value.id, form.value)
        $message.success('修改成功')
      }
      refresh()
      close()
    } catch (error) {
      console.error('验证失败:', error)
    }
  }

  function onAfterLeave() {
    resetForm()
  }

  return [
    () => (
      <XModal
        v-model:visible={visible.value}
        title={type.value === 'create' ? '新增' : '修改'}
        onConfirm={submit}
        onCancel={close}
        onAfterLeave={onAfterLeave}
      >
        <Form />
      </XModal>
    ),
    { open, close },
  ] as const
}
