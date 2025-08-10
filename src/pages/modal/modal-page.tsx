import { range } from 'lodash-es'
import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import XModal from '@/components/ui/x-modal/x-modal'

const ModalDemo = defineComponent(() => {
  const visible = ref(true)
  function onClick() {
    visible.value = !visible.value
  }
  return () => (
    <div>
      <div><NButton onClick={onClick}>点击</NButton></div>
      <div>
        <XModal class="max-w-3xl" title="提示" v-model:visible={visible.value}>
          {range(1, 100).map(item => (
            <p>
              {range(1, 50).map(item => 'hello, ')}
              {item}
            </p>
          ))}
        </XModal>
      </div>
    </div>
  )
})

export default ModalDemo
