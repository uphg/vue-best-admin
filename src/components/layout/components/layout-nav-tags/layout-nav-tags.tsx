import type { NavTagItem } from '@/stores/nav-tags'
import { defineComponent, shallowRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavTagsStore } from '@/stores/nav-tags'
import NavTag from './nav-tag'

const LayoutNavTags = defineComponent(() => {
  const tagsWrapRef = shallowRef<HTMLDivElement | null>(null)
  const navTagsStore = useNavTagsStore()
  const route = useRoute()
  const router = useRouter()

  watch(
    () => route.name,
    () => {
      navTagsStore.setActive(route.name as string)
      navTagsStore.append({
        name: route.name as string,
        title: route.meta?.title as string,
        path: route.path,
      })
    },
    { immediate: true },
  )

  function onItemClick(item: NavTagItem, _index: number) {
    navTagsStore.setActive(item.name)
    router.push(item.path)
  }

  function onItemClose(item: NavTagItem, index: number) {
    if (navTagsStore.tags.length === 1) return
    if (item.name === route.name) {
      if (index === navTagsStore.tags.length - 1) {
        router.push(navTagsStore.tags[index - 1].path)
      } else {
        router.push(navTagsStore.tags[index + 1].path)
      }
    }
    navTagsStore.remove(item.name)
  }

  function onTagsWheel(e: WheelEvent) {
    e.preventDefault()
    const deltaY = e.deltaY
    tagsWrapRef.value!.scrollTo({
      left: tagsWrapRef.value!.scrollLeft + deltaY * 1.5,
      behavior: 'smooth',
    })
  }

  return () => (
    <div class="tags h-[var(--tags-height)] w-full">
      <div
        ref={tagsWrapRef}
        class="tags-wrapper flex h-[var(--tags-height)] w-full items-center overflow-auto"
        onWheel={onTagsWheel}
      >
        <div class="px-6 py-1 flex gap-2">
          {navTagsStore.tags.map((item, index) => (
            <NavTag
              key={item.name}
              active={navTagsStore.active === item.name}
              closable={navTagsStore.tags.length > 1}
              onClick={() => onItemClick(item, index)}
              onClose={() => onItemClose(item, index)}
            >
              {item.title}
            </NavTag>
          ))}
        </div>
      </div>
    </div>
  )
})

export default LayoutNavTags
