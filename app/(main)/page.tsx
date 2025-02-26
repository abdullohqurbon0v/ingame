import { arrays, news } from '@/constants'
import Image from 'next/image'
import React from 'react'
import Categories from './components/categories'
import pk from '@/public/pks.png'
import Computers from './components/computers'
import News from './components/news'
const data = [
      {
            id: 1,
            image: pk,
            label: "Оптимальные",
            desc: "Сбалансированные  игровые ПК",
            processor: "Название",
            videoCart: "Название",
            colding: "Название",
            memory: "название",
            price: 5000000,
            onMonth: 400000,
      }, {
            id: 2,
            image: pk,
            label: "Оптимальные",
            desc: "Сбалансированные  игровые ПК",
            processor: "Название",
            videoCart: "Название",
            colding: "Название",
            memory: "название",
            price: 5000000,
            onMonth: 400000,
      }, {
            id: 3,
            image: pk,
            label: "Оптимальные",
            desc: "Сбалансированные  игровые ПК",
            processor: "Название",
            videoCart: "Название",
            colding: "Название",
            memory: "название",
            price: 5000000,
            onMonth: 400000,
      }
]

const MainPage = () => {
      return (
            <main className='mt-16 text-white'>
                  <div className='max-w-[1200px] mx-auto flex justify-between py-64'>
                        <div className='w-[700px] flex flex-col items-start space-y-5'>
                              <div>
                                    <h1 className='text-5xl font-semibold mb-2'>NVIDIA RTX SUPER</h1>
                                    <p>Новые игровые видеокарты NVIDIA GeForce  RTX 4070 Super, 4070 Ti и 4080 доступны к заказу! Будь среди первых и протестируй новые возможности
                                    </p>
                              </div>
                              <p>Будь среди первых и протестируй новые возможности</p>
                              <button className='px-5 py-3 border border-[#D3176D]'>Подробнее</button>
                        </div>
                        <Image src="https://e7.pngegg.com/pngimages/961/904/png-clipart-emoji-video-game-sms-games-game-sticker.png" alt="Banner image" width={400} height={400} />
                  </div>
                  <div className='bg-[#0F0F0F]'>
                        <div className='max-w-[1200px] text-center mx-auto py-16'>
                              <h2 className='text-3xl mb-2'>КАТАЛОГ  INGAME.UZ</h2>
                              <p>Выберите себе в каталоге  для максимально комфортной игры</p>
                              <div className='grid grid-cols-4'>
                                    {arrays.map((item) => (
                                          <Categories key={item.query} item={item} />
                                    )
                                    )}
                              </div>
                        </div>
                  </div>

                  <div className='bg-[#1A1A1A]'>
                        <div className='max-w-[1200px] mx-auto py-16'>
                              <h1 className='text-3xl font-bold'>Наши ПК</h1>
                              <div className='grid grid-cols-3 gap-10 mt-12 px-12'>
                                    {data.map(item => (
                                          <Computers key={item.id} item={item} />
                                    ))}
                              </div>
                        </div>
                  </div>
                  <div className='bg-[#1A1A1A]'>
                        <div className='max-w-[1200px] mx-auto py-16'>
                              <h1 className='text-3xl font-bold'>Новинки</h1>
                              <div className='grid grid-cols-3 gap-10 mt-12 px-12'>
                                    {news.map((item, idx) => (
                                          <News key={idx} item={item} />
                                    ))}
                              </div>
                        </div>
                  </div>
            </main>
      )
}

export default MainPage
