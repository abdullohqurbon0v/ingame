import React from 'react'
import Navbar from './components/navbar'
import { ChildProps } from '@/types'

const MainLayout = ({ children }: ChildProps) => {
      return (
            <div className='font-orbitron bg-black'>
                  <Navbar />
                  <main>
                        {children}
                  </main>
            </div>
      )
}

export default MainLayout
