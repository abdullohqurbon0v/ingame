'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
      Sheet,
      SheetContent,
      SheetDescription,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
} from "@/components/ui/sheet"
import {
      Menubar,
      MenubarContent,
      MenubarItem,
      MenubarMenu,
      MenubarSeparator,
      MenubarShortcut,
      MenubarTrigger,
} from "@/components/ui/menubar"

const Navbar = () => {
      return (
            <div className={cn("fixed inset-0 h-16 bg-[#1a1a1a]")}>
                  <header className='flex justify-between items-center py-5 h-full max-w-[1200px] mx-auto text-white'>
                        <div>
                              <Link href="/" className='font-semibold text-xl'><span className='text-[#D3176D]'>InGame</span>.uz</Link>
                        </div>
                        <Menubar>
                              <MenubarMenu>
                                    <MenubarTrigger >Продукция</MenubarTrigger>
                                    <MenubarContent>
                                          <MenubarItem>
                                                Игровые ПК
                                          </MenubarItem>
                                          <MenubarSeparator />
                                          <MenubarItem>Ноутбуки</MenubarItem>
                                          <MenubarSeparator />
                                          <MenubarItem>Аксесуары</MenubarItem>
                                          <MenubarSeparator />
                                          <MenubarItem>Гарнитуры</MenubarItem>
                                          <MenubarSeparator />
                                          <MenubarItem>Столы, кресла</MenubarItem>
                                          <MenubarSeparator />
                                          <MenubarItem>Комплектующие</MenubarItem>
                                    </MenubarContent>
                              </MenubarMenu>
                              <MenubarMenu>
                                    <MenubarTrigger>Услуги</MenubarTrigger>
                                    <MenubarContent>
                                          <MenubarItem>
                                                Оптимальные
                                          </MenubarItem>
                                          <MenubarItem>Мощные</MenubarItem>
                                          <MenubarSeparator />
                                          <MenubarItem>Кастомные</MenubarItem>
                                          <MenubarSeparator />
                                          <MenubarItem>Специальные</MenubarItem>
                                    </MenubarContent>
                              </MenubarMenu>
                        </Menubar>
                        <div className='flex items-center space-x-9'>
                              <Dialog>
                                    <DialogTrigger asChild className='hidden sm:block'>
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
                                    <SelectTrigger className='hidden sm:block'>
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
                                    <SelectTrigger className='hidden sm:block'>
                                          <SelectValue placeholder={"Валюта"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectItem value={"UZS"}>UZS</SelectItem>
                                                <SelectItem value={"USD"}>USD</SelectItem>
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>
                              <Input type='search' placeholder='Search...' className='hidden sm:block' />
                              <Link href="/card" className='hidden sm:block'>
                                    <ShoppingCart size={'20px'} className='cursor-pointer' />
                              </Link>
                        </div>
                        <Sheet>
                              <SheetTrigger asChild>
                                    <button className='block sm:hidden mr-4'><Menu /></button>
                              </SheetTrigger>

                              <SheetContent>
                                    <SheetHeader>
                                          <SheetTitle>Are you absolutely sure?</SheetTitle>
                                          <SheetDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                          </SheetDescription>
                                    </SheetHeader>
                              </SheetContent>
                        </Sheet>
                  </header >
            </div >
      )
}

export default Navbar
