import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Alerts from './Alerts';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Alerts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;