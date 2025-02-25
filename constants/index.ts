import tv from '@/public/tv.png'
import chair from '@/public/chair.png'
import keyboard from '@/public/keybord.png'
import mikrofon from '@/public/mikrofon.png'
import mouse from '@/public/mouse.png'
import naushnik from '@/public/naushnik.png'
import stul from '@/public/stul.png'
import block from '@/public/block.png'
import { StaticImageData } from 'next/image'

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
