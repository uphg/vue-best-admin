import { render } from '@testing-library/vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { useForm } from './use-form'

// Mock all NaiveUI components to track their usage
const mockComponents = {
  NAutoComplete: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-auto-complete', ...props }, slots?.default?.())),
  NCascader: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-cascader', ...props }, slots?.default?.())),
  NCheckbox: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-checkbox', ...props }, slots?.default?.())),
  NCheckboxGroup: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-checkbox-group', ...props }, slots?.default?.())),
  NColorPicker: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-color-picker', ...props }, slots?.default?.())),
  NDatePicker: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-date-picker', ...props }, slots?.default?.())),
  NDynamicInput: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-dynamic-input', ...props }, slots?.default?.())),
  NDynamicTags: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-dynamic-tags', ...props }, slots?.default?.())),
  NForm: vi.fn((props, { slots }) => h('form', { 'data-testid': 'n-form', ...props }, slots?.default?.())),
  NFormItem: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-form-item', ...props }, slots?.default?.())),
  NInput: vi.fn((props, { slots }) => h('input', { 'data-testid': 'n-input', ...props }, slots?.default?.())),
  NInputNumber: vi.fn((props, { slots }) => h('input', { 'data-testid': 'n-input-number', 'type': 'number', ...props }, slots?.default?.())),
  NRadio: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-radio', ...props }, slots?.default?.())),
  NRadioButton: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-radio-button', ...props }, slots?.default?.())),
  NRadioGroup: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-radio-group', ...props }, slots?.default?.())),
  NRate: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-rate', ...props }, slots?.default?.())),
  NSelect: vi.fn((props, { slots }) => h('select', { 'data-testid': 'n-select', ...props }, slots?.default?.())),
  NSlider: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-slider', ...props }, slots?.default?.())),
  NSwitch: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-switch', ...props }, slots?.default?.())),
  NTimePicker: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-time-picker', ...props }, slots?.default?.())),
  NTransfer: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-transfer', ...props }, slots?.default?.())),
  NTreeSelect: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-tree-select', ...props }, slots?.default?.())),
  NUpload: vi.fn((props, { slots }) => h('div', { 'data-testid': 'n-upload', ...props }, slots?.default?.())),
}

vi.mock('naive-ui', () => mockComponents)

vi.mock('naive-ui/es/_utils', () => ({
  omit: (obj: any, keys: string[]) => {
    const result = { ...obj }
    keys.forEach(key => delete result[key])
    return result
  },
}))

