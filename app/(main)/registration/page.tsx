import { Truck } from 'lucide-react';
import React from 'react';

const CheckoutPage = () => {
      return (
            <div className='max-w-[1200px] mx-auto mt-16'>
                  <div className="bg-black min-h-screen p-10 text-white">
                        <div className="bg-gray-900 p-6 rounded-lg mb-6">
                              <input type="text" placeholder="Ф.И.О." className="w-full p-2 mb-4 bg-gray-800 rounded" />
                              <input type="text" placeholder="Номер телефона" className="w-full p-2 mb-4 bg-gray-800 rounded" />
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg mb-6">
                              <h2 className="text-lg font-bold mb-4">Способы получения заказа</h2>
                              <div className="flex items-center mb-4">
                                    <input type="radio" id="delivery" name="method" className="mr-2" />
                                    <label htmlFor="delivery">Доставка</label>
                              </div>
                              <div className="flex items-center mb-4">
                                    <input type="radio" id="pickup" name="method" className="mr-2" />
                                    <label htmlFor="pickup">Самовывоз</label>
                              </div>
                              <div className="p-4 bg-gray-800 rounded-lg mb-4 flex items-center">
                                    <Truck className="text-pink-400 mr-3" />
                                    <p>Стандартная доставка - 1 день</p>
                              </div>
                              <div className="p-4 bg-gray-800 rounded-lg mb-4 flex items-center">
                                    <p>Бесплатная доставка по Ташкенту - 1 день</p>
                              </div>
                              <div className="p-4 bg-gray-800 rounded-lg mb-4 flex items-center">
                                    <p>Доставка в регионы по тарифу курьерской службы</p>
                              </div>
                              <input type="text" placeholder="Адрес доставки" className="w-full p-2 bg-gray-800 rounded" />
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg mb-6">
                              <h2 className="text-lg font-bold mb-4">Стоимость и условия доставки</h2>
                              <p className="text-gray-400 text-sm mb-2">• Доставка в течение 1 дня - бесплатно.</p>
                              <p className="text-gray-400 text-sm mb-2">• Доставка осуществляется по городу Ташкент до локации.</p>
                              <p className="text-gray-400 text-sm mb-2">• Срочная доставка по тарифу «Яндекс доставка» (100% предоплата).</p>
                              <textarea placeholder="Комментарий к заказу" className="w-full p-2 bg-gray-800 rounded mt-4"></textarea>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                              <p className="text-xl">Итого: <span className="font-bold text-pink-400">22 343 444 сум</span></p>
                              <button className="bg-pink-500 px-6 py-2 rounded text-white font-bold">Оформить заказ</button>
                        </div>
                  </div>
            </div>
      );
};

export default CheckoutPage;
