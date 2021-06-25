import React from 'react';
import PomodoroTimer from './Components/PomodoroTimer';

import { Header } from './Components/Header';

import styles from './styles/app.module.css';

function App(): JSX.Element {
  return (
    <div className={styles.container}>
      <Header className={styles.header__wrapper}>
        <h1>Pomodoro App</h1>
        <img className={styles.tomateLogo} src="/tomate-logo.png" alt="" />
      </Header>
      <PomodoroTimer
        pomodoroTime={1500} // 25min
        shortRestTime={300} // 5min - For each pomodoro one shortRestTime
        longRestTime={900} // 15min
        cycles={4} // For each end of cycle one longRestTime
      />
    </div>
  );
}

export default App;
