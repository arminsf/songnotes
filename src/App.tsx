import { Editor } from './Editor'
import { useEditorStore } from './store/editor-store';
import { Welcome } from './Welcome';

function App() {
  const editorOpen = useEditorStore((state) => state.editorOpen);

  return (
    <div className="w-screen h-screen p-3 bg-background text-text">
      { editorOpen ?
        <Editor /> : <Welcome />
      }
    </div>
  )
}

export default App
