import './App.css';
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"

function App() {
  const navigation = useNavigate();
  useEffect(()=>{
    navigation("/auth/login")
  },[])


  return (
    <div className="App">
      <h1>main</h1>
    </div>
  );
}

export default App;
