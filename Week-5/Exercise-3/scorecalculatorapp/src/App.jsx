import './Stylesheets/mystyle.css';
import CalculateScore from './Components/CalculateScore';

function App() {
  return (
    <div className="app-wrapper">
      <h1 className="app-heading">Student Score Calculator</h1>
      <CalculateScore
        name="Yagnatejeswar Reddy"
        school="SkillSpring Academy"
        total={430}
        goal={500}
      />
      <CalculateScore
        name="Priya Sharma"
        school="Greenwood High School"
        total={370}
        goal={500}
      />
    </div>
  );
}

export default App;
