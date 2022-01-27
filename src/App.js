import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductCreate from './pages/ProductCreatePage';
import ProductEditPage from './pages/ProductEditPage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProveedoresPage from './pages/ProveedoresPage';
import ProveedoresCreatePage from './pages/ProveedoresCreatePage';
import PromocionesPage from './pages/PromocionesPage';
import PromocionCreatePage from './pages/PromocionCreatePage';
import EmpleadosPage from './pages/EmpleadosPage';
import Cart from './components/Cart/Cart';
import MisOrdenesPage from './pages/MisOrdenesPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Cart />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/createproduct" element={<ProductCreate />} />
          <Route path="/editproduct/:productId" element={<ProductEditPage />} />
          <Route path="/categorias" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/proveedores" element={<ProveedoresPage />} />
          <Route
            path="/createproveedores"
            element={<ProveedoresCreatePage />}
          />
          <Route path="/promociones" element={<PromocionesPage />} />
          <Route path="/createpromocion" element={<PromocionCreatePage />} />
          <Route path="/empleados" element={<EmpleadosPage />} />
          <Route path="/miscompras" element={<MisOrdenesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
