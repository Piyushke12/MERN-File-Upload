import './App.css';
import {Upload} from './FileUploadComponent/Upload';
import {Retrieve} from './RetrieveFileComponent/Retrieve';

function App() {
  return (
    <div className="App">
      <Upload/>
      <Retrieve/>
    </div>
  );
}

export default App;
