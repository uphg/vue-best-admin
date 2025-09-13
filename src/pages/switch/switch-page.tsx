import { XSwitch } from '@/components/ui/x-switch'
import { defineComponent, ref } from 'vue'

const SwitchPage = defineComponent({
  name: 'SwitchPage',
  setup() {
    const value1 = ref(false)
    const value2 = ref(true)
    const value3 = ref(false)
    const value4 = ref(false)
    const value5 = ref(false)

    return () => (
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Switch Component Test</h1>
        
        <div class="space-y-6">
          <div class="border rounded-lg p-4">
            <h2 class="text-lg font-semibold mb-3">Basic Switch</h2>
            <div class="flex items-center space-x-4">
              <XSwitch v-model:value={value1.value} />
              <span>Current value: {value1.value ? 'ON' : 'OFF'}</span>
            </div>
          </div>

          <div class="border rounded-lg p-4">
            <h2 class="text-lg font-semibold mb-3">Different Sizes</h2>
            <div class="space-y-3">
              <div class="flex items-center space-x-4">
                <XSwitch size="sm" v-model:value={value2.value} />
                <span>Small</span>
              </div>
              <div class="flex items-center space-x-4">
                <XSwitch size="md" v-model:value={value3.value} />
                <span>Medium</span>
              </div>
              <div class="flex items-center space-x-4">
                <XSwitch size="lg" v-model:value={value4.value} />
                <span>Large</span>
              </div>
            </div>
          </div>

          <div class="border rounded-lg p-4">
            <h2 class="text-lg font-semibold mb-3">Different States</h2>
            <div class="space-y-3">
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

          <div class="border rounded-lg p-4">
            <h2 class="text-lg font-semibold mb-3">Custom Colors</h2>
            <div class="space-y-3">
              <div class="flex items-center space-x-4">
                <XSwitch color="bg-green-500" uncheckedColor="bg-gray-300" v-model:value={value1.value} />
                <span>Green</span>
              </div>
              <div class="flex items-center space-x-4">
                <XSwitch color="bg-red-500" uncheckedColor="bg-gray-300" v-model:value={value2.value} />
                <span>Red</span>
              </div>
              <div class="flex items-center space-x-4">
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

export default SwitchPage