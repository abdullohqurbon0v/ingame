import Image from "next/image";
import React from "react";
import Footer from "../components/footer";
import Accordions from "../components/accordions";
import { useParams } from "next/navigation";

const BrandsPage = () => {
  const { lng } = useParams<{ lng: string }>();
  return (
    <div className="bg-[#1a1a1a]">
      <div className="mt-16 max-w-[1200px] mx-auto py-32 space-y-8 ">
        <h1 className="text-2xl font-semibold">О компании</h1>
        <p className="text-sm tracking-wide leading-6">
          Компания INGAME была основана в 20017 году. Мы — официальный партнер
          таких известных технологических гигантов, как NVIDIA, ASUS ROG,
          Cougar, Huntkey. Главный офис INGAME и производственный центр
          расположены в Ташкенте. Шоурум с компьютерами и периферией находится
          также в Ташкенте. Мы осуществляем доставку компьютеров по всему
          Узбекистану и миру. Наша компания работает как с частными, так и с
          юридическими лицами.
        </p>
        <Image
          src={
            "https://i0.wp.com/www.iadea.com/wp-content/uploads/2016/01/About-company-S2-02.jpg?ssl=1"
          }
          alt="About Company image"
          width={1000}
          height={1000}
          className="w-full object-cover"
        />

        <h1 className="text-3xl text-center">Про Нас</h1>
        <div className="border-b-2 border-[#D3176D] w-40 mx-auto"></div>
        <div className="flex space-x-10">
          <Image
            className="w-1/3"
            src={
              "https://a.storyblok.com/f/99519/1920x1080/55b0da46bb/5-positive-conflict-tips-you-can-learn-from-high-performance-teams-5.jpg"
            }
            alt="Team"
            width={200}
            height={200}
          />
          <div className="w-2/3">
            <p>
              Здравствуйте, я – Шахзод Шодиев, основатель компании inGame Я
              прошел все этапы работы: сам про давал, собирал и доставлял
              компьютеры клиентам. Как никто другой знаю, как это делать
              правильно; За 7 лет работы мы построили компанию олдним из лучших
              производителей компьютеров премиум класса в Узбекистане; За это
              время мы собрали мощную команду единомышленников, с которыми
              дружим и работаем с самого основания компании.
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-5">
          <h1 className="text-2xl text-center mb-10">
            Почему стоит выбрать нас?
          </h1>
          <p>Здравствуйте, я – Шахзод Шодиев, основатель компании inGame</p>
          <p>
            Я прошел все этапы работы: сам продавал, собирал и доставлял
            компьютеры клиентам. Как никто другой знаю, как это делать
            правильно; За 7 лет работы мы построили компанию олдним из лучших
            производителей компьютеров премиум класса в Узбекистане;
          </p>
          <p>
            За это время мы собрали мощную команду единомышленников, с которыми
            дружим и работаем с самого основания компании.
          </p>
        </div>
        <Accordions lng={lng} />
        <Footer />
      </div>
    </div>
  );
};

export default BrandsPage;
