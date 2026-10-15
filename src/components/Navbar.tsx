import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar as HeroUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import { MessageCircleHeart } from "lucide-react";
export default function Navbar() {
  // const navigate = useNavigate();
  // const isUserLoggedIn: boolean = !!localStorage.getItem("token");
    const{isLoggedIn,setisLoggedIn,UserData}=useContext(authContext)

  function LogOut() {
    setisLoggedIn(false);  
    localStorage.removeItem("token")
    // localStorage.removeItem("token");
    // navigate("/signin");
  }
  return (
    <HeroUiNavbar className="bg-slate-100">
      <NavbarBrand>
        <Link to={"/"} className="flex">
          <p className="font-bold text-inherit">CIRCLE</p>
        <span className="ms-2 text-red-600"><MessageCircleHeart /></span>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {isLoggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={"user name"}
                size="sm"
                src={UserData.photo}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile">
                <Link className="h-14" to="/profile">
                  <p className="font-semibold">{UserData.name}</p>
                  <p className="font-semibold">{UserData.email}</p>
                </Link>
              </DropdownItem>
              <DropdownItem onPress={LogOut} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Link to={"/signin"}>SignIn</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to={"/signup"}>SignUp</Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </HeroUiNavbar>
  );
}
