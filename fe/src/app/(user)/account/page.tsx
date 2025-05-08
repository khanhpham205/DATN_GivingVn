import { Suspense } from 'react'
import Accountpage from './main'
import './Account.css';

export default function Account() {
  return (
    <Suspense>
      <Accountpage />
    </Suspense>
  )
}