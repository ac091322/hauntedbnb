import { ImSpinner3 } from "react-icons/im";


const Loader = () => {
  return (<div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--palette2)"
  }}>
    <span>Loading</span>
    <ImSpinner3 style={{ fontSize: "5em", }} />
  </div>)
};


export default Loader;
