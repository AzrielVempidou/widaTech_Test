import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/action/actionCreator";
import LoginComponent from "../components/LoginComponent";

export default function RegisterComponent( onRegistrationSuccess ) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState(""); // State untuk menyimpan pesan kesalahan
  const [isRegistered, setIsRegistered] = useState(false); // State untuk menandai apakah registrasi berhasil

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegistrationSuccess = async () => {
    try {
      const result = await dispatch(registerUser(formData));
      if (result.success) {
        setIsRegistered(true); // Set isRegistered menjadi true jika registrasi berhasil
        onRegistrationSuccess(); // Panggil prop onRegistrationSuccess jika registrasi berhasil
      } else {
        setErrorMessage(result.message); // Set pesan kesalahan jika registrasi gagal
      }
    } catch (error) {
      console.error("Failed to register:", error);
      setErrorMessage("Failed to register. Please try again later."); // Handle error registration di sini jika perlu
    }
  };

  // Jika registrasi berhasil, arahkan ke halaman login
  if (isRegistered) {
    return <LoginComponent />;
  }

  return (
    <>
      <div className="space-y-4">
        <header className="mb-3 text-2xl font-bold">Create your profile</header>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-3">{errorMessage}</div>
        )}
        <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
          />
        </div>
        <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
          />
        </div>
        <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
          />
        </div>
        <button
          onClick={handleRegistrationSuccess}
          className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
        >
          CREATE ACCOUNT
        </button>
      </div>
    </>
  );
}
