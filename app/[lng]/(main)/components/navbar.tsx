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
import React, { FormEvent, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Products from "./navbar/products";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductsAccordion } from "./mobile-accordions";
import { useTranslation } from "@/i18n/client";
import { $axios } from "@/http/api";
import { toast } from "sonner";

const Navbar = ({ lng }: { lng: string }) => {
  const [valute, setValute] = useState<string>("");
  const { t } = useTranslation(lng);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = lng;

  const handleLanguageChange = (value: string) => {
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}/, "");

    const newPath = `/${value}${pathWithoutLang}`;

    const params = new URLSearchParams(searchParams.toString());
    router.push(`${newPath}?${params.toString()}`);
  };
  const onSendData = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (!name || !valute) return;

    try {
      const res = await $axios.post("/contact/", {
        name,
        phone_number: phone,
      });
      setPhone("");
      setName("");
      console.log(res);
      toast(
        lng === "uz"
          ? "Malumotlar mofaqiyatli jonatildi"
          : "Данные отправлены успешно",
        {
          action: {
            label: lng === "uz" ? "Yopish" : "Закрыть",
            onClick: () => console.log("Undo"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedValute = localStorage.getItem("valute") || "UZS";
    setValute(storedValute);

    const handleStorageChange = () => {
      const newValute = localStorage.getItem("valute") || "UZS";
      setValute(newValute);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("valuteChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("valuteChange", handleStorageChange);
    };
  }, []);

  const handleValueChange = (value: string) => {
    localStorage.setItem("valute", value);
    setValute(value);
    window.dispatchEvent(new Event("valuteChange"));
  };

  const onSearchProducts = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?query=${search}`);
  };

  const navigateToBrand = () => {
    router.push(`/${lng}/brands`);
  };

  const navigateCard = () => {
    router.push(`/${lng}/card`);
  };

  return (
    <div
      className={cn("fixed inset-x-0 top-0 h-16 bg-[#1a1a1a] shadow-md z-50")}
    >
      <header className="flex justify-between items-center px-6 h-full max-w-[1200px] mx-auto text-white">
        <div className="flex items-center space-x-8">
          <Link
            href={`/${lang}`}
            className="font-bold text-xl tracking-wide hover:text-[#D3176D] transition-colors"
          >
            <span className="text-[#D3176D]">OutGame</span>.uz
          </Link>
          <Products lang={lang} />
          <div
            onClick={() => navigateToBrand()}
            className="text-sm hidden sm:block hover:text-[#D3176D] transition-colors cursor-pointer"
          >
            {t("navaboutbrand")}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="hidden sm:block text-sm hover:text-[#D3176D] transition-colors"
              >
                {t("connectnav")}
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] text-center space-y-4">
              <DialogTitle>
                <p className="text-xl font-bold">
                  <span className="text-[#D3176D]">{t("dialogtitle")}</span>{" "}
                  <br />
                  {t("dialogtitle2")}
                </p>
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {t("answdialog")}
              </DialogDescription>
              <form className="space-y-4 text-left" onSubmit={onSendData}>
                <div className="space-y-1">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-white"
                  >
                    {t("fullname")}
                  </label>
                  <Input
                    id="fullName"
                    placeholder="Иван Иванов"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#2a2a2a] text-white border-none focus:ring-1 focus:ring-[#D3176D]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-white"
                  >
                    {t("phonenumber")}
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="bg-[#2a2a2a] text-white border-none focus:ring-1 focus:ring-[#D3176D]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#D3176D] text-white hover:bg-[#b2145a] transition-colors"
                >
                  {loading ? t("loading") : t("send")}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Select value={lang} onValueChange={handleLanguageChange}>
            <SelectTrigger className="hidden sm:flex w-[100px] text-sm">
              <SelectValue placeholder={lang.toUpperCase()} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ru">RU</SelectItem>
                <SelectItem value="uz">UZ</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={valute} onValueChange={handleValueChange}>
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

          <form
            className="hidden sm:block w-[200px]"
            onSubmit={onSearchProducts}
          >
            <Input
              type="search"
              placeholder={t("search")}
              className="w-full text-sm bg-[#2a2a2a] border-none focus:ring-1 focus:ring-[#D3176D]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <div onClick={navigateCard} className="hidden sm:block">
            <ShoppingCart
              size={22}
              className="cursor-pointer hover:text-[#D3176D] transition-colors"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="block sm:hidden">
                <Menu size={22} />
              </button>
            </SheetTrigger>

            <SheetContent className="bg-[#1a1a1a] overflow-y-scroll text-white">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold"></SheetTitle>
                <SheetDescription className="text-sm text-neutral-400"></SheetDescription>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4 text-base font-medium">
                <Link
                  href={`/`}
                  className="hover:text-[#D3176D] transition-colors"
                >
                  {t("main")}
                </Link>
                <ProductsAccordion lang={lang} />
                <div
                  onClick={navigateToBrand}
                  className="hover:text-[#D3176D] transition-colors"
                >
                  {t("aboutbrand")}
                </div>
              </div>

              <div className="mt-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-[#D3176D] text-white hover:text-[#D3176D]"
                    >
                      {t("connect")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] text-center space-y-4">
                    <DialogTitle>
                      <p className="text-xl font-bold">
                        <span className="text-[#D3176D]">
                          {t("dialogtitle")}
                        </span>{" "}
                        <br /> {t("dialogtitle2")}
                      </p>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                      {t("answdialog")}
                    </DialogDescription>
                    <form className="space-y-4 text-left" onSubmit={onSendData}>
                      <div className="space-y-1">
                        <label
                          htmlFor="fullName"
                          className="text-sm font-medium text-white"
                        >
                          {t("fullname")}
                        </label>
                        <Input
                          id="fullName"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-[#2a2a2a] text-white border-none focus:ring-1 focus:ring-[#D3176D]"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-white"
                        >
                          {t("phonenumber")}
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+998 90 123 45 67"
                          className="bg-[#2a2a2a] text-white border-none focus:ring-1 focus:ring-[#D3176D]"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#D3176D] text-white hover:bg-[#b2145a]"
                      >
                        {t("send")}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="text-sm text-muted-foreground">{t("lang")}</div>
                <Select value={lang} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full bg-[#2a2a2a] border-none text-white">
                    <SelectValue placeholder={lang.toUpperCase()} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ru">RU</SelectItem>
                      <SelectItem value="uz">UZ</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground mt-4">
                  {t("valute")}
                </div>
                <Select value={valute} onValueChange={handleValueChange}>
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

              <form
                className="flex items-center gap-2 rounded-2xl shadow-md mt-4"
                onSubmit={onSearchProducts}
              >
                <Input
                  type="search"
                  name="search"
                  placeholder={t("searchtovars")}
                  className="flex-1 text-sm bg-[#2a2a2a] text-white border-none focus:ring-0 placeholder:text-gray-400"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <Button
                  type="submit"
                  className="bg-[#D3176D] hover:bg-[#b0155c] text-white text-sm px-4 py-2 rounded-lg"
                >
                  {t("search")}
                </Button>
              </form>

              <div className="mt-6">
                <div
                  onClick={navigateCard}
                  className="flex items-center justify-center w-full px-4 py-2 rounded-md border border-white hover:border-[#D3176D] hover:text-[#D3176D] transition"
                >
                  {t("korzina")}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
