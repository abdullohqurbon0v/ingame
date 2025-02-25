import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategoryProps {
      item: {
            label: string;
            image: StaticImageData;
            query: string;
      };
}

const Categories = ({ item }: CategoryProps) => {
      return (
            <Link href={`/category/${item.query}`} className='mt-16 flex flex-col justify-between'>
                  <Image src={item.image} alt={item.label} width={100} className='mx-auto' height={100} />
                  <p className='text-center'>{item.label}</p>
            </Link>
      );
};

export default Categories;
