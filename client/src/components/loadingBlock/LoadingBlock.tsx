import styles from './loadingBlock.module.scss'

export const LoadingBlock = () => {
	return (
		<div className="wrapper">
      <div
        className={styles.inner}
      >
        <div className={styles.spinner}></div>
      </div>
    </div>
	)
}
