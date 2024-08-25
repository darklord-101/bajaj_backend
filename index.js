import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data) throw new Error('Invalid JSON structure');

      const res = await axios.post('http://127.0.0.1:5000/bfhl', parsedInput);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON input or server error');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>Alphabets: {response.alphabets.join(', ')}</div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>Numbers: {response.numbers.join(', ')}</div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            Highest lowercase alphabet:{' '}
            {response.highest_lowercase_alphabet.join(', ')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder='Enter JSON input like { "data": ["A", "C", "z"] }'
        value={jsonInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {response && (
        <div>
          <h3>Select options to display:</h3>
          <div>
            <input
              type="checkbox"
              id="alphabets"
              value="Alphabets"
              onChange={handleOptionChange}
            />
            <label htmlFor="alphabets">Alphabets</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="numbers"
              value="Numbers"
              onChange={handleOptionChange}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="highest_lowercase"
              value="Highest lowercase alphabet"
              onChange={handleOptionChange}
            />
            <label htmlFor="highest_lowercase">
              Highest lowercase alphabet
            </label>
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
