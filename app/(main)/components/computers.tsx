import { Cctv, Cpu, MemoryStick } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import React from 'react'


interface ComputersTypes {
      item: {
            id: number,
            image: StaticImageData,
            label: string,
            desc: string,
            processor: string,
            videoCart: string,
            colding: string,
            memory: string,
            price: number,
            onMonth: number
      }
}

const Computers = ({ item }: ComputersTypes) => {
      return (
            <div className='bg-[#1E1E1E] pt-16 flex flex-col space-y-6 px-5 pb-10  shadow-xl rounded-xl'>
                  <Image src={item.image} alt={item.label} width={200} height={200} className='mx-auto' />
                  <div className='flex  justify-between items-start border-b-2 pb-4 border-gray-500'>
                        <p className='font-sans bg-[#D3176D] px-1 rounded-full cursor-pointer'>12 комплекции</p>
                        <div className='flex flex-col items-end space-y-2'>
                              <button className='px-1 py-2 border text-sm border-[#D3176D]'>от {item.price} Сум</button>
                              <p className='text-[14px] font-sans'>~ {item.onMonth} сум/мес</p>
                        </div>
                  </div>
                  <div className='flex flex-col space-y-2'>
                        <p className='text-[#D3176D]'>Оптимальные</p>
                        <p className='text-xs'>Сбалансированные  игровые ПК</p>
                  </div>
                  <div className='flex items-center space-x-2'>
                        <Cpu />
                        <div>
                              <p className='text-[10px] text-slate-500'>Процессор</p>
                              <p className='text-xs'>{item.processor}</p>
                        </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                        <MemoryStick />
                        <div>
                              <p className='text-[10px] text-slate-500'>Видеокарты</p>
                              <p className='text-xs'>{item.processor}</p>
                        </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                        <Cctv />
                        <div>
                              <p className='text-[10px] text-slate-500'>Память</p>
                              <p className='text-xs'>{item.processor}</p>
                        </div>
                  </div>
                  <div className='flex space-x-5'>
                        <button className='px-5 py-1 border  text-sm'>Подробнее</button>
                        <button className='px-5 py-1 border border-[#D3176D] text-sm'>Купить</button>
                  </div>
            </div>
      )
}

export default Computers
