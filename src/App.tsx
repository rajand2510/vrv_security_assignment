import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';

function App() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;