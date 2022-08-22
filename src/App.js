import { useRoutes } from "react-router-dom";
import { Router } from "./routes/Router";
// import Themeroutes from "./routes/Router";


const App = () => {
  // const routing = useRoutes(Themeroutes);
  const { ThemeRoutes } = Router()
  const routing = useRoutes(ThemeRoutes);

    return (
      <div className="dark">
        {routing}
      </div>
    );
  
};

export default App;
