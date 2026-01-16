import React from 'react'
import StatsGrid from './StatsGrid'
import CustomerInput from '../../components/CustomerInput'

const Dashboard = () => {
  return (
    <div className='space-y-6'>
      <StatsGrid/>
      <CustomerInput type={`text`} label={`email`} i_class={`py-2 bg-white border border-gray-300 rounded-xl px-2 focus:outline-none focus:ring focus:ring-2 focus:ring-[var(--color-fdaa3d)]`}/>
    </div>
  )
}

export default Dashboard