import { Suspense } from 'react'
import Accountpage from './main'
 
export default function Account() {
  return (
    <Suspense>
      <Accountpage />
    </Suspense>
  )
}