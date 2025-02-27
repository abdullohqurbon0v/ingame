'use client'
import React, { useEffect, useState } from 'react'
import Product from '../../components/product'
import { data } from '@/constants'
import { Input } from '@/components/ui/input'

interface CategoryParams {
      params: {
            name: string
      }
}

const data = [
      {
            label: "GIGABYTE Aorus",
            checked: false
      },

]

const Category = ({ params }: CategoryParams) => {
      const [param, setParam] = useState('')
      useEffect(() => {
            const getParams = async () => {
                  const name = await Promise.resolve(params)
                  setParam(name.name)
            }
            getParams()
      }, [])
      return (
            <div className='bg-[#1A1A1A]'>
                  <div className='max-w-[1200px] mx-auto flex space-x-10 pt-40 text-white'>
                        <aside className='w-1/3 mt-10'>
                              <div className='space-y-5'>
                                    <p>Цена</p>
                                    <form className='flex space-x-5'>
                                          <Input type={"number"} />
                                          <Input type={"number"} />
                                    </form>
                              </div>
                              <div>
                                    <p>Бренды</p>
                              </div>
                        </aside>
                        <div>
                              <h1 className='text-3xl font-semibold mb-7'>Игровые ПК</h1>
                              <div className='grid grid-cols-3 gap-5'>
                                    {data.map((item, idx) => (
                                          <Product key={idx} item={item} />
                                    ))}
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default Category
