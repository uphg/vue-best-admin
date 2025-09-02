import { describe, it, expect } from 'vitest'
import { generatePlaceholder, mergeDefaultProps, isSelectType, isInputType, getDefaultValue } from './utils'

describe('XForm Utils', () => {
  describe('generatePlaceholder', () => {
    it('should generate input placeholder correctly', () => {
      expect(generatePlaceholder('姓名', 'input')).toBe('请输入姓名')
      expect(generatePlaceholder('年龄', 'input-number')).toBe('请输入年龄')
      expect(generatePlaceholder('备注', 'textarea')).toBe('请输入备注')
    })

    it('should generate select placeholder correctly', () => {
      expect(generatePlaceholder('性别', 'select')).toBe('请选择性别')
      expect(generatePlaceholder('日期', 'date-picker')).toBe('请选择日期')
      expect(generatePlaceholder('时间', 'time-picker')).toBe('请选择时间')
    })

    it('should return custom placeholder when provided', () => {
      expect(generatePlaceholder('姓名', 'input', '请输入您的姓名')).toBe('请输入您的姓名')
    })

    it('should return default placeholder when no label', () => {
      expect(generatePlaceholder(undefined, 'input')).toBe('请输入')
      expect(generatePlaceholder('', 'select')).toBe('请选择')
    })

    it('should use custom prefix', () => {
      const placeholderPrefix = { input: '输入', select: '选择' }
      expect(generatePlaceholder('姓名', 'input', undefined, placeholderPrefix)).toBe('输入姓名')
      expect(generatePlaceholder('性别', 'select', undefined, placeholderPrefix)).toBe('选择性别')
    })
  })

  describe('mergeDefaultProps', () => {
    it('should merge props correctly', () => {
      const defaultProps = {
        global: { clearable: true },
        input: { showPasswordOn: 'click' },
        select: { filterable: true }
      }

      const result = mergeDefaultProps(defaultProps, 'input', { placeholder: '请输入' })
      
      expect(result).toEqual({
        clearable: true,
        showPasswordOn: 'click',
        placeholder: '请输入'
      })
    })

    it('should prioritize current props over defaults', () => {
      const defaultProps = {
        global: { clearable: true },
        input: { clearable: false, size: 'small' }
      }

      const result = mergeDefaultProps(defaultProps, 'input', { clearable: true })
      
      expect(result.clearable).toBe(true)
      expect(result.size).toBe('small')
    })
  })

  describe('isSelectType', () => {
    it('should identify select types correctly', () => {
      expect(isSelectType('select')).toBe(true)
      expect(isSelectType('date-picker')).toBe(true)
      expect(isSelectType('time-picker')).toBe(true)
      expect(isSelectType('cascader')).toBe(true)
      expect(isSelectType('tree-select')).toBe(true)
      expect(isSelectType('color-picker')).toBe(true)
      
      expect(isSelectType('input')).toBe(false)
      expect(isSelectType('textarea')).toBe(false)
      expect(isSelectType('switch')).toBe(false)
    })
  })

  describe('isInputType', () => {
    it('should identify input types correctly', () => {
      expect(isInputType('input')).toBe(true)
      expect(isInputType('textarea')).toBe(true)
      expect(isInputType('input-number')).toBe(true)
      expect(isInputType('auto-complete')).toBe(true)
      expect(isInputType('dynamic-input')).toBe(true)
      
      expect(isInputType('select')).toBe(false)
      expect(isInputType('switch')).toBe(false)
      expect(isInputType('checkbox')).toBe(false)
    })
  })

  describe('getDefaultValue', () => {
    it('should return correct default values', () => {
      expect(getDefaultValue('checkbox')).toEqual([])
      expect(getDefaultValue('dynamic-tags')).toEqual([])
      expect(getDefaultValue('upload')).toEqual([])
      
      expect(getDefaultValue('select')).toBe(null)
      expect(getDefaultValue('select', true)).toEqual([])
      
      expect(getDefaultValue('switch')).toBe(false)
      
      expect(getDefaultValue('input-number')).toBe(0)
      expect(getDefaultValue('slider')).toBe(0)
      expect(getDefaultValue('rate')).toBe(0)
      
      expect(getDefaultValue('date-picker')).toBe(null)
      expect(getDefaultValue('input')).toBe(null)
    })
  })
})