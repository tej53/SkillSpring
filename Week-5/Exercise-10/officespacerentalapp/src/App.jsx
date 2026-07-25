import './App.css';

function App() {
  // Heading element
  const element = 'Office Space';

  // Office image attribute (JSX attribute)
  const jsxatt = (
    <img
      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop"
      width="25%"
      height="25%"
      alt="Office Space"
    />
  );

  // Single office object
  const ItemName = {
    Name: 'DBS',
    Rent: 50000,
    Address: 'Chennai',
  };

  // List of office objects
  const officeSpaces = [
    { Name: 'DBS', Rent: 50000, Address: 'Chennai' },
    { Name: 'Regus', Rent: 75000, Address: 'Bangalore' },
    { Name: 'WeWork', Rent: 45000, Address: 'Hyderabad' },
    { Name: 'SmartWorks', Rent: 82000, Address: 'Mumbai' },
  ];

  // Inline CSS for rent color based on value
  const rentColor = (rent) => ({
    color: rent <= 60000 ? 'red' : 'green',
  });

  return (
    <div className="App">
      <h1>{element}, at Affordable Range</h1>

      {jsxatt}

      <h1>Name: {ItemName.Name}</h1>
      <h3 style={rentColor(ItemName.Rent)}>Rent: Rs. {ItemName.Rent}</h3>
      <h3>Address: {ItemName.Address}</h3>

      <hr />

      <h2>More Office Spaces</h2>
      {officeSpaces.map((item, index) => (
        <div key={index} className="office-card">
          <h1>Name: {item.Name}</h1>
          <h3 style={rentColor(item.Rent)}>Rent: Rs. {item.Rent}</h3>
          <h3>Address: {item.Address}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
