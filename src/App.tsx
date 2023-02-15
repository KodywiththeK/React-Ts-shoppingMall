import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PageFooter from "./Common/PageFooter"
import PageHeader from "./Common/PageHeader"
import PageHeaderMobile from "./Common/PageHeaderMobile"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Store from "./pages/Store"
import { Default, Mobile} from "./ReactResponsive/Responsive"
import { useAppDispatch } from "./Store"
import { fetchProduct } from "./Store/productSlice"

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  },[])

  return (
  <>
    <BrowserRouter>
      <Default>
        <PageHeader />
      </Default>
      <Mobile>
        <PageHeaderMobile />
      </Mobile>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <PageFooter />
    </BrowserRouter>
  </>
  )
}

export default App
