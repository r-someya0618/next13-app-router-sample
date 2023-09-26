import NotesList from './components/notes-list'

// server component
export default function Home() {
  return (
    <main>
      <div className="m-10 text-center">
        Hello world
        <NotesList />
      </div>
    </main>
  )
}
