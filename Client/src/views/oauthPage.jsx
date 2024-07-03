import { useState } from "react";
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/registerComponent';

export default function OAuthPages() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  // Fungsi untuk menangani login sukses
  const handleLoginSuccess = (access_token) => {
    localStorage.setItem('access_token', access_token); // Simpan access token di local storage
    window.location.href = "/app";
  };

  // Fungsi untuk menangani registrasi sukses
  const handleRegistrationSuccess = () => {
    setIsLoginPage(true); // Pindahkan ke halaman login setelah registrasi berhasil
  };

  return (
    <main className="relative min-h-screen w-full bg-white">
      <div className="p-6">
        {/* Header */}
        <header className="flex w-full justify-between">
          {/* Tombol Login dan Sign Up */}
          <button
            type="button"
            onClick={() => setIsLoginPage(true)}
            className={`rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-3 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200 ${
              isLoginPage ? "hidden" : ""
            }`}
          >
            LOGIN
          </button>

          <button
            type="button"
            onClick={() => setIsLoginPage(false)}
            className={`rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-3 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200 ${
              isLoginPage ? "" : "hidden"
            }`}
          >
            SIGN UP
          </button>
        </header>

        {/* Konten Login atau Register */}
        <div className="absolute left-1/2 top-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
          {!isLoginPage && <RegisterComponent onRegistrationSuccess={handleRegistrationSuccess} />}
          {isLoginPage && <LoginComponent onLogin={handleLoginSuccess} />}

          {/* Footer */}
          <footer>
            {/* Syarat dan Ketentuan */}
            <div className="mt-8 text-sm text-gray-400">
              By signing in to ********, you agree to our
              <a href="#" className="font-medium text-gray-500">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-gray-500">
                Privacy Policy
              </a>
              .
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
