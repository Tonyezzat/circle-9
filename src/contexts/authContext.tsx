import { createContext, useEffect, useState, type ReactElement } from "react";
import { authServices } from "../services/authServices";

export const authContext = createContext<any>({});

export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;
}) {
const [isLoggedIn, setisLoggedIn] = useState(false);
const [UserData, setUserData] = useState()
const [isLoading, setisLoading] = useState(true)
async function GetUserData() {
try {
  const {data}=await authServices.getUserData()
  
  
  setUserData(data.user)
  setisLoggedIn(true)
  setisLoading(false)  
} catch (error) {
  
  setisLoggedIn(false)
  localStorage.removeItem("token")
  setisLoading(false)
}
}
useEffect(()=>{
if(localStorage.getItem("token")){
    GetUserData()
}else{
  setisLoading(false)
}
},[])


  return (
    <div>
      <authContext.Provider value={{ isLoggedIn, setisLoggedIn,isLoading,UserData}}>
        {children}
      </authContext.Provider>
    </div>
  );
}
