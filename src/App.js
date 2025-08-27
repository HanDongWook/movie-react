import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './routes/home/Home';
import Detail from './routes/detail/Detail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
