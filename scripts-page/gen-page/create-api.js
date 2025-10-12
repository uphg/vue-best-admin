export function createApi(eta) {
  const templateData = {
    name: 'jack',
    caseName: 'Jack',
  }
  const apiContent = eta.render('api.ts.eta', templateData)
  console.log('apiContent')
  console.log(apiContent)
}
