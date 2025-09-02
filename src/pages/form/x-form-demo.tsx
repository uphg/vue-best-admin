import { NButton } from 'naive-ui'
import {
  XForm,
  XFormAutoComplete,
  XFormCascader,
  XFormCheckbox,
  XFormColorPicker,
  XFormDatePicker,
  XFormDynamicInput,
  XFormDynamicTags,
  XFormInput,
  XFormInputNumber,
  XFormInputOTP,
  XFormMention,
  XFormRadio,
  XFormRate,
  XFormSelect,
  XFormSlider,
  XFormSwitch,
  XFormTextarea,
  XFormTimePicker,
  XFormTransfer,
  XFormTreeSelect,
  XFormUpload,
} from '@/components/ui/x-form'

const XFormDemo = defineComponent(() => {
  // 表单引用
  const basicFormRef = ref()
  const defaultPropsFormRef = ref()

  // 基础表单数据
  const basicForm = reactive({
    name: '',
    age: null,
    gender: null,
    bio: '',
    birthDate: null,
    workTime: null,
    hobbies: [],
    education: null,
    emailNotification: false,
    satisfaction: 50,
    rating: 0,
    skills: '',
    region: [],
    department: null,
    themeColor: null,
    transferValue: [],
    fileList: [],
    dynamicInputValue: [''],
    dynamicTagsValue: [],
    otpValue: '',
    mentionValue: '',
  })

  // 默认属性表单数据
  const defaultPropsForm = reactive({
    username: '',
    city: null,
    salary: null,
  })

  // 基础表单验证规则
  const basicRules = {
    name: {
      required: true,
      message: '请输入姓名',
      trigger: ['blur', 'input'],
    },
    age: {
      required: true,
      type: 'number' as const,
      message: '请输入年龄',
      trigger: ['blur', 'change'],
    },
    gender: {
      required: true,
      message: '请选择性别',
      trigger: ['blur', 'change'],
    },
  }

  // 选项数据
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
    { label: '编程', value: 'programming' },
  ]

  const educationOptions = [
    { label: '高中', value: 'high_school' },
    { label: '大专', value: 'college' },
    { label: '本科', value: 'bachelor' },
    { label: '硕士', value: 'master' },
    { label: '博士', value: 'doctor' },
  ]

  const cityOptions = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen' },
    { label: '杭州', value: 'hangzhou' },
  ]

  const skillOptions = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
  ]

  const regionOptions = [
    {
      label: '中国',
      value: 'china',
      children: [
        {
          label: '北京市',
          value: 'beijing',
          children: [
            { label: '朝阳区', value: 'chaoyang' },
            { label: '海淀区', value: 'haidian' },
            { label: '东城区', value: 'dongcheng' },
          ],
        },
        {
          label: '上海市',
          value: 'shanghai',
          children: [
            { label: '黄浦区', value: 'huangpu' },
            { label: '浦东新区', value: 'pudong' },
            { label: '徐汇区', value: 'xuhui' },
          ],
        },
      ],
    },
  ]

  const departmentOptions = [
    {
      label: '技术部',
      key: 'tech',
      children: [
        { label: '前端组', key: 'frontend' },
        { label: '后端组', key: 'backend' },
        { label: '移动组', key: 'mobile' },
      ],
    },
    {
      label: '产品部',
      key: 'product',
      children: [
        { label: '产品经理', key: 'pm' },
        { label: 'UI设计', key: 'ui' },
        { label: 'UX设计', key: 'ux' },
      ],
    },
    {
      label: '运营部',
      key: 'operation',
      children: [
        { label: '内容运营', key: 'content' },
        { label: '用户运营', key: 'user' },
        { label: '数据分析', key: 'data' },
      ],
    },
  ]

  const transferOptions = [
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
    { label: '选项3', value: 'option3' },
    { label: '选项4', value: 'option4' },
    { label: '选项5', value: 'option5' },
  ]

  const mentionOptions = [
    { label: '张三', value: 'zhangsan' },
    { label: '李四', value: 'lisi' },
    { label: '王五', value: 'wangwu' },
    { label: '赵六', value: 'zhaoliu' },
  ]

  // 默认属性配置
  const defaultProps = {
    // 全局默认属性
    'global': {
      clearable: true,
    },
    // 输入框默认属性
    'input': {
      showPasswordOn: 'click',
    },
    // 选择器默认属性
    'select': {
      filterable: true,
    },
    // 数字输入框默认属性
    'input-number': {
      showButton: false,
      precision: 0,
    },
  }

  // 基础表单处理函数
  const handleBasicSubmit = async () => {
    try {
      await basicFormRef.value?.validate()
      console.log('基础表单提交数据:', basicForm)
      // 这里可以调用 API 提交数据
    } catch (error) {
      console.error('基础表单验证失败:', error)
    }
  }

  const handleBasicReset = () => {
    Object.assign(basicForm, {
      name: '',
      age: null,
      gender: null,
      bio: '',
      birthDate: null,
      workTime: null,
      hobbies: [],
      education: null,
      emailNotification: false,
      satisfaction: 50,
      rating: 0,
      skills: '',
      region: [],
      department: null,
      themeColor: null,
      transferValue: [],
      fileList: [],
      dynamicInputValue: [''],
      dynamicTagsValue: [],
      otpValue: '',
      mentionValue: '',
    })
    basicFormRef.value?.restoreValidation()
  }

  const handleBasicValidate = async () => {
    try {
      await basicFormRef.value?.validate()
      console.log('基础表单验证通过')
    } catch (error) {
      console.error('基础表单验证失败:', error)
    }
  }

  // 默认属性表单处理函数
  const handleDefaultPropsSubmit = () => {
    console.log('默认属性表单提交数据:', defaultPropsForm)
  }

  const handleDefaultPropsReset = () => {
    Object.assign(defaultPropsForm, {
      username: '',
      city: null,
      salary: null,
    })
    defaultPropsFormRef.value?.restoreValidation()
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
            model={basicForm}
            rules={basicRules}
            labelPlacement="left"
            labelWidth="auto"
            requireMarkPlacement="right-hanging"
          >
            <XFormInput
              label="姓名"
              path="name"
              value={basicForm.name}
              onUpdate:value={(value: string | number | null) => basicForm.name = value as string}
            />

            <XFormInputNumber
              label="年龄"
              path="age"
              value={basicForm.age || undefined}
              min={0}
              max={120}
              onUpdate:value={(value: number | null) => basicForm.age = value}
            />

            <XFormSelect
              label="性别"
              path="gender"
              value={basicForm.gender}
              options={genderOptions}
              onUpdate:value={(value: any) => basicForm.gender = value}
            />

            <XFormTextarea
              label="个人简介"
              path="bio"
              value={basicForm.bio}
              rows={4}
              onUpdate:value={(value: string) => basicForm.bio = value}
            />

            <XFormDatePicker
              label="出生日期"
              path="birthDate"
              value={basicForm.birthDate}
              type="date"
              onUpdate:value={(value: any) => basicForm.birthDate = value}
            />

            <XFormTimePicker
              label="工作时间"
              path="workTime"
              value={basicForm.workTime}
              onUpdate:value={(value: any) => basicForm.workTime = value}
            />

            <XFormCheckbox
              label="兴趣爱好"
              path="hobbies"
              value={basicForm.hobbies}
              options={hobbyOptions}
              onUpdate:value={(value: any) => basicForm.hobbies = value}
            />

            <XFormRadio
              label="学历"
              path="education"
              value={basicForm.education}
              options={educationOptions}
              onUpdate:value={(value: any) => basicForm.education = value}
            />

            <XFormSwitch
              label="是否接收邮件通知"
              path="emailNotification"
              value={basicForm.emailNotification}
              onUpdate:value={(value: boolean) => basicForm.emailNotification = value}
            />

            <XFormSlider
              label="满意度评分"
              path="satisfaction"
              value={basicForm.satisfaction}
              min={0}
              max={100}
              step={10}
              onUpdate:value={(value: number | number[]) => basicForm.satisfaction = value as number}
            />

            <XFormRate
              label="服务评价"
              path="rating"
              value={basicForm.rating}
              count={5}
              allowHalf={true}
              onUpdate:value={(value: number) => basicForm.rating = value}
            />

            <XFormAutoComplete
              label="技能"
              path="skills"
              value={basicForm.skills}
              options={skillOptions}
              onUpdate:value={(value: string) => basicForm.skills = value}
            />

            <XFormCascader
              label="地区"
              path="region"
              value={basicForm.region}
              options={regionOptions}
              onUpdate:value={(value: any) => basicForm.region = value}
            />

            <XFormTreeSelect
              label="部门"
              path="department"
              value={basicForm.department}
              options={departmentOptions}
              onUpdate:value={(value: any) => basicForm.department = value}
            />

            <XFormColorPicker
              label="主题色"
              path="themeColor"
              value={basicForm.themeColor}
              onUpdate:value={(value: any) => basicForm.themeColor = value}
            />

            <XFormTransfer
              label="数据穿梭"
              path="transferValue"
              value={basicForm.transferValue}
              options={transferOptions}
              onUpdate:value={(value: any) => basicForm.transferValue = value}
            />

            <XFormUpload
              label="文件上传"
              path="fileList"
              fileList={basicForm.fileList}
              action="/api/upload"
              onUpdate:fileList={(fileList: any) => basicForm.fileList = fileList}
            >
              <NButton>点击上传</NButton>
            </XFormUpload>

            <XFormDynamicInput
              label="动态输入"
              path="dynamicInputValue"
              value={basicForm.dynamicInputValue}
              min={1}
              max={5}
              onUpdate:value={(value: any) => basicForm.dynamicInputValue = value}
            />

            <XFormDynamicTags
              label="动态标签"
              path="dynamicTagsValue"
              value={basicForm.dynamicTagsValue}
              onUpdate:value={(value: any) => basicForm.dynamicTagsValue = value}
            />

            <XFormInputOTP
              label="验证码"
              path="otpValue"
              value={basicForm.otpValue}
              length={6}
              onUpdate:value={(value: any) => basicForm.otpValue = value}
            />

            <XFormMention
              label="提及用户"
              path="mentionValue"
              value={basicForm.mentionValue}
              options={mentionOptions}
              prefix="@"
              onUpdate:value={(value: any) => basicForm.mentionValue = value}
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

        {/* 带默认属性的表单示例 */}
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-4">带默认属性的表单</h3>
          <XForm
            ref={defaultPropsFormRef}
            model={defaultPropsForm}
            defaultProps={defaultProps}
            labelPlacement="left"
            labelWidth="auto"
          >
            <XFormInput
              label="用户名"
              path="username"
              value={defaultPropsForm.username}
              onUpdate:value={(value: any) => defaultPropsForm.username = value}
            />

            <XFormSelect
              label="城市"
              path="city"
              value={defaultPropsForm.city}
              options={cityOptions}
              onUpdate:value={(value: any) => defaultPropsForm.city = value}
            />

            <XFormInputNumber
              label="薪资"
              path="salary"
              value={defaultPropsForm.salary}
              onUpdate:value={(value: any) => defaultPropsForm.salary = value}
            />
          </XForm>

          <div class="mt-6 flex gap-4">
            <NButton type="primary" onClick={handleDefaultPropsSubmit}>
              提交
            </NButton>
            <NButton onClick={handleDefaultPropsReset}>
              重置
            </NButton>
          </div>
        </div>

        {/* 表单数据展示 */}
        <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div>
            <h4 class="text-md font-medium mb-2">基础表单数据：</h4>
            <pre class="text-sm p-4 rounded bg-gray-100 overflow-auto">
              {JSON.stringify(basicForm, null, 2)}
            </pre>
          </div>
          <div>
            <h4 class="text-md font-medium mb-2">默认属性表单数据：</h4>
            <pre class="text-sm p-4 rounded bg-gray-100 overflow-auto">
              {JSON.stringify(defaultPropsForm, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
})

export default XFormDemo
