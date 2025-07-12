const RequestPage = defineComponent(() => {
  onMounted(async () => {
    const response = await fetch('https://api.example.com/user')

    response.json().then((data) => {
      console.log('Fetched user data:', data)
    })

    getData()
  })

  async function getData() {
    try {
      const response = await fetch('products.json')
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const json = await response.json()
      console.log(json)
    } catch (error) {
      console.error(error.message)
    }
  }
  return () => (
    <div>
      <h2>请求测试</h2>
    </div>
  )
})

export default RequestPage
