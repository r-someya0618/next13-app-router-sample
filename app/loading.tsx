import Spinner from './components/spinner'

// layout.tsxの内側でSuspenseでpage.tsxをラップする形で適用される
// <layout>
//  <Suspense fallback={<Loading />}>
//  <Page />
// </Suspense >
// </layout >
export default function Loading() {
  return <Spinner />
}
