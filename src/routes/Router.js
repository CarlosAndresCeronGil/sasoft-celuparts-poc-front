import React from "react";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

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
  const Home = lazy(() => import("../views/ui/Home"));
  const RequestRepairForm = lazy(() => import("../views/ui/RequestRepairForm"));
  const RequestRetomaForm = lazy(() => import("../views/ui/RequestRetomaForm"));
  const TestUploadEquipment = lazy(() => import("../views/ui/TestUploadEquipment"));

  /*****Routes******/
  const ThemeRoutes = [
    {
      path: "/",
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
        path: "/home",
        exact: true,
        element: <FullLayout />,
        children: [
          { path: "/home", exact: true, element: <Home /> }, 
          { path: "/home/request-form", exact: true, element: <RequestForm /> },
          { path: "/home/user-repair-requests", exact: true, element: <UserRepairRequests /> },
          { path: "/home/user-retoma-requests", exact: true, element: <UserRetomaRequests /> },
          { path: "/home/user-alerts", exact: true, element: <CustomerAlerts /> },
          { path: "/home/request-repair-form", exact: true, element: <RequestRepairForm /> },
          { path: "/home/request-retoma-form", exact: true, element: <RequestRetomaForm />  },
          { path: "/home/test-upload-equipment", exact: true, element: <TestUploadEquipment /> }
        ],
      }
    ) : JSON.parse(localStorage.getItem('user')).role === "admin" ? ThemeRoutes.push(
      {
        path: "/home",
        exact: true,
        element: <FullLayout />,
        children: [
          { path: "/home", exact: true, element: <Home /> }, 
          { path: "/home/users-table", exact: true, element: <UsersTable /> },
          { path: "/home/repair-requests-table", exact: true, element: <RepairRequestsTable /> },
          { path: "/home/retoma-requests-table", exact: true, element: <RetomaRequestsTable /> },
          { path: "/home/equipments-table", exact: true, element: <EquipmentsTable /> },
          { path: "/home/request-status-table", exact: true, element: <RequestStatusTable /> },
          { path: "/home/technicians-table", exact: true, element: <TechniciansTable /> },
          { path: "/home/repair-table", exact: true, element: <RepairTable /> },
          { path: "/home/update-repair-form", exact: true, element: <UpdateRepairForm /> },
          { path: "/home/request-status-form", exact: true, element: <RequestStatusForm /> },
          { path: "/home/request-status-form/:id", exact: true, element: <RequestStatusForm /> },
          { path: "/home/update-repair-form/:id", exact: true, element: <UpdateRepairForm /> },
          { path: "/home/update-retoma-form/:id", exact: true, element: <UpdateRetomaForm /> },
          { path: "/home/repair-payment-form/:id", exact: true, element: <RepairPaymentForm /> },
          { path: "/home/retoma-payment-form/:id", exact: true, element: <RetomaPaymentForm /> },
          { path: "/home/siigo-products-table", exact: true, element: <SiigoProductsTable /> },
          { path: "/home/siigo-product-form", exact: true, element: <SiigoProductForm /> },
          { path: "/home/siigo-customers-table", exact: true, element: <SiigoCustomersTable /> },
          { path: "/home/siigo-customer-form", exact: true, element: <SiigoCustomerForm /> },
          { path: "/home/siigo-invoices-table", exact: true, element: <SiigoInvoicesTables /> },
          { path: "/home/siigo-invoices-form", exact: true, element: <SiigoInvoiceForm /> },
          { path: "/home/siigo-credit-notes-table", exact: true, element: <SiigoCreditNotesTable /> },
          { path: "/home/siigo-credit-notes-form", exact: true, element: <SiigoCreditNotesForm /> },
          { path: "/home/siigo-vouchers-table", exact: true, element: <SiigoVouchersTable /> },
          { path: "/home/siigo-voucher-form", exact: true, element: <SiigoVoucherForm /> },
          { path: "/home/siigo-journals-table", exact: true, element: <SiigoJournalsTable /> },
          { path: "/home/siigo-journal-form", exact: true, element: <SiigoJournalsForm /> },
          { path: "/home/siigo-account-groups-table", exact: true, element: <SiigoAccountGroupsTable /> },
          { path: "/home/siigo-taxes-table", exact: true, element: <SiigoTaxesTable /> },
          { path: "/home/siigo-price-lists-table", exact: true, element: <SiigoPriceListsTable /> },
          { path: "/home/siigo-ware-houses-table", exact: true, element: <SiigoWareHousesTable /> },
          { path: "/home/siigo-users-table", exact: true, element: <SiigoUsersTable /> },
          { path: "/home/siigo-cost-centers-table", exact: true, element: <SiigoCostCentersTable /> },
          { path: "/home/siigo-fixed-assets-table", exact: true, element: <SiigoFixedAssetsTable /> },
          { path: "/home/admin-alerts", exact: true, element: <AdminAlerts /> }
        ],
      },
    ) : JSON.parse(localStorage.getItem('user')).role === "aux_admin" ? ThemeRoutes.push(
      {
        path: "/home",
        exact: true,
        element: <FullLayout />,
        children: [
          { path: "/home", exact: true, element: <Home /> }, 
          { path: "/home/repair-requests-table", exact: true, element: <RepairRequestsTable /> },
          { path: "/home/retoma-requests-table", exact: true, element: <RetomaRequestsTable /> },
          { path: "/home/request-status-table", exact: true, element: <RequestStatusTable /> },
          { path: "/home/update-repair-form", exact: true, element: <UpdateRepairForm /> },
          { path: "/home/request-status-form", exact: true, element: <RequestStatusForm /> },
          { path: "/home/request-status-form/:id", exact: true, element: <RequestStatusForm /> },
          { path: "/home/update-repair-form/:id", exact: true, element: <UpdateRepairForm /> },
          { path: "/home/update-retoma-form/:id", exact: true, element: <UpdateRetomaForm /> },
          { path: "/home/repair-payment-form/:id", exact: true, element: <RepairPaymentForm /> },
          { path: "/home/retoma-payment-form/:id", exact: true, element: <RetomaPaymentForm /> },
          { path: "/home/admin-alerts", exact: true, element: <AdminAlerts /> }
        ],
      },
    ) : JSON.parse(localStorage.getItem('user')).role === "tecnico" ? ThemeRoutes.push(
      {
        path: "/home",
        exact: true,
        element: <FullLayout />,
        children: [
          { path: "/home", exact: true, element: <Home /> }, 
          { path: "/home/repair-requests-table", exact: true, element: <RepairRequestsTable /> },
          { path: "/home/retoma-requests-table", exact: true, element: <RetomaRequestsTable /> },
          { path: "/home/repair-table", exact: true, element: <RepairTable /> },
          { path: "/home/update-repair-form", exact: true, element: <UpdateRepairForm /> },
          { path: "/home/update-retoma-form/:id", exact: true, element: <UpdateRetomaForm /> },
          { path: "/home/request-status-form/:id", exact: true, element: <RequestStatusForm /> },
          { path: "/home/update-repair-form/:id", exact: true, element: <UpdateRepairForm /> },
          { path: "/home/technician-alerts", exact: true, element: <TechnicianAlerts /> }
        ],
      },
    ) : JSON.parse(localStorage.getItem('user')).role === "mensajero" ? ThemeRoutes.push(
      {
        path: "/home",
        exact: true,
        element: <FullLayout />,
        children: [
          { path: "/home", exact: true, element: <Home /> }, 
          { path: "/home/repair-requests-table", exact: true, element: <RepairRequestsTable /> },
          { path: "/home/retoma-requests-table", exact: true, element: <RetomaRequestsTable /> },
          { path: "/home/repair-table", exact: true, element: <RepairTable /> },
          { path: "/home/update-repair-form", exact: true, element: <UpdateRepairForm /> },
          { path: "/home/request-status-form/:id", exact: true, element: <RequestStatusForm /> },
          { path: "/home/courier-alerts", exact: true, element: <CourierAlerts /> }
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
