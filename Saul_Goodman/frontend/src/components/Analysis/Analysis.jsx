import React, { useState } from 'react';
import styles from './Analysis.module.css';
// NEW: Import your second wallpaper for the banner
import heroBanner from '../../assets/wallpaper2.jpg';

function Analysis({ file, setFile, analysisResult, setAnalysisResult, setError, setActiveTab }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setAnalysisResult(null);
    setError('');
  };

  const handleAnalyzeClick = async () => {
    if (!file) { setError('Please select a file first.'); return; }
    setIsLoading(true);
    setError('');
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', { method: 'POST', body: formData });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const result = await response.json();
      setAnalysisResult(result);
    } catch (e) {
      setError('An error occurred during analysis. Check the backend console.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!analysisResult) return;
    setIsDownloading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/download_report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...analysisResult, filename: file.name }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Saul_Goodman_Detailed_Report_${file.name}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      setError('An error occurred during download. Check the backend console.');
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* NEW: The hero banner using wallpaper2.jpg */}
      <img src={heroBanner} alt="Saul Goodman banner" className={styles.heroBanner} />

      <div className={styles.uploaderSection}>
        <h2>Analysis Dashboard</h2>
        <p>Upload a company's annual report (PDF) to begin.</p>
        <label htmlFor="file-upload" className={styles.fileInputLabel}>
          {file ? `Selected: ${file.name}` : 'Choose Your Case File'}
        </label>
        <input id="file-upload" type="file" onChange={handleFileChange} accept=".pdf" className={styles.fileInput} />
        <div className={styles.buttonContainer}>
          <button onClick={handleAnalyzeClick} disabled={isLoading || isDownloading} className={styles.actionButton}>
            {isLoading ? 'Analyzing...' : 'Analyze Case File'}
          </button>
          {analysisResult && !isLoading && (
            <button onClick={handleDownload} disabled={isDownloading} className={`${styles.actionButton} ${styles.downloadButton}`}>
              {isDownloading ? 'Generating...' : 'Download Detailed Report'}
            </button>
          )}
        </div>
      </div>

      {isLoading && <p className={styles.loadingMessage}>Saul is convening the expert panel...</p>}
      
      {analysisResult && !isLoading && (
        <div className={styles.resultsContainer}>
          <div className={styles.successMessage} onClick={() => setActiveTab('simulator')} style={{cursor: 'pointer'}}>
            Analysis Complete! You can now use the other tabs.
          </div>
          <h3>Boardroom Interrogation:</h3>
          <div className={styles.chatContainer}>
            {analysisResult.debate.map((msg, index) => (
              <div key={index} className={styles.chatBubble}>{msg}</div>
            ))}
          </div>
          <div className={styles.summary}>
            <h3>Final Verdict for {analysisResult.company_name}:</h3>
            <pre className={styles.preTag}>{analysisResult.final_summary}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
export default Analysis;