import React from 'react'
import Pagination from '../issues/view/_components/Pagination'
const Dashboard = () => {
  return (
<div>
    <Pagination itemCount={100} pageSize={10} currentPage={2}/>
    </div>
  )
}

export default Dashboard