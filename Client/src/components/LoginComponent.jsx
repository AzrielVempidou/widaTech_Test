import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/action/actionCreator";

export default function LoginComponent() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async ({ onLogin }) => {
    try {
      const result = await dispatch(loginUser(formData));
      console.log(result, "<<Result");
      // Simpan token yang diterima dari backend ke localStorage
      localStorage.em("access_token", result.access_token);
      if (onLogin) onLogin(result.access_token);
      window.location.href = "/app"; // Redirect setelah login berhasil
      console.log("Login berhasil:", result);
    } catch (error) {
      console.error("Login gagal:", error);
      setErrorMessage("Failed to login. Please check your email/password.");
    }
  };

  return (
    <>
      <div className="space-y-4">
        <header className="mb-3 text-2xl font-bold">Log in</header>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-3">{errorMessage}</div>
        )}
        <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
          />
        </div>
        <div className="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="my-3 w-full border-none bg-transparent outline-none"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
        >
          LOG IN
        </button>
      </div>
    </>
  );
}
