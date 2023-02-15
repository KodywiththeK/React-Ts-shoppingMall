import axios from 'axios'


const remote = axios.create()

export interface productType {
  category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    rating: {
      rate: number,
      count: number
    },
    title: string
}
export interface productResponseType {
  [key: string] : productType[]
}


export function makeResult(response:productType[]):productResponseType {
    const result = response.reduce((acc:/*productType*/ { [x: string]: any; hasOwnProperty: (arg0: any) => any }, cur: { category: string | number }) => {
    if(acc.hasOwnProperty(cur.category)) {
      return {
        ...acc,
        [cur.category] : [...acc[cur.category], cur]
      }
    } else {
      return {
        ...acc,
        [cur.category] : [cur]
      }
    }
  }, {}) 
  return result
}

export const fetchAPI = async():Promise<productType[]>  => {
  const url = 'https://fakestoreapi.com/products'
  
  const response = await remote.get(url)
  // console.log(response.data)
  return response.data

}
