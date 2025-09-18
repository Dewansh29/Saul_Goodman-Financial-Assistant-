// import React, { useState } from 'react';
// import styles from './App.module.css';
// import Header from './components/Header/Header';
// import Analysis from './components/Analysis/Analysis';
// import Simulator from './components/Simulator/Simulator';
// import Benchmark from './components/Benchmark/Benchmark';

// function App() {
//   const [activeTab, setActiveTab] = useState('analysis');
//   const [file, setFile] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [error, setError] = useState('');

//   return (
//     <div className={styles.mainApp}>
//       <Header
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         analysisDone={!!analysisResult}
//       />
//       <main className={styles.content}>
//         {error && <div className={styles.error}>{error}</div>}

//         {activeTab === 'analysis' && (
//           <Analysis
//             file={file}
//             setFile={setFile}
//             analysisResult={analysisResult}
//             setAnalysisResult={setAnalysisResult}
//             setError={setError}
//             setActiveTab={setActiveTab}
//           />
//         )}

//         {activeTab === 'simulator' && analysisResult && (
//           <Simulator analysisResult={analysisResult} setError={setError} />
//         )}

//         {activeTab === 'benchmark' && analysisResult && (
//           <Benchmark analysisResult={analysisResult} setError={setError} />
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // NEW: Import useSearchParams
import styles from './App.module.css';
import Header from './components/Header/Header';
import Analysis from './components/Analysis/Analysis';
import Simulator from './components/Simulator/Simulator';
import Benchmark from './components/Benchmark/Benchmark';

function App() {
  const [searchParams] = useSearchParams(); // NEW: Get URL search params
  const [activeTab, setActiveTab] = useState('analysis');
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { // NEW: Update activeTab based on URL
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && ['analysis', 'simulator', 'benchmark'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  return (
    <div className={styles.mainApp}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        analysisDone={!!analysisResult}
      />
      <main className={styles.content}>
        {error && <div className={styles.error}>{error}</div>}

        {activeTab === 'analysis' && (
          <Analysis
            file={file}
            setFile={setFile}
            analysisResult={analysisResult}
            setAnalysisResult={setAnalysisResult}
            setError={setError}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'simulator' && analysisResult && (
          <Simulator analysisResult={analysisResult} setError={setError} />
        )}

        {activeTab === 'benchmark' && analysisResult && (
          <Benchmark analysisResult={analysisResult} setError={setError} />
        )}
      </main>
    </div>
  );
}

export default App;