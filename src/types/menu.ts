export interface MenuItem {
  label: string
  key: string
  icon?: string
  matchs: Array<{ label: string, path: string, name: string, meta: { title: string }, children?: MenuItem[] }>
  children?: MenuItem[]
}
