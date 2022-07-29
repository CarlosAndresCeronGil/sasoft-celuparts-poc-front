import { lazy } from "react";
import { Navigate } from "react-router-dom";

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

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/starter",
    element: <FullLayout />,
    children: [
      // { path: "/", element: <Navigate to="/starter" /> },
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
      { path: "/starter/equipments-table", exact: true, element: <EquipmentsTable /> },
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
