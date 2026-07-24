import CohortDetails from './CohortDetails.jsx';

function App() {
  const cohorts = [
    { name: 'Full Stack Java', status: 'ongoing', startDate: '01 Jan 2026', endDate: '30 Jun 2026' },
    { name: 'Data Science', status: 'completed', startDate: '15 Mar 2025', endDate: '15 Sep 2025' },
    { name: 'Cloud Engineering', status: 'ongoing', startDate: '10 Jul 2026', endDate: '10 Dec 2026' }
  ];

  return (
    <div className="app">
      <h1>Cohort Dashboard</h1>
      {cohorts.map((cohort) => (
        <CohortDetails key={cohort.name} cohort={cohort} />
      ))}
    </div>
  );
}

export default App;
