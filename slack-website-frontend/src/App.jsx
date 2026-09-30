import './App.css';
import { Toaster } from './components/ui/toast';
import AppRoutes from './Routes';

function App() {
  return (
    <>
      <h2>Homepage</h2>
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;
