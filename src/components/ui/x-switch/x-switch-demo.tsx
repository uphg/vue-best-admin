import { defineComponent, ref } from 'vue'
import { XSwitch } from '@/components/ui/x-switch'

const XSwitchDemo = defineComponent({
  name: 'XSwitchDemo',
  setup() {
    const value1 = ref(false)
    const value2 = ref(true)
    const value3 = ref(false)
    const value4 = ref(false)
    const value5 = ref(false)

    return () => (
      <div class="p-6 space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">XSwitch Component</h2>
          <p class="text-gray-600 mb-6">A customizable switch component with various sizes and states.</p>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">Basic Usage</h3>
            <div class="flex items-center space-x-4">
              <XSwitch v-model:value={value1.value} />
              <span>Value: {value1.value ? 'ON' : 'OFF'}</span>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">Sizes</h3>
            <div class="flex items-center space-x-6">
              <div class="flex items-center space-x-2">
                <XSwitch size="sm" v-model:value={value2.value} />
                <span>Small</span>
              </div>
              <div class="flex items-center space-x-2">
                <XSwitch size="md" v-model:value={value3.value} />
                <span>Medium</span>
              </div>
              <div class="flex items-center space-x-2">
                <XSwitch size="lg" v-model:value={value4.value} />
                <span>Large</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">States</h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <XSwitch disabled v-model:value={value5.value} />
                <span>Disabled</span>
              </div>
              <div class="flex items-center space-x-4">
                <XSwitch loading v-model:value={value1.value} />
                <span>Loading</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">Custom Colors</h3>
            <div class="flex items-center space-x-6">
              <div class="flex items-center space-x-2">
                <XSwitch color="bg-green-500" uncheckedColor="bg-gray-300" v-model:value={value1.value} />
                <span>Green</span>
              </div>
              <div class="flex items-center space-x-2">
                <XSwitch color="bg-red-500" uncheckedColor="bg-gray-300" v-model:value={value2.value} />
                <span>Red</span>
              </div>
              <div class="flex items-center space-x-2">
                <XSwitch color="bg-purple-500" uncheckedColor="bg-gray-300" v-model:value={value3.value} />
                <span>Purple</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

export default XSwitchDemo
