import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface NewsTypes {
      item: {
            image: StaticImageData,
            title: string,
            oldPrice: string,
            price: string,
            description: string
      }
}

const News = ({ item }: NewsTypes) => {
      return (
            <div className='bg-[#1E1E1E] font-sans pt-16 flex flex-col space-y-3 shadow-xl rounded-xl px-5 pb-5'>
                  <Image src={item.image} alt={item.title} width={200} height={200} className='mx-auto' />
                  <p className='text-xl'>{item.title}</p>
                  <div>
                        <p className='line-through'>{item.oldPrice} сум</p>
                        <p className='text-[#D3176D]'>{item.price} сум</p>
                  </div>
                  <p>{item.description}</p>
                  <div className='flex items-center space-x-2 justify-start'>
                        <button className='px-5 py-1 border text-sm'>Подробнее</button>
                        <button className='bg-[#D3176D] border border-[#D3176D] px-5 py-1 text-sm'>Купить</button>
                        <Button variant={'ghost'} className='hover:bg-transparent hover:text-white' size={'icon'}>
                              <ShoppingCart />
                        </Button>
                  </div>
            </div>
      )
}

export default News
