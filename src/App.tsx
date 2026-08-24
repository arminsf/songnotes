import './App.css'
import { Editor } from './Editor'
import { useEditorStore } from './store/editor-store';
import { Welcome } from './Welcome';

function App() {
  const editorOpen = useEditorStore((state) => state.editorOpen);

  return (
    <div className="w-screen h-screen p-1">
      { editorOpen ?
        <Editor /> : <Welcome />
      }
    </div>
  )
}

export default App
