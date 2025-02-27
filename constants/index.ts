import tv from '@/public/tv.png'
import chair from '@/public/chair.png'
import keyboard from '@/public/keybord.png'
import mikrofon from '@/public/mikrofon.png'
import mouse from '@/public/mouse.png'
import naushnik from '@/public/naushnik.png'
import stul from '@/public/stul.png'
import block from '@/public/block.png'
import { StaticImageData } from 'next/image'
import chairnews from '@/public/chairgame.png'
import image from '@/public/colon.png'

interface CategoryTypes {
      image: StaticImageData;
      label: string;
      query: string;
}

export const arrays: CategoryTypes[] = [
      {
            image: tv,
            label: "Мониторы",
            query: 'monitor'
      },
      {
            image: chair,
            label: "Столы",
            query: 'table'
      },
      {
            image: keyboard,
            label: "Клавиатуры",
            query: 'keyboard'
      },
      {
            image: mikrofon,
            label: "Аксессуары",
            query: 'accessories'
      },
      {
            image: mouse,
            label: "Мышки",
            query: 'mice'
      },
      {
            image: naushnik,
            label: "Гарнитуры",
            query: 'headsets'
      },
      {
            image: stul,
            label: "Кресла",
            query: 'chairs'
      },
      {
            image: block,
            label: "Комплектующие",
            query: 'components'
      },
];


export const news = [
      {
            id: 1,
            image: chairnews,
            title: "Name of chair",
            oldPrice: "120000",
            price: "100000",
            description: "Lorem ipsum dolor sit amet."
      }, {
            id: 2,
            image: chairnews,
            title: "Name of chair",
            oldPrice: "120000",
            price: "100000",
            description: "Lorem ipsum dolor sit amet."
      }, {
            id: 3,
            image: chairnews,
            title: "Name of chair",
            oldPrice: "120000",
            price: "100000",
            description: "Lorem ipsum dolor sit amet."
      }, {
            id: 4,
            image: chairnews,
            title: "Name of chair",
            oldPrice: "120000",
            price: "100000",
            description: "Lorem ipsum dolor sit amet."
      }, {
            id: 5,
            image: chairnews,
            title: "Name of chair",
            oldPrice: "120000",
            price: "100000",
            description: "Lorem ipsum dolor sit amet."
      }, {
            id: 6,
            image: chairnews,
            title: "Name of chair",
            oldPrice: "120000",
            price: "100000",
            description: "Lorem ipsum dolor sit amet."
      }, {
            id: 7,
            image: chairnews,
            title: "Name of chair",
            oldPrice: "120000",
            price: "100000",
            description: "Lorem ipsum dolor sit amet."
      }, {
            id: 8,
            image: chairnews,
            title: "Name of chair",
            oldPrice: "120000",
            price: "100000",
            description: "Lorem ipsum dolor sit amet."
      },
]

export
      const data = [
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
            {
                  image,
                  title: "Название",
                  oldPrice: "4 586 000",
                  price: "4 000 000",
                  description: "подробное ниформация о продукте",
            },
      ]