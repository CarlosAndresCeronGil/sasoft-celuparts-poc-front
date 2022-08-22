import { exact } from "prop-types";
import React from "react";
import { lazy } from "react";

export function Router() {
  /****Layouts*****/
  const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

  /***** Pages ****/

  // const Starter = lazy(() => import("../views/Starter.js"));
  // const About = lazy(() => import("../views/About.js"));
  // const Alerts = lazy(() => import("../views/ui/Alerts"));
  // const Badges = lazy(() => import("../views/ui/Badges"));
  // const Buttons = lazy(() => import("../views/ui/Buttons"));
  // const Cards = lazy(() => import("../views/ui/Cards"));
  // const Grid = lazy(() => import("../views/ui/Grid"));
  // const Tables = lazy(() => import("../views/ui/Tables"));
  // const Forms = lazy(() => import("../views/ui/Forms"));
  // const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
  const SignIn = lazy(() => import("../views/ui/SignIn"));
  const SignUp = lazy(() => import("../views/ui/SignUp"))
  const UsersTable = lazy(() => import("../views/ui/UsersTable"));
  const RepairRequestsTable = lazy(() => import("../views/ui/RepairRequestsTable"));
  const RetomaRequestsTable = lazy(() => import("../views/ui/RetomaRequestsTable"));
  const EquipmentsTable = lazy(() => import("../views/ui/EquipmentsTable"));
  const RequestStatusTable = lazy(() => import("../views/ui/RequestStatusTable"));
  const TechniciansTable = lazy(() => import("../views/ui/TechniciansTable"));
  const RepairTable = lazy(() => import("../views/ui/RepairTable"));
  const RequestForm = lazy(() => import("../views/ui/RequestForm"));
  const UpdateRepairForm = lazy(() => import("../views/ui/UpdateRepairForm"));
  const UpdateRetomaForm = lazy(() => import("../views/ui/UpdateRetomaForm"));
  const RequestStatusForm = lazy(() => import("../views/ui/RequestStatusForm"));
  const UserRepairRequests = lazy(() => import("../views/ui/UserRepairRequests"));
  const UserRetomaRequests = lazy(() => import("../views/ui/UserRetomaRequests"));
  const RepairPaymentForm = lazy(() => import("../views/ui/RepairPaymentForm"));
  const RetomaPaymentForm = lazy(() => import("../views/ui/RetomaPaymentForm"));
  const SiigoProductsTable = lazy(() => import("../views/ui/SiigoProductsTable"));
  const SiigoProductForm = lazy(() => import("../views/ui/SiigoProductForm"));

  /*****Routes******/
  const ThemeRoutes = [
    {
      path: "/SignIn",
      element: <SignIn />,
    },
    {
      path: "/SignUp",
      element: <SignUp />,
    }
  ]

  if (JSON.parse(localStorage.getItem('user')) !== null) {
    JSON.parse(localStorage.getItem('user')).role === "user" ? ThemeRoutes.push(
      {
        path: "/",
        exact: true,
        element: <FullLayout />,
        children: [
          { path: "/request-form", exact: true, element: <RequestForm /> },
          { path: "/user-repair-requests", exact: true, element: <UserRepairRequests /> },
          { path: "/user-retoma-requests", exact: true, element: <UserRetomaRequests /> },
        ],
      }
    ) : JSON.parse(localStorage.getItem('user')).role === "admin" ? ThemeRoutes.push(
      {
        path: "/",
        exact: true,
        element: <FullLayout />,
        children: [
          { path: "/users-table", exact: true, element: <UsersTable /> },
          { path: "/repair-requests-table", exact: true, element: <RepairRequestsTable /> },
          { path: "/retoma-requests-table", exact: true, element: <RetomaRequestsTable /> },
          { path: "/equipments-table", exact: true, element: <EquipmentsTable /> },
          { path: "/request-status-table", exact: true, element: <RequestStatusTable /> },
          { path: "/technicians-table", exact: true, element: <TechniciansTable /> },
          { path: "/repair-table", exact: true, element: <RepairTable /> },
          { path: "/update-repair-form", exact: true, element: <UpdateRepairForm /> },
          { path: "/request-status-form", exact: true, element: <RequestStatusForm /> },
          { path: "/request-status-form/:id", exact: true, element: <RequestStatusForm /> },
          { path: "/update-repair-form/:id", exact: true, element: <UpdateRepairForm /> },
          { path: "/update-retoma-form/:id", exact: true, element: <UpdateRetomaForm /> },
          { path: "/repair-payment-form/:id", exact: true, element: <RepairPaymentForm /> },
          { path: "/retoma-payment-form/:id", exact: true, element: <RetomaPaymentForm /> },
          { path: "/siigo-products-table", exact: true, element: <SiigoProductsTable /> },
          { path: "/siigo-product-form", exact: true, element: <SiigoProductForm /> }
        ],
      },
    ) : JSON.parse(localStorage.getItem('user')).role === "tecnico" ? ThemeRoutes.push(
      {
        path: "/",
        exact: true,
        element: <FullLayout />,
        children: [
          { path: "/repair-requests-table", exact: true, element: <RepairRequestsTable /> },
          { path: "/retoma-requests-table", exact: true, element: <RetomaRequestsTable /> },
          { path: "/repair-table", exact: true, element: <RepairTable /> },
          { path: "/update-repair-form", exact: true, element: <UpdateRepairForm /> },
          { path: "/update-retoma-form/:id", exact: true, element: <UpdateRetomaForm /> },
          { path: "/request-status-form/:id", exact: true, element: <RequestStatusForm /> },
          { path: "/update-repair-form/:id", exact: true, element: <UpdateRepairForm /> },
        ],
      },
    ) : JSON.parse(localStorage.getItem('user')).role === "mensajero" ? ThemeRoutes.push(
      {
        path: "/",
        exact: true,
        element: <FullLayout />,
        children: [
          { path: "/repair-requests-table", exact: true, element: <RepairRequestsTable /> },
          { path: "/retoma-requests-table", exact: true, element: <RetomaRequestsTable /> },
          { path: "/repair-table", exact: true, element: <RepairTable /> },
          { path: "/update-repair-form", exact: true, element: <UpdateRepairForm /> },
          { path: "/request-status-form/:id", exact: true, element: <RequestStatusForm /> },
        ],
      },
    ) : ThemeRoutes.push(
      {
      }
    )
  }

  // const ThemeRoutes = [
  //   {
  //     // path: "/starter"
  //     path: "/",
  //     element: <FullLayout />,
  //     children: [
  //       // { path: "/starter", exact: true, element: <Starter /> },
  //       // { path: "/starter/about", exact: true, element: <About /> },
  //       // { path: "/starter/alerts", exact: true, element: <Alerts /> },
  //       // { path: "/starter/badges", exact: true, element: <Badges /> },
  //       // { path: "/starter/buttons", exact: true, element: <Buttons /> },
  //       // { path: "/starter/cards", exact: true, element: <Cards /> },
  //       // { path: "/starter/grid", exact: true, element: <Grid /> },
  //       // { path: "/starter/table", exact: true, element: <Tables /> },
  //       // { path: "/starter/forms", exact: true, element: <Forms /> },
  //       // { path: "/starter/breadcrumbs", exact: true, element: <Breadcrumbs /> },
  //       { path: "/users-table", exact: true, element: <UsersTable /> },
  //       { path: "/requests-table", exact: true, element: <RequestsTable /> },
  //       { path: "/request-form", exact: true, element: <RequestForm /> },
  //       { path: "/equipments-table", exact: true, element: <EquipmentsTable /> },
  //       { path: "/repair-table", exact: true, element: <RepairTable /> },
  //       { path: "/update-repair-form/:id", exact: true, element: <UpdateRepairForm /> },
  //       { path: "/request-status-table", exact: true, element: <RequestStatusTable /> },
  //       { path: "/request-status-form/:id", exact: true, element: <RequestStatusForm /> },
  //       { path: "/technicians-table", exact: true, element: <TechniciansTable /> },
  //       { path: "/user-requests", exact: true, element: <UserRequests /> },
  //     ],
  //   },
  //   {
  //     path: "/SignIn",
  //     element: <SignIn />,
  //   },
  //   {
  //     path: "/SignUp",
  //     element: <SignUp />,
  //   }
  // ];

  return { ThemeRoutes }
}
// export default ThemeRoutes;
