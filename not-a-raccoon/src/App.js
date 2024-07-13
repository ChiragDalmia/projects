import Spline from "@splinetool/react-spline";
import "./App.css";

function App() {
  return (
    <div className="App-header">
      <img src="beaver.png" alt="Beaver" />
      <div className="spline-container">
        <Spline scene="https://prod.spline.design/mMrP3wtYxgVvmqQl/scene.splinecode" />
      </div>
    </div>
  );
}

export default App;
