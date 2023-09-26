import type { Database } from '../../database.types'
import { format } from 'date-fns'

type Note = Database['public']['Tables']['notes']['Row']

async function fetchNotes() {
  // 非同期をわかりやすくするために意図的に遅らせている
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`${process.env.url}/rest/v1/notes?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    // ↓cacheオプション: defaultはforce-cacheでgetStaticPropsと同じ挙動
    // cache: 'no-store', getServerSidePropsと同じ
    // ↓ISRの場合
    next: { revalidate: 10 },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in server')
  }
  const notes: Note[] = await res.json()
  return notes
}

// server componentはコンポーネントレベルでasync/awaitできるので、useEffectなどしなくても
// data fetchingなどが簡潔に書ける
export default async function NotesList() {
  const notes = await fetchNotes()
  return (
    <div>
      <p className="my-4 pb-3 text-xl font-medium underline underline-offset-4">
        Notes
      </p>
      <ul className="m-3">
        {notes.map((note) => (
          <li key={note.id}>
            <p>{note.title}</p>
            <p>
              <strong className="mr-3">Created at:</strong>
              {note && format(new Date(note.created_at), 'yyyy-MM-dd HH:mm:ss')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
