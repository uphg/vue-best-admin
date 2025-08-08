import { describe, expect, it } from 'vitest'
import { useForm } from './use-form'

describe('useForm', () => {
  describe('form data initialization', () => {
    it('should initialize form data with correct default values for input components', () => {
      const [, form] = useForm([
        ['文本', 'text', { as: 'input' }],
        ['自动完成', 'autoComplete', { as: 'auto-complete' }],
      ])

      expect(form.value.text).toBe(null)
      expect(form.value.autoComplete).toBe(null)
    })

    it('should initialize form data with correct default values for number components', () => {
      const [, form] = useForm([
        ['数字', 'number', { as: 'input-number' }],
        ['滑块', 'slider', { as: 'slider' }],
        ['评分', 'rate', { as: 'rate' }],
      ])

      expect(form.value.number).toBe(0)
      expect(form.value.slider).toBe(0)
      expect(form.value.rate).toBe(0)
    })

    it('should initialize form data with correct default values for boolean components', () => {
      const [, form] = useForm([
        ['开关', 'switch', { as: 'switch' }],
      ])

      expect(form.value.switch).toBe(false)
    })

    it('should initialize form data with correct default values for selection components', () => {
      const [, form] = useForm([
        ['选择', 'select', { as: 'select' }],
        ['多选', 'multiSelect', { as: 'select', multiple: true }],
        ['级联', 'cascader', { as: 'cascader' }],
        ['树选择', 'treeSelect', { as: 'tree-select' }],
      ])

      expect(form.value.select).toBe(null)
      expect(form.value.multiSelect).toEqual([])
      expect(form.value.cascader).toBe(null)
      expect(form.value.treeSelect).toBe(null)
    })

    it('should initialize form data with correct default values for date/time components', () => {
      const [, form] = useForm([
        ['日期', 'date', { as: 'date-picker' }],
        ['时间', 'time', { as: 'time-picker' }],
        ['颜色', 'color', { as: 'color-picker' }],
      ])

      expect(form.value.date).toBe(null)
      expect(form.value.time).toBe(null)
      expect(form.value.color).toBe(null)
    })

    it('should initialize form data with correct default values for array components', () => {
      const [, form] = useForm([
        ['复选框', 'checkbox', { as: 'checkbox-group' }],
        ['复选框按钮', 'checkboxButton', { as: 'checkbox-button-group' }],
        ['传输', 'transfer', { as: 'transfer' }],
        ['上传', 'upload', { as: 'upload' }],
        ['动态输入', 'dynamicInput', { as: 'dynamic-input' }],
        ['动态标签', 'dynamicTags', { as: 'dynamic-tags' }],
      ])

      expect(form.value.checkbox).toEqual([])
      expect(form.value.checkboxButton).toEqual([])
      expect(form.value.transfer).toEqual([])
      expect(form.value.upload).toEqual([])
      expect(form.value.dynamicInput).toEqual([])
      expect(form.value.dynamicTags).toEqual([])
    })

    it('should initialize with custom min values', () => {
      const [, form] = useForm([
        ['数字', 'number', { as: 'input-number', min: 10 }],
        ['滑块', 'slider', { as: 'slider', min: 5 }],
        ['评分', 'rate', { as: 'rate', min: 1 }],
      ])

      expect(form.value.number).toBe(10)
      expect(form.value.slider).toBe(5)
      expect(form.value.rate).toBe(1)
    })
  })

  describe('form component types coverage', () => {
    it('should support all FieldAs component types', () => {
      const [, form] = useForm([
        // Text input types
        ['输入框', 'input', { as: 'input' }],
        ['自动完成', 'autoComplete', { as: 'auto-complete' }],

        // Number input types
        ['数字输入', 'inputNumber', { as: 'input-number' }],
        ['滑块', 'slider', { as: 'slider' }],
        ['评分', 'rate', { as: 'rate' }],

        // Selection types
        ['下拉选择', 'select', { as: 'select' }],
        ['级联选择', 'cascader', { as: 'cascader' }],
        ['树选择', 'treeSelect', { as: 'tree-select' }],

        // Date/Time types
        ['日期选择', 'datePicker', { as: 'date-picker' }],
        ['时间选择', 'timePicker', { as: 'time-picker' }],

        // Boolean types
        ['开关', 'switch', { as: 'switch' }],

        // Multiple selection types
        ['复选框组', 'checkboxGroup', { as: 'checkbox-group' }],
        ['复选框按钮组', 'checkboxButtonGroup', { as: 'checkbox-button-group' }],
        ['单选框组', 'radioGroup', { as: 'radio-group' }],
        ['单选按钮组', 'radioButtonGroup', { as: 'radio-button-group' }],

        // Other types
        ['颜色选择', 'colorPicker', { as: 'color-picker' }],
        ['传输框', 'transfer', { as: 'transfer' }],
        ['上传', 'upload', { as: 'upload' }],
        ['动态输入', 'dynamicInput', { as: 'dynamic-input' }],
        ['动态标签', 'dynamicTags', { as: 'dynamic-tags' }],
      ])

      // Verify all form fields are initialized
      const fieldKeys = [
        'input',
        'autoComplete',
        'inputNumber',
        'slider',
        'rate',
        'select',
        'cascader',
        'treeSelect',
        'datePicker',
        'timePicker',
        'switch',
        'checkboxGroup',
        'checkboxButtonGroup',
        'radioGroup',
        'radioButtonGroup',
        'colorPicker',
        'transfer',
        'upload',
        'dynamicInput',
        'dynamicTags',
      ]

      fieldKeys.forEach((key) => {
        expect(form.value).toHaveProperty(key)
      })

      // Verify specific default values
      expect(form.value.input).toBe('')
      expect(form.value.autoComplete).toBe('')
      expect(form.value.inputNumber).toBe(0)
      expect(form.value.slider).toBe(0)
      expect(form.value.rate).toBe(0)
      expect(form.value.select).toBe(null)
      expect(form.value.cascader).toBe(null)
      expect(form.value.treeSelect).toBe(null)
      expect(form.value.datePicker).toBe(null)
      expect(form.value.timePicker).toBe(null)
      expect(form.value.switch).toBe(false)
      expect(form.value.checkboxGroup).toEqual([])
      expect(form.value.checkboxButtonGroup).toEqual([])
      expect(form.value.radioGroup).toBe('')
      expect(form.value.radioButtonGroup).toBe('')
      expect(form.value.colorPicker).toBe(null)
      expect(form.value.transfer).toEqual([])
      expect(form.value.upload).toEqual([])
      expect(form.value.dynamicInput).toEqual([])
      expect(form.value.dynamicTags).toEqual([])
    })
  })

  describe('form methods', () => {
    it('should reset form to default values', () => {
      const [, form, { resetField }] = useForm([
        ['文本', 'text', { as: 'input' }],
        ['数字', 'number', { as: 'input-number' }],
        ['开关', 'switch', { as: 'switch' }],
        ['选择', 'select', { as: 'select', multiple: true }],
        ['复选框', 'checkbox', { as: 'checkbox-group' }],
      ])

      // Modify form values
      form.value.text = 'modified'
      form.value.number = 100
      form.value.switch = true
      form.value.select = ['option1']
      form.value.checkbox = ['value1']

      // Reset form
      resetField()

      // Check if values are reset to defaults
      expect(form.value.text).toBe('')
      expect(form.value.number).toBe(0)
      expect(form.value.switch).toBe(false)
      expect(form.value.select).toEqual([])
      expect(form.value.checkbox).toEqual([])
    })

    it('should set multiple fields at once', () => {
      const [, form, { setFields }] = useForm([
        ['文本', 'text', { as: 'input' }],
        ['数字', 'number', { as: 'input-number' }],
        ['开关', 'switch', { as: 'switch' }],
        ['选择', 'select', { as: 'select' }],
      ])

      setFields({
        text: 'new text',
        number: 42,
        switch: true,
        select: 'option1',
      })

      expect(form.value.text).toBe('new text')
      expect(form.value.number).toBe(42)
      expect(form.value.switch).toBe(true)
      expect(form.value.select).toBe('option1')
    })
  })

  describe('component type aliases', () => {
    it('should handle date and date-picker aliases', () => {
      const [, form1] = useForm([['日期1', 'date1', { as: 'date' }]])
      const [, form2] = useForm([['日期2', 'date2', { as: 'date-picker' }]])

      expect(form1.value.date1).toBe(null)
      expect(form2.value.date2).toBe(null)
    })

    it('should handle time and time-picker aliases', () => {
      const [, form1] = useForm([['时间1', 'time1', { as: 'time' }]])
      const [, form2] = useForm([['时间2', 'time2', { as: 'time-picker' }]])

      expect(form1.value.time1).toBe(null)
      expect(form2.value.time2).toBe(null)
    })

    it('should handle checkbox and checkbox-group aliases', () => {
      const [, form1] = useForm([['复选框1', 'checkbox1', { as: 'checkbox' }]])
      const [, form2] = useForm([['复选框2', 'checkbox2', { as: 'checkbox-group' }]])

      expect(form1.value.checkbox1).toEqual([])
      expect(form2.value.checkbox2).toEqual([])
    })

    it('should handle radio and radio-group aliases', () => {
      const [, form1] = useForm([['单选1', 'radio1', { as: 'radio' }]])
      const [, form2] = useForm([['单选2', 'radio2', { as: 'radio-group' }]])

      expect(form1.value.radio1).toBe(null)
      expect(form2.value.radio2).toBe(null)
    })

    it('should handle radio-button and radio-button-group aliases', () => {
      const [, form1] = useForm([['单选按钮1', 'radioButton1', { as: 'radio-button' }]])
      const [, form2] = useForm([['单选按钮2', 'radioButton2', { as: 'radio-button-group' }]])

      expect(form1.value.radioButton1).toBe('')
      expect(form2.value.radioButton2).toBe('')
    })

    it('should handle checkbox-button and checkbox-button-group aliases', () => {
      const [, form1] = useForm([['复选按钮1', 'checkboxButton1', { as: 'checkbox-button' }]])
      const [, form2] = useForm([['复选按钮2', 'checkboxButton2', { as: 'checkbox-button-group' }]])

      expect(form1.value.checkboxButton1).toEqual([])
      expect(form2.value.checkboxButton2).toEqual([])
    })
  })

  describe('edge cases', () => {
    it('should handle fields without explicit as property (defaults to input)', () => {
      const [, form] = useForm([
        ['默认字段', 'default', {}],
      ])

      expect(form.value.default).toBe('')
    })

    it('should handle multiple selection with multiple property', () => {
      const [, form] = useForm([
        ['单选', 'singleSelect', { as: 'select' }],
        ['多选', 'multiSelect', { as: 'select', multiple: true }],
        ['单选级联', 'singleCascader', { as: 'cascader' }],
        ['多选级联', 'multiCascader', { as: 'cascader', multiple: true }],
        ['单选树', 'singleTree', { as: 'tree-select' }],
        ['多选树', 'multiTree', { as: 'tree-select', multiple: true }],
      ])

      expect(form.value.singleSelect).toBe(null)
      expect(form.value.multiSelect).toEqual([])
      expect(form.value.singleCascader).toBe(null)
      expect(form.value.multiCascader).toEqual([])
      expect(form.value.singleTree).toBe(null)
      expect(form.value.multiTree).toEqual([])
    })
  })

  describe('form rules generation', () => {
    describe('input type rules', () => {
      it('should generate correct rules for input components', () => {
        const [, , { formRef }] = useForm([
          ['文本输入', 'input', { as: 'input' }],
          ['自动完成', 'autoComplete', { as: 'auto-complete' }],
          ['动态输入', 'dynamicInput', { as: 'dynamic-input' }],
        ], { autoRules: ['input', 'autoComplete', 'dynamicInput'] })

        const rules = formRef.value?.rules
        expect(rules).toBeDefined()
        expect(rules.input).toMatchObject({
          required: true,
          message: '请输入文本输入',
          trigger: ['blur', 'input'],
        })
        expect(rules.autoComplete).toMatchObject({
          required: true,
          message: '请输入自动完成',
          trigger: ['blur', 'input'],
        })
        expect(rules.dynamicInput).toMatchObject({
          required: true,
          message: '请输入动态输入',
          trigger: ['blur', 'input'],
        })
      })
    })

    describe('selection type rules', () => {
      it('should generate correct rules for select components', () => {
        const [, , { formRef }] = useForm([
          ['下拉选择', 'select', { as: 'select' }],
          ['树选择', 'treeSelect', { as: 'tree-select' }],
          ['级联选择', 'cascader', { as: 'cascader' }],
        ], { autoRules: ['select', 'treeSelect', 'cascader'] })

        const rules = formRef.value?.rules
        expect(rules.select).toMatchObject({
          required: true,
          message: '请选择下拉选择',
          trigger: ['blur', 'change'],
        })
        expect(rules.select.validator).toBeDefined()

        expect(rules.treeSelect).toMatchObject({
          required: true,
          message: '请选择树选择',
          trigger: ['blur', 'change'],
        })
        expect(rules.treeSelect.validator).toBeDefined()

        expect(rules.cascader).toMatchObject({
          required: true,
          message: '请选择级联选择',
          trigger: ['blur', 'change'],
        })
        expect(rules.cascader.validator).toBeDefined()
      })

      it('should generate correct rules for date/time components', () => {
        const [, , { formRef }] = useForm([
          ['日期', 'date', { as: 'date' }],
          ['日期选择', 'datePicker', { as: 'date-picker' }],
          ['时间', 'time', { as: 'time' }],
          ['时间选择', 'timePicker', { as: 'time-picker' }],
        ], { autoRules: ['date', 'datePicker', 'time', 'timePicker'] })

        const rules = formRef.value?.rules
        expect(rules.date).toMatchObject({
          required: true,
          message: '请选择日期',
          trigger: ['blur', 'change'],
        })
        expect(rules.datePicker).toMatchObject({
          required: true,
          message: '请选择日期选择',
          trigger: ['blur', 'change'],
        })
        expect(rules.time).toMatchObject({
          required: true,
          message: '请选择时间',
          trigger: ['blur', 'change'],
        })
        expect(rules.timePicker).toMatchObject({
          required: true,
          message: '请选择时间选择',
          trigger: ['blur', 'change'],
        })
      })

      it('should generate correct rules for radio components', () => {
        const [, , { formRef }] = useForm([
          ['单选', 'radio', { as: 'radio' }],
          ['单选组', 'radioGroup', { as: 'radio-group' }],
          ['单选按钮', 'radioButton', { as: 'radio-button' }],
          ['单选按钮组', 'radioButtonGroup', { as: 'radio-button-group' }],
        ], { autoRules: ['radio', 'radioGroup', 'radioButton', 'radioButtonGroup'] })

        const rules = formRef.value?.rules
        expect(rules.radio).toMatchObject({
          required: true,
          message: '请选择单选',
          trigger: ['blur', 'change'],
        })
        expect(rules.radioGroup).toMatchObject({
          required: true,
          message: '请选择单选组',
          trigger: ['blur', 'change'],
        })
        expect(rules.radioButton).toMatchObject({
          required: true,
          message: '请选择单选按钮',
          trigger: ['blur', 'change'],
        })
        expect(rules.radioButtonGroup).toMatchObject({
          required: true,
          message: '请选择单选按钮组',
          trigger: ['blur', 'change'],
        })
      })
    })

    describe('array type rules', () => {
      it('should generate correct rules for array components', () => {
        const [, , { formRef }] = useForm([
          ['复选框', 'checkbox', { as: 'checkbox' }],
          ['复选框组', 'checkboxGroup', { as: 'checkbox-group' }],
          ['复选框按钮', 'checkboxButton', { as: 'checkbox-button' }],
          ['复选框按钮组', 'checkboxButtonGroup', { as: 'checkbox-button-group' }],
          ['动态标签', 'dynamicTags', { as: 'dynamic-tags' }],
          ['传输', 'transfer', { as: 'transfer' }],
          ['上传', 'upload', { as: 'upload' }],
        ], {
          autoRules: ['checkbox', 'checkboxGroup', 'checkboxButton', 'checkboxButtonGroup', 'dynamicTags', 'transfer', 'upload'],
        })

        const rules = formRef.value?.rules
        expect(rules.checkbox).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择复选框',
          trigger: 'change',
        })
        expect(rules.checkboxGroup).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择复选框组',
          trigger: 'change',
        })
        expect(rules.checkboxButton).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择复选框按钮',
          trigger: 'change',
        })
        expect(rules.checkboxButtonGroup).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择复选框按钮组',
          trigger: 'change',
        })
        expect(rules.dynamicTags).toMatchObject({
          type: 'array',
          required: true,
          message: '请输入动态标签',
          trigger: 'change',
        })
        expect(rules.transfer).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择传输',
          trigger: 'change',
        })
        expect(rules.upload).toMatchObject({
          type: 'array',
          required: true,
          message: '请选择上传',
          trigger: 'change',
        })
      })
    })

    describe('number type rules', () => {
      it('should generate correct rules for number components', () => {
        const [, , { formRef }] = useForm([
          ['数字输入', 'inputNumber', { as: 'input-number' }],
          ['滑块', 'slider', { as: 'slider' }],
          ['评分', 'rate', { as: 'rate' }],
        ], { autoRules: ['inputNumber', 'slider', 'rate'] })

        const rules = formRef.value?.rules
        expect(rules.inputNumber).toMatchObject({
          type: 'number',
          required: true,
          message: '请输入数字输入',
          trigger: ['blur', 'change'],
        })
        expect(rules.slider).toMatchObject({
          type: 'number',
          required: true,
          message: '请选择滑块',
          trigger: ['blur', 'change'],
        })
        expect(rules.rate).toMatchObject({
          type: 'number',
          required: true,
          message: '请选择评分',
          trigger: ['blur', 'change'],
        })
      })
    })

    describe('boolean type rules', () => {
      it('should generate correct rules for switch component', () => {
        const [, , { formRef }] = useForm([
          ['开关', 'switch', { as: 'switch' }],
        ], { autoRules: ['switch'] })

        const rules = formRef.value?.rules
        expect(rules.switch).toMatchObject({
          type: 'boolean',
          required: true,
          message: '请选择开关',
          trigger: 'change',
        })
      })
    })

    describe('other type rules', () => {
      it('should generate correct rules for color-picker component', () => {
        const [, , { formRef }] = useForm([
          ['颜色选择', 'colorPicker', { as: 'color-picker' }],
        ], { autoRules: ['colorPicker'] })

        const rules = formRef.value?.rules
        expect(rules.colorPicker).toMatchObject({
          required: true,
          message: '请选择颜色选择',
          trigger: 'change',
        })
      })

      it('should generate default rules for unknown component types', () => {
        const [, , { formRef }] = useForm([
          ['未知类型', 'unknown', { as: 'unknown-type' as any }],
        ], { autoRules: ['unknown'] })

        const rules = formRef.value?.rules
        expect(rules.unknown).toMatchObject({
          required: true,
          message: '请输入未知类型',
          trigger: ['blur', 'input'],
        })
      })
    })

    describe('auto rules configuration', () => {
      it('should only generate rules for fields specified in autoRules', () => {
        const [, , { formRef }] = useForm([
          ['文本1', 'text1', { as: 'input' }],
          ['文本2', 'text2', { as: 'input' }],
          ['数字', 'number', { as: 'input-number' }],
        ], { autoRules: ['text1', 'number'] })

        const rules = formRef.value?.rules
        expect(rules.text1).toBeDefined()
        expect(rules.text2).toBeUndefined()
        expect(rules.number).toBeDefined()
      })

      it('should not generate rules when autoRules is not provided', () => {
        const [, , { formRef }] = useForm([
          ['文本', 'text', { as: 'input' }],
          ['数字', 'number', { as: 'input-number' }],
        ])

        const rules = formRef.value?.rules
        expect(Object.keys(rules)).toHaveLength(0)
      })

      it('should not generate rules when autoRules is empty', () => {
        const [, , { formRef }] = useForm([
          ['文本', 'text', { as: 'input' }],
          ['数字', 'number', { as: 'input-number' }],
        ], { autoRules: [] })

        const rules = formRef.value?.rules
        expect(Object.keys(rules)).toHaveLength(0)
      })
    })

    describe('custom rules priority', () => {
      it('should prioritize manually defined rules over auto-generated rules', () => {
        const customRule = {
          required: false,
          message: '自定义规则',
          trigger: 'input',
        }

        const [, , { formRef }] = useForm([
          ['文本', 'text', { as: 'input', rules: customRule }],
        ], { autoRules: ['text'] })

        const rules = formRef.value?.rules
        expect(rules.text).toEqual(customRule)
        expect(rules.text.required).toBe(false)
        expect(rules.text.message).toBe('自定义规则')
      })
    })

    describe('validator functionality', () => {
      it('should validate null, undefined and empty string values correctly for select types', () => {
        const [, , { formRef }] = useForm([
          ['选择', 'select', { as: 'select' }],
        ], { autoRules: ['select'] })

        const rules = formRef.value?.rules
        const validator = rules.select.validator

        // Test null value
        expect(validator(null, null)).toBeInstanceOf(Error)
        // Test undefined value
        expect(validator(null, undefined)).toBeInstanceOf(Error)
        // Test empty string
        expect(validator(null, '')).toBeInstanceOf(Error)
        // Test valid value
        expect(validator(null, 'valid')).toBe(true)
      })
    })

    describe('nested field rules', () => {
      it('should handle nested field paths correctly', () => {
        const [, , { formRef }] = useForm([
          ['嵌套字段', 'user.name', { as: 'input' }],
          ['深层嵌套', 'user.profile.email', { as: 'input' }],
        ], { autoRules: ['user.name', 'user.profile.email'] })

        const rules = formRef.value?.rules
        expect(rules.user?.name).toBeDefined()
        expect(rules.user?.profile?.email).toBeDefined()
        expect(rules.user.name).toMatchObject({
          required: true,
          message: '请输入嵌套字段',
          trigger: ['blur', 'input'],
        })
        expect(rules.user.profile.email).toMatchObject({
          required: true,
          message: '请输入深层嵌套',
          trigger: ['blur', 'input'],
        })
      })
    })
  })
})
