<template>
  <div class="demo-container">
    <h3>useForm 演示</h3>

    <NCard title="基础表单示例" style="margin-bottom: 24px">
      <Form />
      <div style="margin-top: 16px; text-align: center">
        <NButton type="primary" @click="handleSubmit">
          提交
        </NButton>
        <NButton style="margin-left: 8px" @click="handleReset">
          重置
        </NButton>
        <NButton style="margin-left: 8px" @click="handleFill">
          填充示例数据
        </NButton>
      </div>
    </NCard>

    <NCard title="表单数据预览">
      <NCode :code="JSON.stringify(form, null, 2)" language="json" />
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NButton, NCard, NCode } from 'naive-ui'
import { useForm } from '@/hooks/use-form'

const fields = [
  ['用户名', 'username', {
    as: 'input',
    placeholder: '请输入用户名',
    maxlength: 20,
  }],
  ['邮箱', 'email', {
    as: 'input',
    type: 'email',
    placeholder: '请输入邮箱地址',
  }],
  ['年龄', 'age', {
    as: 'input-number',
    min: 18,
    max: 100,
    placeholder: '请输入年龄',
  }],
  ['性别', 'gender', {
    as: 'select',
    placeholder: '请选择性别',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '其他', value: 'other' },
    ],
  }],
  ['兴趣爱好', 'hobbies', {
    as: 'checkbox-group',
    options: [
      { label: '阅读', value: 'reading' },
      { label: '运动', value: 'sports' },
      { label: '音乐', value: 'music' },
      { label: '电影', value: 'movies' },
    ],
  }],
  ['出生日期', 'birthday', {
    as: 'date-picker',
    type: 'date',
  }],
  ['工作经验', 'experience', {
    as: 'slider',
    min: 0,
    max: 20,
    marks: {
      0: '0年',
      5: '5年',
      10: '10年',
      15: '15年',
      20: '20年',
    },
  }],
  ['满意度评分', 'rating', {
    as: 'rate',
    allowHalf: true,
  }],
  ['是否订阅', 'subscribe', {
    as: 'switch',
  }],
  ['个人简介', 'bio', {
    as: 'input',
    type: 'textarea',
    rows: 4,
    placeholder: '请输入个人简介',
  }],
]

const [Form, form, { validate, resetForm, setFields }] = useForm(fields, {
  autoRules: ['username', 'email', 'age', 'gender', 'birthday'],
})

async function handleSubmit() {
  try {
    const values = await validate()
    console.log('表单验证成功:', values)

    // 这里可以调用API提交数据
    console.log('提交成功！数据已打印到控制台')
  } catch (errors) {
    console.error('表单验证失败:', errors)
    console.log('表单验证失败，请检查输入')
  }
}

function handleReset() {
  resetForm()
}

function handleFill() {
  setFields({
    username: 'demo_user',
    email: 'demo@example.com',
    age: 28,
    gender: 'male',
    hobbies: ['reading', 'music'],
    birthday: Date.now() - 28 * 365 * 24 * 60 * 60 * 1000, // 28年前
    experience: 5,
    rating: 4.5,
    subscribe: true,
    bio: '这是一个演示用户，拥有丰富的前端开发经验。',
  })
}
</script>

<style scoped>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
}

.demo-form {
  max-width: 100%;
}

.form-actions {
  text-align: center;
  margin-top: 24px;
}

.form-preview {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  margin-top: 16px;
}

.form-preview pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
