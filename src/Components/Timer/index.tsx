import React from 'react';
import { secondsToMinutes } from '../../Utils/seconds-to-minutes';
import styles from './styles.module.css';

interface Props {
  mainTime: number;
}

export default function Timer(props: Props): JSX.Element {
  return <div className={styles.timer}>{secondsToMinutes(props.mainTime)}</div>;
}
