import './App.css'
import MainLayout from './Panel/MainLayout';
import {BrowserRouter as Router} from "react-router-dom";
// import 'react-image-upload/dist/index.css'
// interface props{
//   userRole: 'ADMIN'

// }
function App() {
  // const [count, setCount] = useState(0)
  let getUserRole: string | null = null;

  // Safely parse the user profile from local storage
  const storedProfile = localStorage.getItem('userProfile');
  if (storedProfile) {
    try {
      const parsedProfile = JSON.parse(storedProfile);
      getUserRole = parsedProfile?.role || null;
    } catch (error) {
      console.error('Error parsing user profile from local storage:', error);
    }
  }
  

  return (
    <Router>
      <MainLayout userRole={getUserRole}/>
    </Router>
  )
}

export default App
