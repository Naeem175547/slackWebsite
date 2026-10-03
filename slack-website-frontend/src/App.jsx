import './App.css';
import { Toaster } from './components/ui/toast';
import AppContextProvider from './context/AppContextProvider';
import AppRoutes from './Routes';
import { Modals } from './components/organisms/model/model';

function App() {
  return (
    <>
      <AppContextProvider>
        <AppRoutes />
        <Modals />
      </AppContextProvider>
      <Toaster />
    </>
  );
}

export default App;
