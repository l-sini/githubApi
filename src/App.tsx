import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import './App.css';
import { Home } from './component/home/Index';
import { SideNavi } from './component/sideNavi/Index';
import { IssueList } from './component/home/IssueList';

function App() {
  const a = 1;
  return (
    <div>
      <SideNavi />
      <div
        css={{
          paddingLeft: '350px',
        }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/issue' element={<IssueList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
