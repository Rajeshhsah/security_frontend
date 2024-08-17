import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// for showing toast messages
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminRoutes from './protected_routes/AdminRoutes';
import UserRoutes from './protected_routes/UserRoutes';
import Test from './pages/Test';
import ChangePassword from './pages/Changepassword';
import Profile from './pages/admin/Profile';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail'; // Import ProductDetail
import Cart from './pages/CartPage';
import ForgotPassword from './pages/ForgotPassword';
import EditProfile from './pages/EditProfile';
import SearchResults from './pages/SearchResults';
import BuyNow from './pages/BuyNow';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <div className="content">
        <Routes>
          <Route path='/home' element={<Homepage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/products' element={<Products />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/test' element={<Test />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/search' element={<SearchResults />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/buy/:id' element={<BuyNow />} />
          <Route path='/cart' element={<Cart />} />

          <Route element={<UserRoutes />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/edit/:id' element={<AdminEditProduct />} />
          </Route>
        </Routes>
      </div>
      {user && <Footer />}
    </Router>
  );
}

export default App;
