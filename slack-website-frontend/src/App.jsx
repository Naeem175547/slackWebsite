import './App.css';
import { Toaster } from './components/ui/toast';
import AppContextProvider from './context/AppContextProvider';
import AppRoutes from './Routes';

function App() {
  return (
    <>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
      <Toaster />
    </>
  );
}

export default App;
