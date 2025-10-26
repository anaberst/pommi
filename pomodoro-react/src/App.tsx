import Controls from "./components/Controls";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  return (
    <>
      <h2
        className="container d-flex justify-content-center align-items-center"
        style={{ color: "Grey", minHeight: "20vh" }}
      >
        Pomodoro Timer
      </h2>
      <div className="d-flex justify-content-center gap-3">
        <Controls color="success">
          <i className="bi bi-caret-right"></i>
          Start
        </Controls>
        <Controls color="light">
          {" "}
          <i className="bi bi-arrow-counterclockwise"></i> Restart{" "}
        </Controls>
      </div>
    </>
  );
};

export default App;

// "success" | "info" | "light" | "danger" | "secondary";
// start | pause | restart | yes, I'm sure | go back
