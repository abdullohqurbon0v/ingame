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
            <span className="text-[#D3176D]">InGame</span>.uz
          </Link>
          <Products />
          <Link
            href="/brands"
            className="text-sm hover:text-[#D3176D] transition-colors"
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

            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-lg">Меню</SheetTitle>
                <SheetDescription>
                  Здесь будет мобильная навигация.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
