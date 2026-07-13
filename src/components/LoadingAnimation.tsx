import React from 'react';
import Image from 'next/image';
import styles from './LoadingAnimation.module.css';

interface LoadingAnimationProps {
  logoSrc?: string;
  label?: string;
  size?: number;
  fullScreen?: boolean;
}

export default function LoadingAnimation({
  logoSrc = '/Hirloye_favicon.png',
  label = 'Loading',
  size = 96,
  fullScreen = false,
}: LoadingAnimationProps) {
  return (
    <div className={`${styles.container} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.animationWrapper} style={{ width: size, height: size }}>
        {/* Outer gradient ring */}
        <div className={styles.outerRing}></div>
        
        {/* Inner dashed ring */}
        <div className={styles.innerRing}></div>
        
        {/* Orbiting dots */}
        <div className={styles.orbit}>
          <div className={`${styles.dot} ${styles.dot1}`}></div>
          <div className={`${styles.dot} ${styles.dot2}`}></div>
          <div className={`${styles.dot} ${styles.dot3}`}></div>
        </div>
        
        {/* Pulsing logo */}
        <Image
          src={logoSrc}
          alt="Loading..."
          width={size}
          height={size}
          className={styles.logo}
          priority
        />
      </div>
      
      {label && <div className={styles.label}>{label}</div>}
    </div>
  );
}
