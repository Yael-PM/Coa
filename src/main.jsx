import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import Result from './components/Result.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/Coa' element={<App></App>}></Route>
      <Route path='/Coa/resultado' element={<Result></Result>}></Route>
    </Routes>
  </BrowserRouter>
)
