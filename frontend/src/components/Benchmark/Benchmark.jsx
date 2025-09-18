import React, { useState, useEffect } from 'react';
import styles from './Benchmark.module.css';

function Benchmark({ analysisResult, setError }) {
  const [benchmarkResult, setBenchmarkResult] = useState('');
  const [isBenchmarking, setIsBenchmarking] = useState(false);

  const handleBenchmarkClick = async () => {
    if (!analysisResult || benchmarkResult) return;
    
    setIsBenchmarking(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: analysisResult.company_name,
          cleaned_data: analysisResult.cleaned_data,
        }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const result = await response.json();
      setBenchmarkResult(result.response);
    } catch (e) {
      setError('An error occurred during benchmark analysis. Check the backend console.');
      console.error(e);
    } finally {
      setIsBenchmarking(false);
    }
  };

  useEffect(() => {
    handleBenchmarkClick();
  }, [analysisResult]);

  return (
    <div className={styles.container}>
      <h2>Market & Sector Benchmarking for {analysisResult.company_name}</h2>
      <p>Comparing performance against industry averages.</p>
      
      {isBenchmarking && <p className={styles.loadingMessage}>Running benchmark analysis...</p>}

      {benchmarkResult && (
        <div className={styles.resultContainer}>
          <pre className={styles.preTag}>{benchmarkResult}</pre>
        </div>
      )}
    </div>
  );
}

export default Benchmark;