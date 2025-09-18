// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Header.module.css';

// function Header({ activeTab, setActiveTab, analysisDone }) {
//   const tabs = ['analysis', 'simulator', 'benchmark'];
//   const tabNames = {
//     analysis: 'Analysis Dashboard',
//     simulator: 'Scenario Simulator',
//     benchmark: 'Market View'
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.logo}>
//         ⚖️ Saul Goodman
//       </div>
//       <nav className={styles.nav}>
//         <Link to="/" className={styles.navLink}>
//           Home
//         </Link>
//         {tabs.map(tab => (
//           <button
//             key={tab}
//             className={activeTab === tab ? `${styles.tab} ${styles.active}` : styles.tab}
//             onClick={() => setActiveTab(tab)}
//             disabled={tab !== 'analysis' && !analysisDone}
//           >
//             {tabNames[tab]}
//           </button>
//         ))}
//       </nav>
//     </header>
//   );
// }

// export default Header;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Header.module.css';

// function Header({ activeTab, setActiveTab, analysisDone }) {
//   const tabs = ['analysis', 'simulator', 'benchmark'];
//   const tabNames = {
//     analysis: 'Analysis Dashboard',
//     simulator: 'Scenario Simulator',
//     benchmark: 'Market View'
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.logo}>
//         ⚖️ Saul Goodman
//       </div>
//       <nav className={styles.nav}>
//         <Link to="/" className={styles.navLink}>
//           Home
//         </Link>
//         {tabs.map(tab => (
//           <Link
//             key={tab}
//             to={`/dashboard?tab=${tab}`} // MODIFIED: Use Link to navigate to the dashboard
//             className={activeTab === tab ? `${styles.tab} ${styles.active}` : styles.tab}
//             onClick={() => setActiveTab(tab)}
//             disabled={tab !== 'analysis' && !analysisDone}
//           >
//             {tabNames[tab]}
//           </Link>
//         ))}
//       </nav>
//     </header>
//   );
// }

// export default Header;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

function Header({ activeTab, setActiveTab, analysisDone }) {
  const location = useLocation();
  const tabs = ['analysis', 'simulator', 'benchmark'];
  const tabNames = {
    analysis: 'Analysis Dashboard',
    simulator: 'Scenario Simulator',
    benchmark: 'Market View'
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        ⚖️ Saul Goodman
      </div>
      <nav className={styles.nav}>
        <Link
          to="/"
          className={location.pathname === '/' ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={location.pathname === '/about' ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          About
        </Link>
        {tabs.map(tab => (
          <Link
            key={tab}
            to={`/dashboard?tab=${tab}`}
            className={
              activeTab === tab
                ? `${styles.tab} ${styles.active}`
                : `${styles.tab} ${!analysisDone && tab !== 'analysis' ? styles.disabled : ''}`
            }
          >
            {tabNames[tab]}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;