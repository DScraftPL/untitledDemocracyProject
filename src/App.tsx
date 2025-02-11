import HelldiverPanel from "./HelldiverPanel";

function App() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <div><h1 className="text-white text-3xl p-4">This is a demo</h1></div>
      <HelldiverPanel />
      <div className="text-white text-3xl p-4">
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
