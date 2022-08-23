import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
import user1 from "../assets/images/users/user4.jpg";
import AuthContext from "../context/AuthProvider";

const Header = () => {
  const { setAuth } = useContext(AuthContext)

  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const handleLogOut = () => {
    setAuth({
      email: '',
      name: '',
      role: '',
      id: 0
    })
    localStorage.removeItem('user');
  };

  return (
    <Navbar color="celuparts-dark-blue" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          {/* <Logo /> */}
          <img src="/celuparts-transparent.png" alt="celuparts-logo" className="small-image"></img>
        </div>
        <NavbarBrand href="/">
          <LogoWhite className=" d-lg-none" />
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen} className="d-flex flex-row-reverse">
        {/* <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/starter" className="nav-link">
              Starter
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              DD Menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav> */}
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>Mi Cuenta</DropdownItem>
            <DropdownItem>Editar Perfil</DropdownItem>
            <DropdownItem divider />
            {
              JSON.parse(localStorage.getItem('user')).role === "user" ? (
                <DropdownItem>
                  <Link to="/request-form">
                    Nueva Solicitud
                  </Link>
                </DropdownItem>
              ) : null
            }
            {
              JSON.parse(localStorage.getItem('user')).role === "user" ? (
                <DropdownItem>
                  <Link to="/user-repair-requests">
                    Mis Reparaciones
                  </Link>
                </DropdownItem>
              ) : null
            }
            {
              JSON.parse(localStorage.getItem('user')).role === "user" ? (
                <DropdownItem>
                  <Link to="/user-retoma-requests">
                    Mis Retomas
                  </Link>
                </DropdownItem>
              ) : null
            }

            <DropdownItem divider />
            <DropdownItem>
              <Link to="/SignIn" onClick={handleLogOut}>
                Salir
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* <Dropdown>
          <DropdownToggle color="transparent">
            <i className="bi bi-bell-fill"></i>
          </DropdownToggle>
        </Dropdown> */}
      </Collapse>
    </Navbar>
  );
};

export default Header;
