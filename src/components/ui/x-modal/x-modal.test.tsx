import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import XModal from './x-modal'

// Mock the components to avoid teleport issues
vi.mock('naive-ui', async () => {
  const actual = await vi.importActual('naive-ui')
  return {
    ...actual,
    NModal: {
      name: 'NModal',
      props: ['show', 'maskClosable'],
      template: '<div v-if="show" class="mock-n-modal"><slot /></div>',
    },
    NButton: {
      name: 'NButton',
      props: ['type', 'loading'],
      template: '<button :class="type" :disabled="loading"><slot /></button>',
    },
    NScrollbar: {
      name: 'NScrollbar',
      template: '<div><slot /></div>',
    },
  }
})

describe('xModal', () => {
  it('should render correctly when visible is true', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        title: 'Test Modal',
      },
    })

    expect(wrapper.text()).toContain('Test Modal')
    expect(wrapper.props('visible')).toBe(true)
  })

  it('should not render when visible is false', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: false,
      },
    })

    expect(wrapper.find('.mock-n-modal').exists()).toBe(false)
  })

  it('should render close button when showClose is true', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showClose: true,
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should not render close button when showClose is false', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showClose: false,
        showFooter: false, // Ensure no footer buttons either
        title: 'Test Modal',
      },
    })

    // Should only have title and content, no buttons
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('should render footer when showFooter is true', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showFooter: true,
      },
    })

    expect(wrapper.find('.flex.items-center.justify-end.gap-3.p-4').exists()).toBe(true)
    expect(wrapper.findAllComponents({ name: 'NButton' })).toHaveLength(2)
  })

  it('should not render footer when showFooter is false', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showFooter: false,
      },
    })

    expect(wrapper.find('.flex.items-center.justify-end.gap-3.p-4').exists()).toBe(false)
  })

  it('should emit confirm event when confirm button is clicked', async () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showFooter: true,
      },
    })

    await wrapper.findAllComponents({ name: 'NButton' })[1].trigger('click')

    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('should emit cancel event when cancel button is clicked', async () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showFooter: true,
      },
    })

    await wrapper.findAllComponents({ name: 'NButton' })[0].trigger('click')

    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })

  it('should emit close event when close button is clicked', async () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showClose: true,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('should emit update:visible event with false when close is triggered', async () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showClose: true,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('update:visible')).toHaveLength(1)
    expect(wrapper.emitted('update:visible')![0]).toEqual([false])
  })

  it('should use custom confirm and cancel text', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showFooter: true,
        confirmText: 'Save',
        cancelText: 'Abort',
      },
    })

    const buttons = wrapper.findAllComponents({ name: 'NButton' })
    expect(buttons[0].text()).toBe('Abort')
    expect(buttons[1].text()).toBe('Save')
  })

  it('should apply size classes correctly', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        size: 'large',
      },
    })

    expect(wrapper.classes()).toContain('max-w-lg')
  })

  it('should apply custom classes', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        headerClass: 'custom-header',
        contentClass: 'custom-content',
        footerClass: 'custom-footer',
      },
    })

    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').exists()).toBe(true)
  })

  it('should render slots correctly', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
      },
      slots: {
        default: '<div class="test-content">Custom Content</div>',
        header: '<div class="test-header">Custom Header</div>',
        footer: '<div class="test-footer">Custom Footer</div>',
      },
    })

    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('Custom Content')
    expect(wrapper.find('.test-header').exists()).toBe(true)
    expect(wrapper.find('.test-header').text()).toBe('Custom Header')
    expect(wrapper.find('.test-footer').exists()).toBe(true)
    expect(wrapper.find('.test-footer').text()).toBe('Custom Footer')
  })

  it('should handle async confirm handler', async () => {
    const mockConfirm = vi.fn().mockResolvedValue(true)
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showFooter: true,
        onConfirm: mockConfirm,
      },
    })

    await wrapper.findAllComponents({ name: 'NButton' })[1].trigger('click')

    expect(mockConfirm).toHaveBeenCalled()
    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('should prevent closing when confirm handler returns false', async () => {
    const mockConfirm = vi.fn().mockReturnValue(false)
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showFooter: true,
        onConfirm: mockConfirm,
      },
    })

    await wrapper.findAllComponents({ name: 'NButton' })[1].trigger('click')

    expect(mockConfirm).toHaveBeenCalled()
    expect(wrapper.emitted('update:visible')).toBeUndefined()
  })

  it('should handle confirm loading state', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        showFooter: true,
        confirmLoading: true,
      },
    })

    const confirmButton = wrapper.findAllComponents({ name: 'NButton' })[1]
    expect(confirmButton.props('loading')).toBe(true)
  })

  it('should handle maskClosable prop', () => {
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        maskClosable: false,
      },
    })

    expect(wrapper.findComponent({ name: 'NModal' }).props('maskClosable')).toBe(false)
  })

  it('should call onMaskClick when mask is clicked', async () => {
    const mockMaskClick = vi.fn()
    const wrapper = mount(XModal, {
      props: {
        visible: true,
        onMaskClick: mockMaskClick,
      },
    })

    await wrapper.findComponent({ name: 'NModal' }).vm.$emit('maskClick')

    expect(mockMaskClick).toHaveBeenCalled()
  })
})
