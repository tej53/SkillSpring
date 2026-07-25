import ListofPlayers from './ListofPlayers';
import IndianPlayers from './IndianPlayers';
import './App.css';

function App() {
  // Toggle this flag to switch between components
  const flag = true;

  if (flag) {
    return (
      <div className="App">
        <ListofPlayers />
      </div>
    );
  }

  return (
    <div className="App">
      <IndianPlayers />
    </div>
  );
}

export default App;
