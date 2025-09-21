import { NButton, NFormItem } from 'naive-ui'
import { defineComponent, ref, shallowRef } from 'vue'
import { XForm, XFormAutoComplete, XFormCascader, XFormCheckbox, XFormColorPicker, XFormDatePicker, XFormDynamicTags, XFormInput, XFormInputNumber, XFormInputOTP, XFormRadio, XFormRate, XFormSelect, XFormSlider, XFormSwitch, XFormTimePicker, XFormTreeSelect, XFormUpload } from '@/components/ui/x-form'

const XFormDemo = defineComponent(() => {
  const basicFormRef = shallowRef<InstanceType<typeof XForm> | null>(null)
  const basicForm = ref({
    username: '',
    email: '',
    gender: null,
    hobbies: [],
    isVip: false,
    age: null,
    score: 0,
    rating: 0,
    birthday: null,
    workTime: null,
    autoComplete: null,
    treeSelect: null,
    favoriteColor: null,
    skills: [],
    city: null,
    tags: [],
    fileList: [],
    otpCode: null,
  })

  const genderOptions = [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' },
    { label: '其他', value: 'other' },
  ]

  const hobbyOptions = [
    { label: '阅读', value: 'reading' },
    { label: '运动', value: 'sports' },
    { label: '音乐', value: 'music' },
    { label: '旅行', value: 'travel' },
  ]

  const skillOptions = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react' },
  ]

  const cityOptions = [
    {
      label: '北京',
      value: 'beijing',
      children: [
        { label: '朝阳区', value: 'chaoyang' },
        { label: '海淀区', value: 'haidian' },
      ],
    },
    {
      label: '上海',
      value: 'shanghai',
      children: [
        { label: '浦东新区', value: 'pudong' },
        { label: '黄浦区', value: 'huangpu' },
      ],
    },
  ]

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
  const config = ref([])
  const configOptions = [
    { label: 'clearable', value: 'clearable' },
    { label: 'label-left', value: 'label-left' },
  ]

  return () => (
    <div class="p-4">
      <div class="mx-auto w-7xl">
        <h2 class="text-2xl font-bold mb-6">XForm 组件演示</h2>

        {/* 基础表单示例 */}
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-4">完整表单组件演示</h3>
          <div>
            <h3>自定义设置</h3>
            <div>
              <XFormCheckbox
                v-model:value={config.value}
                label="配置"
                options={configOptions}
              />
            </div>
          </div>
          <XForm
            ref={basicFormRef}
            model={basicForm.value}
            labelPlacement="left"
            labelWidth="auto"
            autoRules
          >
            <XFormInput
              v-model:value={basicForm.value.username}
              label="用户名"
              labelAlign={config.value.includes('label-left') ? 'left' : 'right'}
              path="username"
              placeholder="请输入用户名"
              clearable={config.value.includes('clearable')}
            />
            <div>{basicForm.value.username}</div>

            <XFormInput
              v-model:value={basicForm.value.email}
              label="邮箱"
              path="email"
              placeholder="请输入邮箱地址"
            />

            <XFormSelect
              v-model:value={basicForm.value.gender}
              label="性别"
              path="gender"
              options={genderOptions}
              placeholder="请选择性别"
            />

            <XFormCheckbox
              v-model:value={basicForm.value.hobbies}
              label="爱好"
              path="hobbies"
              options={hobbyOptions}
            />

            <XFormRadio
              v-model:value={basicForm.value.gender}
              label="性别（单选）"
              path="gender2"
              options={genderOptions}
            />

            <XFormSwitch
              v-model:value={basicForm.value.isVip}
              label="VIP会员"
              path="isVip"
            />
            <div>{typeof basicForm.value.isVip}</div>

            <XFormInputNumber
              v-model:value={basicForm.value.age}
              label="年龄"
              path="age"
              min={0}
              max={120}
              placeholder="请输入年龄"
            />

            <XFormSlider
              v-model:value={basicForm.value.score}
              label="分数"
              path="score"
              min={0}
              max={100}
            />

            <XFormRate
              v-model:value={basicForm.value.rating}
              label="评分"
              path="rating"
              count={5}
              allowHalf
            />

            <XFormDatePicker
              v-model:value={basicForm.value.birthday}
              label="生日"
              path="birthday"
              type="date"
              placeholder="请选择生日"
            />

            <XFormTimePicker
              v-model:value={basicForm.value.workTime}
              label="工作时间"
              path="workTime"
              placeholder="请选择时间"
            />

            <XFormColorPicker
              v-model:value={basicForm.value.favoriteColor}
              label="喜欢的颜色"
              path="favoriteColor"
            />

            <XFormAutoComplete
              v-model:value={basicForm.value.autoComplete}
              label="自动完成"
              path="autoComplete"
              options={skillOptions}
              placeholder="请输入技能"
            />

            <XFormCascader
              v-model:value={basicForm.value.city}
              label="城市"
              path="city"
              options={cityOptions}
              placeholder="请选择城市"
            />

            <XFormTreeSelect
              v-model:value={basicForm.value.treeSelect}
              label="树形选择"
              path="treeSelect"
              keyField="value"
              options={cityOptions}
              placeholder="请选择"
            />

            <XFormDynamicTags
              v-model:value={basicForm.value.tags}
              label="标签"
              path="tags"
            />

            <XFormUpload
              v-model:fileList={basicForm.value.fileList}
              label="文件上传"
              path="fileList"
              action="/api/upload"
              multiple
            />

            <XFormInputOTP
              v-model:value={basicForm.value.otpCode}
              label="验证码"
              path="otpCode"
              length={6}
            />
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

        {/* 内联表单示例 */}
        <div class="w-full">
          <XForm
            ref={basicFormRef}
            model={basicForm.value}
            labelPlacement="left"
            labelWidth="auto"
            autoRules
            inline
          >
            <XFormInput
              v-model:value={basicForm.value.username}
              label="用户名"
              labelAlign={config.value.includes('label-left') ? 'left' : 'right'}
              path="username"
              placeholder="请输入用户名"
              clearable={config.value.includes('clearable')}
            />
            <div>{basicForm.value.username}</div>

            <XFormInput
              v-model:value={basicForm.value.email}
              label="邮箱"
              path="email"
              placeholder="请输入邮箱地址"
            />

            <XFormSelect
              v-model:value={basicForm.value.gender}
              label="性别"
              path="gender"
              options={genderOptions}
              placeholder="请选择性别"
            />
            <NFormItem>
              <NButton type="primary" onClick={handleBasicSubmit}>
                提交
              </NButton>
              <NButton onClick={handleBasicReset}>
                重置
              </NButton>
              <NButton onClick={handleBasicValidate}>
                验证
              </NButton>
            </NFormItem>
          </XForm>
        </div>
      </div>
    </div>
  )
})

export default XFormDemo
