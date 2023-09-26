// clientコンポーネント化 ※serverで発生したエラーはclient側で対応する必要がある
'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <p className="mt-6 text-center text-red-500">
        Data fetching in server failed
      </p>
    </div>
  )
}
