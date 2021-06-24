import React, { useEffect, useState, useCallback } from 'react';
import useInterval from '../../Hooks/use-interval';

import Timer from '../Timer';
import Button from '../Button';
import { secondsToTime } from '../../Utils/seconds-to-time';

import styles from './styles.module.css';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export default function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    new Audio('/bell-finish.mp3').play();
  }, [
    setTimeCounting,
    setWorking,
    setResting,
    setMainTime,
    props.pomodoroTime,
  ]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }

      new Audio('/bell-start.mp3').play();
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      props.longRestTime,
      props.shortRestTime,
    ],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCyclesQtdManager,
    configureWork,
    props.cycles,
  ]);

  return (
    <div className={styles.pomodoro__wrapper}>
      <h2>You are: {working ? 'Working' : 'Resting'}</h2>

      <Timer mainTime={mainTime} />

      <div className={styles.controls}>
        <Button onClick={() => configureWork()} text="Work"></Button>
        <Button onClick={() => configureRest(false)} text="Rest"></Button>
        <Button
          className={!working && !resting ? styles.hidden : ''}
          onClick={() => setTimeCounting(!timeCounting)}
          text={timeCounting ? 'Pause' : 'Play'}
        ></Button>
      </div>

      <div className={styles.details}>
        <p>Completed cycles: {completedCycles}</p>
        <p>Worked hours: {secondsToTime(fullWorkingTime)}</p>
        <p>Completed Pomodoros: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
