import React, { useState } from 'react';
import styles from './Simulator.module.css';

function Simulator({ analysisResult, setError }) {
  const [scenarioHistory, setScenarioHistory] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleScenarioSubmit = async (e) => {
    e.preventDefault();
    if (!currentQuery.trim()) return;
    
    setIsSimulating(true);
    setError('');
    const query = currentQuery;
    const currentHistory = [...scenarioHistory, { user: query, ai: 'Thinking...' }];
    setScenarioHistory(currentHistory);
    setCurrentQuery('');

    try {
      const response = await fetch('http://127.0.0.1:8000/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis_context: analysisResult.analysis_context,
          user_query: query,
          company_name: analysisResult.company_name,
          cleaned_data: analysisResult.cleaned_data
        }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const result = await response.json();
      setScenarioHistory([...currentHistory.slice(0, -1), { user: query, ai: result.response }]);
    } catch (e) {
      setError('An error occurred during simulation. Check the backend console.');
      setScenarioHistory(currentHistory.slice(0, -1));
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Financial Simulator for {analysisResult.company_name}</h2>
      <p>Ask a 'what-if' question based on the initial analysis.</p>
      
      <div className={styles.scenarioChat}>
        {scenarioHistory.length === 0 && <div className={styles.placeholder}>Your conversation will appear here...</div>}
        {scenarioHistory.map((entry, index) => (
          <React.Fragment key={index}>
            <div className={`${styles.chatBubble} ${styles.userBubble}`}>{entry.user}</div>
            <div className={styles.chatBubble}>{entry.ai}</div>
          </React.Fragment>
        ))}
      </div>
      
      <form onSubmit={handleScenarioSubmit} className={styles.form}>
        <input 
          type="text" 
          value={currentQuery} 
          onChange={(e) => setCurrentQuery(e.target.value)} 
          className={styles.input} 
          placeholder="e.g., What if revenue grows by another 10%?" 
          disabled={isSimulating} 
        />
        <button type="submit" className={styles.button} disabled={isSimulating}>
          {isSimulating ? '...' : 'Ask'}
        </button>
      </form>
    </div>
  );
}

export default Simulator;