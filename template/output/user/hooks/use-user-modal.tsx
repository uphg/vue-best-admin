import { XModal } from '@/components/ui/x-modal/x-modal'
import { useForm } from '@/hooks/use-form/use-form'
import { $message } from '@/utils/global'
import { apiCreateUser, apiUpdateUser } from './User-api'

export function useUserModal() {
  const modalRef = ref<InstanceType<typeof XModal>>()
  const visible = ref(false)
  const type = ref<'create' | 'edit'>('create')

  const { form, validate, resetForm } = useForm({
    formFields: [
      
      {
        key: 'name',
        label: '姓名',
        
        type: 'input',
        
        required: true,
      },
      
      {
        key: 'email',
        label: '邮箱',
        
        type: 'input',
        
        required: true,
      },
      
      {
        key: 'role',
        label: '角色',
        
        type: 'select',
        options: [
          
          { label: '管理员', value: 'admin' },
          
          { label: '编辑者', value: 'editor' },
          
          { label: '普通用户', value: 'user' },
          
        ],
        
        required: true,
      },
      
      {
        key: 'status',
        label: '状态',
        
        type: 'select',
        options: [
          
          { label: '激活', value: 'active' },
          
          { label: '未激活', value: 'inactive' },
          
          { label: '待审核', value: 'pending' },
          
        ],
        
        required: true,
      },
      
    ],
    autoRules: true,
  })

  const open = (modalType: 'create' | 'edit', data?: any) => {
    type.value = modalType
    visible.value = true
    
    if (modalType === 'edit' && data) {
      Object.keys(form).forEach(key => {
        if (key in data) {
          form[key] = data[key]
        }
      })
    } else {
      resetForm()
    }
  }

  const close = () => {
    visible.value = false
    resetForm()
  }

  const handleSubmit = async () => {
    try {
      await validate()
      
      if (type.value === 'create') {
        await apiCreateUser(form)
        $message.success('创建成功')
      } else {
        await apiUpdateUser(form.id, form)
        $message.success('更新成功')
      }
      
      close()
      modalRef.value?.refresh?.()
    } catch (error) {
      console.error('提交失败:', error)
    }
  }

  const onAfterLeave = () => {
    resetForm()
  }

  return {
    modalRef,
    visible,
    type,
    form,
    open,
    close,
    handleSubmit,
    onAfterLeave,
  }
}