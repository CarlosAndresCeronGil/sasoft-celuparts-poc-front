import { lazy } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const SignIn = lazy(() => import("../views/ui/SignIn"));
const SignUp = lazy(() => import("../views/ui/SignUp"))
const UsersTable = lazy(() => import("../views/ui/UsersTable"));
const RequestsTable = lazy(() => import("../views/ui/RequestsTable"));
const EquipmentsTable = lazy(() => import("../views/ui/EquipmentsTable"));
const RequestStatusTable = lazy(() => import("../views/ui/RequestStatusTable"));
const TechniciansTable = lazy(() => import("../views/ui/TechniciansTable"));
const RepairTable = lazy(() => import("../views/ui/RepairTable"));
const RequestForm = lazy(() => import("../views/ui/RequestForm"));
const UpdateRepairForm = lazy(() => import("../views/ui/UpdateRepairForm"));
const RequestStatusForm = lazy(() => import("../views/ui/RequestStatusForm"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/starter",
    element: <FullLayout />,
    children: [
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/starter/about", exact: true, element: <About /> },
      { path: "/starter/alerts", exact: true, element: <Alerts /> },
      { path: "/starter/badges", exact: true, element: <Badges /> },
      { path: "/starter/buttons", exact: true, element: <Buttons /> },
      { path: "/starter/cards", exact: true, element: <Cards /> },
      { path: "/starter/grid", exact: true, element: <Grid /> },
      { path: "/starter/table", exact: true, element: <Tables /> },
      { path: "/starter/forms", exact: true, element: <Forms /> },
      { path: "/starter/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/starter/users-table", exact: true, element: <UsersTable /> },
      { path: "/starter/requests-table", exact: true, element: <RequestsTable /> },
      { path: "/starter/request-form", exact: true, element: <RequestForm /> },
      { path: "/starter/equipments-table", exact: true, element: <EquipmentsTable /> },
      { path: "/starter/repair-table", exact: true, element: <RepairTable /> },
      { path: "/starter/update-repair-form/:id", exact: true, element: <UpdateRepairForm /> },
      { path: "/starter/request-status-table", exact: true, element: <RequestStatusTable /> },
      { path: "/starter/request-status-form/:id", exact: true, element: <RequestStatusForm /> },
      { path: "/starter/technicians-table", exact: true, element: <TechniciansTable /> },
    ],
  },
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  }
];

export default ThemeRoutes;
