import './App.css'
import MainLayout from './Panel/MainLayout';
import {BrowserRouter as Router} from "react-router-dom";
// import 'react-image-upload/dist/index.css'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <MainLayout />
    </Router>
  )
}

export default App
