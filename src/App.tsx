
import './App.css'
import { useUser } from './context/UserContext';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home'

function App() {
  const user = useUser();
  return <>{user ? <Home /> : <Auth />}</>;

}

export default App
