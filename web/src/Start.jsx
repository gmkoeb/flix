import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Start(){
  return(
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}