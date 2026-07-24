import '../Stylesheets/mystyle.css';

function CalculateScore({ name, school, total, goal }) {
  const average = (total / goal) * 100;
  const grade =
    average >= 90 ? 'A' :
    average >= 80 ? 'B' :
    average >= 70 ? 'C' :
    average >= 60 ? 'D' : 'F';

  return (
    <div className="card">
      <h2 className="card-title">Student Score Card</h2>
      <div className="info-row">
        <span className="label">Name</span>
        <span className="value">{name}</span>
      </div>
      <div className="info-row">
        <span className="label">School</span>
        <span className="value">{school}</span>
      </div>
      <div className="info-row">
        <span className="label">Total Marks</span>
        <span className="value">{total}</span>
      </div>
      <div className="info-row">
        <span className="label">Goal (Max Marks)</span>
        <span className="value">{goal}</span>
      </div>
      <div className="divider"></div>
      <div className="result">
        <p className="average-label">Average Score</p>
        <p className="average-value">{average.toFixed(2)}%</p>
        <p className="grade">Grade: <strong>{grade}</strong></p>
      </div>
    </div>
  );
}

export default CalculateScore;
