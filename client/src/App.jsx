import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import News from './components/News/News';
import Weather from './components/Weather/Weather';
import Blog from './components/Blog/Blog';
import RoutesNavigate from './components/RoutesNavigate/RoutesNavigate';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='news' element={<News />} />
          <Route path='weather' element={<Weather />} />
          <Route path='blog' element={<Blog />} />
          <Route path='contacts' element={<RoutesNavigate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
