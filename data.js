const url="https://fakestoreapi.com/products"
async function App(){
    const response =await fetch(`${url}/1`)
    const data=await response.json()
    console.log(data)

}
App();