describe('useForm component rendering', () => {
  beforeEach(() => {
    // Clear all mock calls before each test
    Object.values(mockComponents).forEach(mock => mock.mockClear())
  })

  describe('input components', () => {
    it('should render NInput for input type', () => {
      const [Form] = useForm([
        ['用户名', 'username', { as: 'input' }],
      ])

      render(h(Form))

      expect(mockComponents.NInput).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NAutoComplete for auto-complete type', () => {
      const [Form] = useForm([
        ['搜索', 'search', { as: 'auto-complete' }],
      ])

      render(h(Form))

      expect(mockComponents.NAutoComplete).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NInputNumber for input-number type', () => {
      const [Form] = useForm([
        ['年龄', 'age', { as: 'input-number' }],
      ])

      render(h(Form))

      expect(mockComponents.NInputNumber).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })
  })

  describe('selection components', () => {
    it('should render NSelect for select type', () => {
      const [Form] = useForm([
        ['城市', 'city', { as: 'select', options: [{ label: '北京', value: 'beijing' }] }],
      ])

      render(h(Form))

      expect(mockComponents.NSelect).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NCascader for cascader type', () => {
      const [Form] = useForm([
        ['地区', 'region', { as: 'cascader' }],
      ])

      render(h(Form))

      expect(mockComponents.NCascader).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NTreeSelect for tree-select type', () => {
      const [Form] = useForm([
        ['部门', 'department', { as: 'tree-select' }],
      ])

      render(h(Form))

      expect(mockComponents.NTreeSelect).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })
  })

  describe('date/time components', () => {
    it('should render NDatePicker for date-picker type', () => {
      const [Form] = useForm([
        ['生日', 'birthday', { as: 'date-picker' }],
      ])

      render(h(Form))

      expect(mockComponents.NDatePicker).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NDatePicker for date type (alias)', () => {
      const [Form] = useForm([
        ['日期', 'date', { as: 'date' }],
      ])

      render(h(Form))

      expect(mockComponents.NDatePicker).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NTimePicker for time-picker type', () => {
      const [Form] = useForm([
        ['时间', 'time', { as: 'time-picker' }],
      ])

      render(h(Form))

      expect(mockComponents.NTimePicker).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NTimePicker for time type (alias)', () => {
      const [Form] = useForm([
        ['时间', 'time', { as: 'time' }],
      ])

      render(h(Form))

      expect(mockComponents.NTimePicker).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })
  })

  describe('boolean components', () => {
    it('should render NSwitch for switch type', () => {
      const [Form] = useForm([
        ['启用', 'enabled', { as: 'switch' }],
      ])

      render(h(Form))

      expect(mockComponents.NSwitch).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })
  })

  describe('range components', () => {
    it('should render NSlider for slider type', () => {
      const [Form] = useForm([
        ['音量', 'volume', { as: 'slider' }],
      ])

      render(h(Form))

      expect(mockComponents.NSlider).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NRate for rate type', () => {
      const [Form] = useForm([
        ['评分', 'rating', { as: 'rate' }],
      ])

      render(h(Form))

      expect(mockComponents.NRate).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })
  })

  describe('multiple selection components', () => {
    it('should render NCheckboxGroup and NCheckbox for checkbox-group type', () => {
      const [Form] = useForm([
        ['爱好', 'hobbies', {
          as: 'checkbox-group',
          options: [
            { label: '读书', value: 'reading' },
            { label: '运动', value: 'sports' },
          ],
        }],
      ])

      render(h(Form))

      expect(mockComponents.NCheckboxGroup).toHaveBeenCalled()
      expect(mockComponents.NCheckbox).toHaveBeenCalledTimes(2) // Two options
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NCheckboxGroup and NCheckbox for checkbox type (alias)', () => {
      const [Form] = useForm([
        ['爱好', 'hobbies', {
          as: 'checkbox',
          options: [
            { label: '读书', value: 'reading' },
          ],
        }],
      ])

      render(h(Form))

      expect(mockComponents.NCheckboxGroup).toHaveBeenCalled()
      expect(mockComponents.NCheckbox).toHaveBeenCalledTimes(1)
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NCheckboxGroup and NCheckbox for checkbox-button-group type', () => {
      const [Form] = useForm([
        ['选项', 'options', {
          as: 'checkbox-button-group',
          options: [
            { label: '选项1', value: 'option1' },
            { label: '选项2', value: 'option2' },
          ],
        }],
      ])

      render(h(Form))

      expect(mockComponents.NCheckboxGroup).toHaveBeenCalled()
      expect(mockComponents.NCheckbox).toHaveBeenCalledTimes(2)
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NRadioGroup and NRadio for radio-group type', () => {
      const [Form] = useForm([
        ['性别', 'gender', {
          as: 'radio-group',
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ],
        }],
      ])

      render(h(Form))

      expect(mockComponents.NRadioGroup).toHaveBeenCalled()
      expect(mockComponents.NRadio).toHaveBeenCalledTimes(2)
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NRadioGroup and NRadioButton for radio-button-group type', () => {
      const [Form] = useForm([
        ['类型', 'type', {
          as: 'radio-button-group',
          options: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ],
        }],
      ])

      render(h(Form))

      expect(mockComponents.NRadioGroup).toHaveBeenCalled()
      expect(mockComponents.NRadioButton).toHaveBeenCalledTimes(2)
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })
  })

  describe('special components', () => {
    it('should render NColorPicker for color-picker type', () => {
      const [Form] = useForm([
        ['颜色', 'color', { as: 'color-picker' }],
      ])

      render(h(Form))

      expect(mockComponents.NColorPicker).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NTransfer for transfer type', () => {
      const [Form] = useForm([
        ['权限', 'permissions', { as: 'transfer' }],
      ])

      render(h(Form))

      expect(mockComponents.NTransfer).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NUpload for upload type', () => {
      const [Form] = useForm([
        ['文件', 'file', { as: 'upload' }],
      ])

      render(h(Form))

      expect(mockComponents.NUpload).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NDynamicInput for dynamic-input type', () => {
      const [Form] = useForm([
        ['标签', 'tags', { as: 'dynamic-input' }],
      ])

      render(h(Form))

      expect(mockComponents.NDynamicInput).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NDynamicTags for dynamic-tags type', () => {
      const [Form] = useForm([
        ['动态标签', 'dynamicTags', { as: 'dynamic-tags' }],
      ])

      render(h(Form))

      expect(mockComponents.NDynamicTags).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })
  })

  describe('default behavior', () => {
    it('should render NInput for unknown component type (fallback)', () => {
      const [Form] = useForm([
        ['未知', 'unknown', { as: 'unknown-type' as any }],
      ])

      render(h(Form))

      expect(mockComponents.NInput).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })

    it('should render NInput when no as property is provided', () => {
      const [Form] = useForm([
        ['默认', 'default', {}],
      ])

      render(h(Form))

      expect(mockComponents.NInput).toHaveBeenCalled()
      expect(mockComponents.NForm).toHaveBeenCalled()
      expect(mockComponents.NFormItem).toHaveBeenCalled()
    })
  })

  describe('props passing', () => {
    it('should pass props correctly to components', () => {
      const [Form] = useForm([
        ['测试', 'test', {
          as: 'input',
          placeholder: '自定义占位符',
          disabled: true,
          size: 'large',
        }],
      ])

      render(h(Form))

      expect(mockComponents.NInput).toHaveBeenCalledWith(
        expect.objectContaining({
          placeholder: '自定义占位符',
          disabled: true,
          size: 'large',
          value: '',
        }),
        expect.any(Object),
      )
    })

    it('should pass options to select components', () => {
      const options = [
        { label: '选项1', value: 'opt1' },
        { label: '选项2', value: 'opt2' },
      ]

      const [Form] = useForm([
        ['选择', 'select', {
          as: 'select',
          options,
          multiple: true,
        }],
      ])

      render(h(Form))

      expect(mockComponents.NSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          options,
          multiple: true,
          value: [],
        }),
        expect.any(Object),
      )
    })

    it('should omit options from props for checkbox/radio groups', () => {
      const options = [
        { label: '选项1', value: 'opt1' },
        { label: '选项2', value: 'opt2' },
      ]

      const [Form] = useForm([
        ['复选框', 'checkbox', {
          as: 'checkbox-group',
          options,
          size: 'large',
        }],
      ])

      render(h(Form))

      // NCheckboxGroup should not receive options prop
      expect(mockComponents.NCheckboxGroup).toHaveBeenCalledWith(
        expect.objectContaining({
          size: 'large',
          value: [],
        }),
        expect.any(Object),
      )

      // But should not contain options
      expect(mockComponents.NCheckboxGroup).toHaveBeenCalledWith(
        expect.not.objectContaining({
          options,
        }),
        expect.any(Object),
      )
    })
  })

  describe('form structure', () => {
    it('should render multiple form items correctly', () => {
      const [Form] = useForm([
        ['用户名', 'username', { as: 'input' }],
        ['年龄', 'age', { as: 'input-number' }],
        ['启用', 'enabled', { as: 'switch' }],
      ])

      render(h(Form))

      expect(mockComponents.NForm).toHaveBeenCalledTimes(1)
      expect(mockComponents.NFormItem).toHaveBeenCalledTimes(3)
      expect(mockComponents.NInput).toHaveBeenCalledTimes(1)
      expect(mockComponents.NInputNumber).toHaveBeenCalledTimes(1)
      expect(mockComponents.NSwitch).toHaveBeenCalledTimes(1)
    })

    it('should pass correct props to NForm', () => {
      const [Form] = useForm([
        ['测试', 'test', { as: 'input' }],
      ])

      render(h(Form))

      expect(mockComponents.NForm).toHaveBeenCalledWith(
        expect.objectContaining({
          model: expect.any(Object),
          rules: expect.any(Object),
          labelPlacement: 'left',
          labelWidth: 'auto',
          requireMarkPlacement: 'right-hanging',
          size: 'medium',
        }),
        expect.any(Object),
      )
    })

    it('should pass correct props to NFormItem', () => {
      const [Form] = useForm([
        ['用户名', 'username', { as: 'input' }],
      ])

      render(h(Form))

      expect(mockComponents.NFormItem).toHaveBeenCalledWith(
        expect.objectContaining({
          path: 'username',
          label: '用户名',
        }),
        expect.any(Object),
      )
    })
  })
})
