import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatRoom from './component/ChatRoom';
import MainForm from './component/MainForm';

function App() {
  return (
    <div className="app">
    
     <BrowserRouter>
       <Routes>
          <Route index element={<MainForm/>}/>
          <Route path='/chat/:roomName' element={<ChatRoom/>}/>
          <Route path='*' element={<h1>404 not found !</h1>}/>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
