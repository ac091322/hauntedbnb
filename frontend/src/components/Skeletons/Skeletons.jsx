import "./Skeletons.css";


const SkeletonLoader = ({ classes }) => {
  const classNames = `skeleton ${classes} animate-pulse`

  return (
    <div className={classNames}>

    </div>
  );
}


export default SkeletonLoader;
