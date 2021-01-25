import './App.css';
import {useState, useEffect} from 'react';

const URL = 'https://api.exchangeratesapi.io/latest';

function App() {
  const [eur,setEur] = useState(0);
  const [gbp,setGbp] = useState(0);
  const [rate,setRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then ((result) => {
      setRate(result.rates.GBP);
      setError(null);
      setIsLoading(false);
    }, (error) => {
        setError(error);
        setIsLoading(false);
        setRate(0);
    })
  }, [])

  function calculate(e) {
    console.log(eur);
    e.preventDefault();
    const conversion = eur * rate;
    setGbp(conversion);
  }

  if (isLoading) {
    return <div className="content"><p>Retrieving exchange rate...</p></div>;
  }
  else if (error) {
    return <div className="content"><p>{error.message}</p></div>;
  }
  else {
    return (
      <div className="content">
        <form onSubmit={calculate}>
          <div className="field">
            <label>Eur</label>&nbsp;
            <input type="number" step="0.01" value={eur} onChange={e => setEur(e.target.value)}/>&nbsp;
            <label className="rate" >Rate</label>&nbsp;
            <output className="rate">{rate}</output>
          </div>
          <div className="field">
            <label>Gbp</label>&nbsp;
            <output>{gbp.toFixed(2)}</output>
          </div>
          <div className="field">
             <button>Calculate</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
