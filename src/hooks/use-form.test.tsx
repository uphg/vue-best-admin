import { describe, expect, it } from 'vitest'
import { useForm } from './use-form'

describe('useForm', () => {
  describe('form data initialization', () => {
    it('should initialize form data with correct default values for input components', () => {
      const [, form] = useForm([
        ['文本', 'text', { as: 'input' }],
        ['自动完成', 'autoComplete', { as: 'auto-complete' }],
      ])

      expect(form.value.text).toBe('')
      expect(form.value.autoComplete).toBe('')
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

      expect(form1.value.radio1).toBe('')
      expect(form2.value.radio2).toBe('')
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
})
