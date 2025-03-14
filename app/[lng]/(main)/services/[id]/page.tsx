'use client'

import { $axios } from '@/http/api'
import { ServiceType } from '@/types'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loading from '../../components/loading'

const page = () => {
    const {id, lng} = useParams<{id: string, lng: string}>()
    const [service, setService] = useState<ServiceType | null>(null)

    useEffect(() => {
        const getService = async() => {
            const res = await $axios.get(`/service/${id}`)
            setService(res.data)
            console.log(res)
        }
        getService()
    })


    if(!service) {
        return <Loading/>
    }
  return (
     <div className="min-h-screen mt-16 bg-[#0F0F0F] text-white py-20 px-4">
          <div className="max-w-[800px] mx-auto">
            <h1 className="text-4xl font-bold mb-4">{lng == 'uz' ? service?.name_uz : service?.name_ru}</h1>
            <Image
              src={service.image}
              alt={service.name_ru}
              width={800}
              height={400}
              className="rounded-xl mb-8 object-cover w-full h-[400px]"
            />
            <p className="text-lg leading-7 text-gray-200">{lng == 'uz' ? service.description_uz : service.description_ru}</p>
          </div>
        </div>
  )
}

export default page
