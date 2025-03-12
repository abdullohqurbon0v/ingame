"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Products from "./navbar/products";
import { useRouter } from "next/navigation";
import ProductsAccordion from "./mobile-accordions";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const onSearchProducts = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?query=${search}`);
  };

  return (
    <div
      className={cn("fixed inset-x-0 top-0 h-16 bg-[#1a1a1a] shadow-md z-50")}
    >
      <header className="flex justify-between items-center px-6 h-full max-w-[1200px] mx-auto text-white">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="font-bold text-xl tracking-wide hover:text-[#D3176D] transition-colors"
          >
            <span className="text-[#D3176D]">OutGame</span>.uz
          </Link>
          <Products />
          <Link
            href="/brands"
            className="text-sm hidden sm:block hover:text-[#D3176D] transition-colors"
          >
            О бренде
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="hidden sm:block text-sm hover:text-[#D3176D] transition-colors"
              >
                Связаться
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] text-center space-y-4">
              <DialogTitle>
                <p className="text-xl font-bold">
                  <span className="text-[#D3176D]">Оставьте заявку</span> <br />
                  и наш менеджер свяжется с вами
                </p>
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Мы ответим в течение рабочего дня.
              </DialogDescription>

              {/* Форма */}
              <form className="space-y-4 text-left">
                <div className="space-y-1">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-white"
                  >
                    Полное имя
                  </label>
                  <Input
                    id="fullName"
                    placeholder="Иван Иванов"
                    className="bg-[#2a2a2a] text-white border-none focus:ring-1 focus:ring-[#D3176D]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-white"
                  >
                    Номер телефона
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    className="bg-[#2a2a2a] text-white border-none focus:ring-1 focus:ring-[#D3176D]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#D3176D] text-white hover:bg-[#b2145a] transition-colors"
                >
                  Отправить
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Select>
            <SelectTrigger className="hidden sm:flex w-[100px] text-sm">
              <SelectValue placeholder="RU" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="RU">RU</SelectItem>
                <SelectItem value="UZ">UZ</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Currency Selector */}
          <Select>
            <SelectTrigger className="hidden sm:flex w-[100px] text-sm">
              <SelectValue placeholder="UZS" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="UZS">UZS</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Search Input */}
          <form
            className="hidden sm:block w-[200px]"
            onSubmit={onSearchProducts}
          >
            <Input
              type="search"
              placeholder="Поиск..."
              className="w-full text-sm bg-[#2a2a2a] border-none focus:ring-1 focus:ring-[#D3176D]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {/* Cart Icon */}
          <Link href="/card" className="hidden sm:block">
            <ShoppingCart
              size={22}
              className="cursor-pointer hover:text-[#D3176D] transition-colors"
            />
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="block sm:hidden">
                <Menu size={22} />
              </button>
            </SheetTrigger>

            <SheetContent className="bg-[#1a1a1a] text-white">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">Меню</SheetTitle>
                <SheetDescription className="text-sm text-neutral-400">
                  Навигация по сайту
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4 text-base font-medium">
                <Link
                  href="/"
                  className="hover:text-[#D3176D] transition-colors"
                >
                  Главная
                </Link>
                <ProductsAccordion />
                <Products />
                <Link
                  href="/brands"
                  className="hover:text-[#D3176D] transition-colors"
                >
                  О бренде
                </Link>
              </div>
              <div className="mt-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-[#D3176D] text-white hover:text-[#D3176D]"
                    >
                      Связаться
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] text-center space-y-4">
                    <DialogTitle>
                      <p className="text-xl font-bold">
                        <span className="text-[#D3176D]">Оставьте заявку</span>{" "}
                        <br /> и наш менеджер свяжется с вами
                      </p>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                      Мы ответим в течение рабочего дня.
                    </DialogDescription>
                    <form className="space-y-4 text-left">
                      <div className="space-y-1">
                        <label
                          htmlFor="fullName"
                          className="text-sm font-medium text-white"
                        >
                          Полное имя
                        </label>
                        <Input
                          id="fullName"
                          placeholder="Иван Иванов"
                          className="bg-[#2a2a2a] text-white border-none focus:ring-1 focus:ring-[#D3176D]"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-white"
                        >
                          Номер телефона
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+998 90 123 45 67"
                          className="bg-[#2a2a2a] text-white border-none focus:ring-1 focus:ring-[#D3176D]"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#D3176D] text-white hover:bg-[#b2145a]"
                      >
                        Отправить
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <div className="text-sm text-muted-foreground">Язык</div>
                <Select>
                  <SelectTrigger className="w-full bg-[#2a2a2a] border-none text-white">
                    <SelectValue placeholder="RU" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="RU">RU</SelectItem>
                      <SelectItem value="UZ">UZ</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground mt-4">Валюта</div>
                <Select>
                  <SelectTrigger className="w-full bg-[#2a2a2a] border-none text-white">
                    <SelectValue placeholder="UZS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="UZS">UZS</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <form className="mt-6">
                <Input
                  type="search"
                  name="search"
                  placeholder="Поиск..."
                  className="w-full text-sm bg-[#2a2a2a] text-white border-none focus:ring-1 focus:ring-[#D3176D]"
                />
              </form>
              <div className="mt-6">
                <Link
                  href="/card"
                  className="flex items-center justify-center w-full px-4 py-2 rounded-md border border-white hover:border-[#D3176D] hover:text-[#D3176D] transition"
                >
                  Перейти в корзину
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
