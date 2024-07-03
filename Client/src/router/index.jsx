import { createBrowserRouter, Navigate } from "react-router-dom";
import LayOut from "../views/layOut";
import DashboardPages from "../views/dashboarPages"; // Pastikan nama file dan penulisan yang benar
import OauthPage from "../views/oauthPage";

// Fungsi untuk mengecek apakah pengguna sudah login
const isLoggedIn = () => {
  // Implementasi autentikasi menggunakan access_token di header
  const accessToken = localStorage.getItem('access_token'); // Ganti dengan cara yang sesuai untuk menyimpan token
  console.log(accessToken, '<<<accessToken')
  return !!accessToken; // Mengembalikan true jika ada access token
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <OauthPage />
  },
  {
    path: "/app",
    element: isLoggedIn() ? <LayOut /> : <Navigate to="/" />, // Redirect jika tidak login
    children : [
      {
        path: "",
        element: <DashboardPages />
      }
    ]
  }
]);

export default router;
