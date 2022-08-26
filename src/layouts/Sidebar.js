import React, { useContext } from "react";
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";

const Sidebar = () => {

  const navigation = [];

  if(JSON.parse(localStorage.getItem('user')).role === "admin" ) {
    navigation.push(
      // {
      //   title: "Dashboard",
      //   href: "/starter",
      //   icon: "bi bi-speedometer2",
      // },
      // {
      //   title: "Alert",
      //   href: "./alerts",
      //   icon: "bi bi-bell",
      // },
      // {
      //   title: "Badges",
      //   href: "./badges",
      //   icon: "bi bi-patch-check",
      // },
      // {
      //   title: "Buttons",
      //   href: "./buttons",
      //   icon: "bi bi-hdd-stack",
      // },
      // {
      //   title: "Cards",
      //   href: "./cards",
      //   icon: "bi bi-card-text",
      // },
      // {
      //   title: "Grid",
      //   href: "./grid",
      //   icon: "bi bi-columns",
      // },
      // {
      //   title: "Table",
      //   href: "./table",
      //   icon: "bi bi-layout-split",
      // },
      // {
      //   title: "Forms",
      //   href: "./forms",
      //   icon: "bi bi-textarea-resize",
      // },
      // {
      //   title: "Breadcrumbs",
      //   href: "./breadcrumbs",
      //   icon: "bi bi-link",
      // },
      // {
      //   title: "About",
      //   href: "./about",
      //   icon: "bi bi-people",
      // },
      {
        title: "Notificaciones",
        href: "/admin-alerts"
      },
      {
        title: "Lista de usuarios",
        href: "./users-table",
      },
      {
        title: "Lista de reparaciones",
        href: "./repair-requests-table",
      },
      {
        title: "Lista de retomas",
        href: "./retoma-requests-table",
      },
      {
        title: "Lista de equipos",
        href: "./equipments-table",
      },
      {
        title: "Lista de técnicos",
        href: "./technicians-table",
      },
      {
        title: "Lista de tecnicos asociados a reparaciones", 
        href: "./repair-table",
      },
      {
        title: "Lista de productos de SIIGO",
        href: "/siigo-products-table"
      }, 
      {
        title: "Lista de clientes de SIIGO",
        href: "/siigo-customers-table"
      }, 
      {
        title: "Lista de facturas de venta de SIIGO",
        href: "/siigo-invoices-table"
      },
      {
        title: "Lista de notas de credito de SIIGO",
        href: "/siigo-credit-notes-table"
      },
      {
        title: "Lista de recibos de caja de SIIGO",
        href: "/siigo-vouchers-table"
      },
      {
        title: "Lista de comprobantes contables de SIIGO",
        href: "/siigo-journals-table"
      },
      {
        title: "Lista de grupos de inventario de SIIGO",
        href: "/siigo-account-groups-table"
      },
      {
        title: "Lista de impuestos de SIIGO",
        href: "/siigo-taxes-table"
      },
      {
        title: "Lista de precios de SIIGO",
        href: "/siigo-price-lists-table"
      },
      {
        title: "Lista de bodegas de SIIGO",
        href: "/siigo-ware-houses-table"
      },
      {
        title: "Lista de usuarios de SIIGO",
        href: "/siigo-users-table"
      },
      {
        title: "Lista de centros de costo de SIIGO",
        href: "/siigo-cost-centers-table"
      },
      {
        title: "Lista de activos fijos de SIIGO",
        href: "/siigo-fixed-assets-table"
      },
    );
  } else if(JSON.parse(localStorage.getItem('user')).role === "tecnico" ) {
    navigation.push(
      {
        title: "Lista de reparaciones",
        href: "./repair-requests-table",
      },
      {
        title: "Lista de retomas",
        href: "./retoma-requests-table",
      },
      {
        title: "Lista de tecnicos asociados a reparaciones", 
        href: "./repair-table",
      },
      {
        title: "Notificaciones",
        href: "./technician-alerts"
      }
    );
  } else if (JSON.parse(localStorage.getItem('user')).role === "mensajero" ) {
    navigation.push(
      {
        title: "Lista de reparaciones",
        href: "./repair-requests-table",
      },
      {
        title: "Lista de retomas",
        href: "./retoma-requests-table",
      },
      {
        title: "Notificaciones servicio a domicilio",
        href: "./courier-alerts",
      }
    );
  } else if(JSON.parse(localStorage.getItem('user')).role === "user" ) {
    navigation.push(
      {
        title: "Notificaciones",
        href: "./user-alerts"
      }
    )
  }

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">{JSON.parse(localStorage.getItem('user')).name}</div>
      </div>
      <div className="p-2 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          {/* <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://wrappixel.com/templates/materialpro-react-admin/?ref=33"
          >
            Upgrade To Pro
          </Button> */}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
