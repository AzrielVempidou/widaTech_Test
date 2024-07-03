import { Outlet } from "react-router-dom";
import Navbar from "../components/SideBarComponent";

export default function LayOut() {
  return (
    <>
      <Navbar /> 
      <Outlet />
    </>
  );
}
