import { Route, Routes } from 'react-router-dom';
import { Home } from './component/home/Index';
import { IssuePage } from './component/home/IssuePage';
import { TopNavi } from './component/navi/TopNavi';

function App() {
  return (
    <div>
      <TopNavi />
      <div css={{ padding: '8vh 1rem 0' }}>
        <Routes>
          <Route path='*' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/issue' element={<IssuePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
