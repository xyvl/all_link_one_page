import styles from './spinner.module.scss'

export const Spinner = () => {
	return (
		<div className={styles.main}>
      <div
        className={styles.inner}
      >
        <div className={styles.spinner}></div>
      </div>
    </div>
	)
}
