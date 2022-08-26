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
  const Alerts = lazy(() => import("../views/ui/Alerts"));
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
  const SiigoCustomersTable = lazy(() => import("../views/ui/SiigoCustomersTable"));
  const SiigoCustomerForm = lazy(() => import("../views/ui/SiigoCustomerForm"));
  const SiigoInvoicesTables = lazy(() => import("../views/ui/SiigoInvoicesTables"));
  const SiigoInvoiceForm = lazy(() => import("../views/ui/SiigoInvoiceForm"));
  const SiigoCreditNotesTable = lazy(() => import("../views/ui/SiigoCreditNotesTable"));
  const SiigoCreditNotesForm = lazy(() => import("../views/ui/SiigoCreditNotesForm"));
  const SiigoVouchersTable = lazy(() => import("../views/ui/SiigoVouchersTable"));
  const SiigoVoucherForm = lazy(() => import("../views/ui/SiigoVoucherForm"));
  const SiigoJournalsTable = lazy(() => import("../views/ui/SiigoJournalsTable"));
  const SiigoJournalsForm = lazy(() => import("../views/ui/SiigoJournalsForm"));
  const SiigoAccountGroupsTable = lazy(() => import("../views/ui/SiigoAccountGroupsTable"));
  const SiigoTaxesTable = lazy(() => import("../views/ui/SiigoTaxesTable"));
  const SiigoPriceListsTable = lazy(() => import("../views/ui/SiigoPriceListsTable"));
  const SiigoWareHousesTable = lazy(() => import("../views/ui/SiigoWareHousesTable"));
  const SiigoUsersTable = lazy(() => import("../views/ui/SiigoUsersTable"));
  const SiigoCostCentersTable = lazy(() => import("../views/ui/SiigoCostCentersTable"));
  const SiigoFixedAssetsTable = lazy(() => import("../views/ui/SiigoFixedAssetsTable"));
  const CourierAlerts = lazy(() => import("../views/ui/CourierAlerts"));
  const CustomerAlerts = lazy(() => import("../views/ui/CustomerAlerts"));
  const TechnicianAlerts = lazy(() => import("../views/ui/TechnicianAlerts"));
  const AdminAlerts = lazy(() => import("../views/ui/AdminAlerts"));

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
          { path: "/user-alerts", exact: true, element: <CustomerAlerts /> }
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
          { path: "/siigo-product-form", exact: true, element: <SiigoProductForm /> },
          { path: "/siigo-customers-table", exact: true, element: <SiigoCustomersTable /> },
          { path: "/siigo-customer-form", exact: true, element: <SiigoCustomerForm /> },
          { path: "/siigo-invoices-table", exact: true, element: <SiigoInvoicesTables /> },
          { path: "/siigo-invoices-form", exact: true, element: <SiigoInvoiceForm /> },
          { path: "/siigo-credit-notes-table", exact: true, element: <SiigoCreditNotesTable /> },
          { path: "/siigo-credit-notes-form", exact: true, element: <SiigoCreditNotesForm /> },
          { path: "/siigo-vouchers-table", exact: true, element: <SiigoVouchersTable /> },
          { path: "/siigo-voucher-form", exact: true, element: <SiigoVoucherForm /> },
          { path: "/siigo-journals-table", exact: true, element: <SiigoJournalsTable /> },
          { path: "/siigo-journal-form", exact: true, element: <SiigoJournalsForm /> },
          { path: "/siigo-account-groups-table", exact: true, element: <SiigoAccountGroupsTable /> },
          { path: "/siigo-taxes-table", exact: true, element: <SiigoTaxesTable /> },
          { path: "/siigo-price-lists-table", exact: true, element: <SiigoPriceListsTable /> },
          { path: "/siigo-ware-houses-table", exact: true, element: <SiigoWareHousesTable /> },
          { path: "/siigo-users-table", exact: true, element: <SiigoUsersTable /> },
          { path: "/siigo-cost-centers-table", exact: true, element: <SiigoCostCentersTable /> },
          { path: "/siigo-fixed-assets-table", exact: true, element: <SiigoFixedAssetsTable /> },
          { path: "/admin-alerts", exact: true, element: <AdminAlerts /> }
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
          { path: "/technician-alerts", exact: true, element: <TechnicianAlerts /> }
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
          { path: "/courier-alerts", exact: true, element: <CourierAlerts /> }
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
