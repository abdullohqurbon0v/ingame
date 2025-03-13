
import React from 'react';

const Footer = () => {
      return (
            <footer className='max-w-[1200px] mx-auto text-center py-16 px-4 md:px-8 flex flex-col items-center space-y-6  text-white rounded-2xl shadow-lg'>
                  <h1 className='text-3xl font-bold leading-tight'>
                        Одним онлайн-звонком мы изменим ваш игровой опыт навсегда
                  </h1>
                  <p className='text-lg text-gray-300 max-w-2xl'>
                        Назначим звонок, узнаем о ваших запросах, предложим подходящую конфигурацию. После разбора мы возьмем на себя все заботы по поддержке и дальнейшей доставке и сбору ПК.
                  </p>
                  <button className='bg-pink-600 hover:bg-pink-700 transition-colors text-white font-medium py-3 px-6 rounded-xl shadow-md'>
                        Заказать звонок
                  </button>
            </footer>
      );
};

export default Footer;