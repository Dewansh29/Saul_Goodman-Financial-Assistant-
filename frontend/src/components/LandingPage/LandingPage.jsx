// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './LandingPage.module.css';

// function LandingPage() {
//   const navigate = useNavigate();

//   const enterSite = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <>
//       <header className={styles.header}>
//         <div className={styles.logo}>⚖️ Saul Goodman</div>
//         <nav className={styles.nav}>
//           <a href="/" className={styles.navLink}>Home</a>
//         </nav>
//       </header>
//       <div className={styles.landingContainer}>
//         <h1>Welcome to Saul Goodman Financial Analysis</h1>
//         <button className={styles.enterButton} onClick={enterSite}>
//           Enter Site
//         </button>
//       </div>
//     </>
//   );
// }

// export default LandingPage;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './LandingPage.module.css';
// import Header from '../Header/Header'; // NEW: Import the main Header component

// function LandingPage() {
//   const navigate = useNavigate();

//   const enterSite = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <>
//       <Header // NEW: Use the main Header component
//         activeTab="analysis" // Set an active tab for display purposes
//         setActiveTab={() => {}} // Provide a dummy function since tab changes are not needed here
//         analysisDone={false} // Tabs will be disabled as no analysis has been done
//       />
//       <div className={styles.landingContainer}>
//         <h1>Welcome to Saul Goodman Financial Analysis</h1>
//         <button className={styles.enterButton} onClick={enterSite}>
//           Enter Site
//         </button>
//       </div>
//     </>
//   );
// }

// export default LandingPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Header from '../Header/Header';

function LandingPage() {
  const navigate = useNavigate();

  const enterSite = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Header
        activeTab="home" // MODIFIED: Set activeTab to 'home'
        setActiveTab={() => {}}
        analysisDone={false}
      />
      <div className={styles.landingContainer}>
        <h1>Welcome to Saul Goodman Financial Analysis</h1>
        <button className={styles.enterButton} onClick={enterSite}>
          Enter Site
        </button>
      </div>
    </>
  );
}

export default LandingPage;