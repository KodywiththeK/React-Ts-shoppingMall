import { productType } from "../Service/getData"



// 장바구니
export const saveCart = (cartState: productType[]) => {
  localStorage.setItem('mallState', JSON.stringify(cartState))
}

export const loadState = () => {
  const cartJson = localStorage.getItem('mallState')
  if(!cartJson) {
    return []
  }
  try {
    return JSON.parse(cartJson)
  } catch (e) {
    console.error(e)
    return []
  }
}


// 테마 모드
export const saveTheme = (theme: boolean) => {
  localStorage.setItem('theme', JSON.stringify(theme))
}

export const loadTheme = () => {
  const themeJson = localStorage.getItem('theme')
  if(!themeJson) {
    return []
  }
  try {
    return JSON.parse(themeJson)
  } catch (e) {
    console.error(e)
    return []
  }
}

// 필터
export const saveFilterState = (filterState: boolean) => {
  localStorage.setItem('filterState', JSON.stringify(filterState))
}

export const loadFilterState = () => {
  const filterStateJson = localStorage.getItem('filterState')
  if(!filterStateJson) {
    return []
  }
  try {
    return JSON.parse(filterStateJson)
  } catch (e) {
    console.error(e)
    return []
  }
}

