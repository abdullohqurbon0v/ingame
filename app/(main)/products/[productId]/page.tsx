import React from 'react'
import image from '@/public/bignaushnik.png'
import Image from 'next/image'
import mikro from '@/public/mikrofon.png'
import { Heart, User } from 'lucide-react'
import Link from 'next/link'

const productData = {
      productImage: image,
      images: [image, image, image],
      title: "Название продукции",
      model: "Название модели",
      totalRates: 1323,
      description: "Ноутбук  – мощный мобильный компьютер, который с лёгкостью справится не только с самыми свежими новинками из мира игр. ",
      price: "25 550 000",
}

const productsInProduct = [
      {
            image: mikro,
            label: "Название",
            price: "4 500 000"
      },
      {
            image: mikro,
            label: "Название",
            price: "4 500 000"
      },
      {
            image: mikro,
            label: "Название",
            price: "4 500 000"
      },
]

const comments = [
      {
            name: "имя пользователя",
            comment: "съешь же ещё этих мягких французских булок, да выпей чаю съешь же ещё этих мягких французских булок, д"
      }, {
            name: "имя пользователя",
            comment: "съешь же ещё этих мягких французских булок, да выпей чаю съешь же ещё этих мягких французских булок, д"
      }, {
            name: "имя пользователя",
            comment: "съешь же ещё этих мягких французских булок, да выпей чаю съешь же ещё этих мягких французских булок, д"
      }
]

const SingleProductPage = () => {
      return (
            <div className='mt-16 font-sans bg-black min-h-screen '>
                  <div className='bg-[#1A1A1A] py-20'>
                        <div className='max-w-[1200px] mx-auto flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-20'>
                              <div className='flex flex-wrap justify-center lg:flex-col lg:space-y-5 lg:items-center space-x-5 lg:space-x-0'>
                                    {productData.images.map((item, idx) => (
                                          <Image src={item} alt={'fdsdsf'} className='bg-[#404040] border border-[#D3176D]' key={idx} width={100} height={100} />
                                    ))}
                              </div>
                              <Image src={productData.productImage} alt={productData.title} width={400} height={400} className='mx-auto' />
                              <div className='text-white flex flex-col space-y-3'>
                                    <p className='text-2xl font-semibold'>{productData.title}</p>
                                    <p>{productData.model}</p>
                                    <p>( {productData.totalRates} отзывов )</p>
                                    <p>{productData.description}</p>
                                    <p>{productData.price} Сум</p>
                                    <div className='flex space-x-5'>
                                          <button className='bg-[#D3176D] border border-[#D3176D] px-5 py-1 text-sm'>Купить</button>
                                          <button className=' border border-[#D3176D] px-5 py-1 text-sm'>В Корзину</button>
                                    </div>
                              </div>
                        </div>
                        <div className='max-w-[1200px] mx-auto mt-20'>
                              <h2 className='text-white text-3xl font-semibold mb-10 text-center'>Похожие товары</h2>
                              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                                    {productsInProduct.map((item, idx) => (
                                          <div key={idx} className='relative flex flex-col justify-between cursor-pointer bg-[#1E1E1E] shadow-sm shadow-slate-700 p-5 text-white space-y-5 rounded-lg'>
                                                <Heart className='absolute top-5 right-5' />
                                                <Link href={'/'}>
                                                      <Image src={item.image} alt={item.label} width={150} height={200} className='mx-auto' />
                                                </Link>
                                                <div className='text-center'>
                                                      <p className='text-sm text-slate-500'>{item.label}</p>
                                                      <p className='text-xl font-semibold'>{item.price} сум</p>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </div>
                  <div className='max-w-[1200px] mx-auto text-white flex flex-col space-y-7'>
                        <h2 className='text-4xl font-bold text-center mt-16'>Отзывы наших клиентов</h2>
                        <p className='text-center'>Об этом лучше всего расскажут сами наши клиенты!</p>
                        <div className='flex flex-col md:flex-row gap-10 overflow-x-auto py-5'>
                              {comments.map((item, idx) => (
                                    <div className='border border-[#D3176D] bg-[#1E1E1E] rounded-lg py-5 px-8 w-full md:w-[400px] flex flex-col space-y-4 shadow-md' key={idx}>
                                          <div className='flex items-center space-x-3'>
                                                <div className='border-4 border-[#D3176D] p-3 rounded-full'>
                                                      <User size={30} className='text-white' />
                                                </div>
                                                <p className='font-semibold text-lg'>{item.name}</p>
                                          </div>
                                          <p className='text-gray-300'>{item.comment}</p>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      )
}

export default SingleProductPage