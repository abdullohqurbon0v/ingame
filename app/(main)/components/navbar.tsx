'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
      return (
            <div className={cn("fixed inset-0 h-16 bg-[#1a1a1a]")}>
                  <header className='flex justify-between items-center py-5 h-full max-w-[1200px] mx-auto text-white'>
                        <div>
                              <Link href="/" className='font-semibold text-xl'><span className='text-[#D3176D]'>InGame</span>.uz</Link>
                        </div>
                        <div className='flex items-center space-x-9'>
                              <Dialog>
                                    <DialogTrigger asChild>
                                          <Button variant={'ghost'}>Связаться</Button>
                                    </DialogTrigger>

                                    <DialogContent>
                                          <DialogTitle asChild>
                                                <p className='text-xl font-bold text-cen'><span className={'text-[#D3176D]'}>Оставьте заявку</span> и наш менеджер свяжется с вами</p>
                                          </DialogTitle>
                                          <DialogDescription></DialogDescription>
                                    </DialogContent>
                              </Dialog>
                              <Select>
                                    <SelectTrigger>
                                          <SelectValue placeholder={"Язык"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectItem value={"RU"}>RU</SelectItem>
                                                <SelectItem value={"UZ"}>UZ</SelectItem>
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>
                              <Select>
                                    <SelectTrigger>
                                          <SelectValue placeholder={"Валюта"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectItem value={"UZS"}>UZS</SelectItem>
                                                <SelectItem value={"USD"}>USD</SelectItem>
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>
                              <Search size={'105px'} className='cursor-pointer' />
                              <Link href="/card">
                                    <ShoppingCart size={'20px'} className='cursor-pointer' />
                              </Link>
                        </div>
                  </header>
            </div>
      )
}

export default Navbar
