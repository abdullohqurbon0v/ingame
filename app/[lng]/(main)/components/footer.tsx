import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "@/i18n/client";
import { Mail, Phone, Send } from "lucide-react";
import React from "react";

const Footer = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  return (
    <footer className="max-w-[1200px] mx-auto text-center py-16 px-4 md:px-8 flex flex-col items-center space-y-6  text-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold leading-tight">{t("footertitle")}</h1>
      <p className="text-lg text-gray-300 max-w-2xl">{t("footerdesc")}</p>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-pink-600 hover:bg-pink-700 transition-colors text-white font-medium py-3 px-6 rounded-xl shadow-md">
            {t("zakas")}
          </button>
        </DialogTrigger>
        <DialogContent className="rounded-2xl p-6 bg-black shadow-xl">
          <DialogTitle className="text-2xl font-semibold mb-4 text-center ">
            Biz bilan bog‘laning
          </DialogTitle>

          <div className="space-y-4  text-base">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-500" />
              <span>+998 91 600 83 00</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-500" />
              <span>abdullohqurnobov@gmail.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-sky-500" />
              <a
                href="https://t.me/your_channel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                Telegram kanalimizga otish
              </a>
            </div>

            <Button
              asChild
              className="w-full mt-4 bg-sky-500 hover:bg-sky-600 text-white"
            >
              <a
                href="https://t.me/your_channel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send className="w-4 h-4 mr-2" />
                Telegram orqali bog‘lanish
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
