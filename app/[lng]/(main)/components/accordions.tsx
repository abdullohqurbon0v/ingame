import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/i18n/client";

const Accordions = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  return (
    <div className="bg-[#0F0F0F] py-16">
      <div className="max-w-[1200px] mx-auto px-4 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          {t("questions")}
        </h2>
        <p className="text-center text-gray-400 mb-12"> {t("ans")}</p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {Array.from({ length: 12 }, (_, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx + 1}`}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-5"
            >
              <AccordionTrigger className="py-4 text-lg font-medium hover:text-[#D3176D] transition-colors">
                {t("2an")}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pb-4">
                {t("2an")}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Accordions;
