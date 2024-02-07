export const menuData = [
  {
    title: '首页',
    name: 'home',
    path: 'home',
    component: 'home/Home',
  },
  {
    title: '表单页',
    children: [
      {
        title: '基础表单',
        name: 'basicForm',
        path: 'form/basic-form',
        component: 'form/basic-form/BasicForm'
      },
      {
        title: '分步表单',
        name: 'StepForm',
        path: 'form/step-form',
        component: 'form/step-form/StepForm'
      },
      {
        title: '高级表单',
        name: 'AdvancedForm',
        path: 'form/advanced-form',
        component: 'form/advanced-form/AdvancedForm'
      }
    ]
  },
  {
    title: '列表页',
    path: 'list',
    children: [
      {
        title: '搜索列表',
        name: 'basicForm',
        path: 'search',
        component: 'form/basic-form/BasicForm'
      },
      {
        title: '分步表单',
        name: 'StepForm',
        path: 'search/step-form',
        component: 'form/step-form/StepForm'
      },
      {
        title: '高级表单',
        name: 'AdvancedForm',
        path: 'search/advanced-form',
        component: 'form/advanced-form/AdvancedForm'
      }
    ]
  }
]

export function getMenuData() {
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: menuData
    })
  })
}