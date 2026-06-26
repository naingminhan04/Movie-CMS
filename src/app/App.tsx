import { Toaster } from "react-hot-toast";

import QueryProvider from "./providers/QueryProvider";
import RouteProvider from "./providers/RouteProvider";
import ThemeProvider from "./providers/ThemeProvider";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouteProvider />
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
