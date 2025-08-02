export interface MenuItem {
  label: string
  key: string
  type?: 'item' | 'group' | 'divider' | 'submenu'
  icon?: string
  path?: string
  show?: boolean
  matchs?: MenuMatch[]
  children?: MenuItem[]
}

export interface MenuMatch {
  name: string
  path: string
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
    [key: string]: any
  }
  children?: MenuItem[]
}
