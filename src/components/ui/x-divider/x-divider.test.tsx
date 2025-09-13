import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import XDivider from './x-divider'

describe('XDivider', () => {
  it('renders horizontal divider by default', () => {
    const wrapper = mount(XDivider)
    expect(wrapper.find('.border-t-2').exists()).toBe(true)
  })

  it('renders vertical divider when direction is vertical', () => {
    const wrapper = mount(XDivider, {
      props: { direction: 'vertical' }
    })
    expect(wrapper.find('.border-l-2').exists()).toBe(true)
  })

  it('renders dashed divider when dashed is true', () => {
    const wrapper = mount(XDivider, {
      props: { dashed: true }
    })
    expect(wrapper.find('.border-dashed').exists()).toBe(true)
  })

  it('renders text content', () => {
    const wrapper = mount(XDivider, {
      props: { text: 'Test Text' }
    })
    expect(wrapper.text()).toContain('Test Text')
  })

  it('renders slot content', () => {
    const wrapper = mount(XDivider, {
      slots: {
        default: 'Slot Content'
      }
    })
    expect(wrapper.text()).toContain('Slot Content')
  })
})