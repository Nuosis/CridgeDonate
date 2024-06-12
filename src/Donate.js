import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.js';
import { useUser } from './UserContext.js';
import { sanitizeInput, validateEmail, validatePhoneNumber } from './Security/inputValidation.js';
import Popup from './UI Elements/Popup.js';
import { createRecord } from './FileMaker/createRecord.js';
import provinces from './Environment/provinces.json';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export default function Donate() {
  // VARIABLES
  // FUNCTIONS
  // HANDLERS
  return (
    <>
      <header>
        <div className="container mx-auto">
          <div className="flex flex-col items-center p-4">
            <div className="text-center">
              <a href="https://cridge.org/"><img className="img-fluid" src="https://cridge.org/wp-content/uploads/2018/07/Cridge-Center-Logo.png" alt="Logo"/></a>
            </div>
          </div>
        </div>
      </header>

      <main id="checkout" className="py-12" style={{ backgroundColor: 'rgb(236, 241, 243)' }}>
        <div className="container mx-auto px-4 bg-white h-full">

          <section className="flex flex-col items-center text-center p-4 gap-2">
            <h1 className="uppercase text-4xl font-bold font" style={{ color: 'rgb(171, 186, 199)' }}>
              SUPPORT THE CRIDGE CENTRE
            </h1>
            <h2 className="uppercase text-3xl" style={{ color: 'rgb(211, 221, 229)' }}>
              RESTORING HOPE AND A FUTURE
            </h2>
          </section>

          <section className="flex justify-center my-4">
            <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 text-center">

              <div className="flex flex-wrap">
                {/* make into button compnent */}
                <div className="w-1/2 md:w-1/4 p-1">
                  <button className="btn block w-full text-lg" style={{ borderColor: 'rgb(229, 229, 223)' }}>$500</button>
                </div>
                <div className="w-1/2 md:w-1/4 p-1">
                  <button className="btn block w-full text-lg" style={{ borderColor: 'rgb(229, 229, 223)' }}>$250</button>
                </div>
                <div className="w-1/2 md:w-1/4 p-1">
                  <button className="btn block w-full text-white text-lg" style={{ backgroundColor: 'rgb(32, 74, 120)' }}>$100</button>
                </div>
                <div className="w-1/2 md:w-1/4 p-1">
                  <button className="btn block w-full text-lg" style={{ borderColor: 'rgb(229, 229, 223)' }}>$50</button>
                </div>
              </div>

              <div className="flex flex-wrap mt-2">
                <div className="w-3/4 md:w-5/6 p-1">
                  <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Other Amount" />
                </div>
                <div className="w-1/4 md:w-1/6 p-1">
                  <select id="currencySelect" className="form-select block w-full h-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                    <option value="CAD" defaultValue>CAD</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap">
                {/* make into button compnent */}
                <div className="w-1/2 p-1">
                  <button className="btn block w-full text-white text-base" style={{ backgroundColor: 'rgb(32, 74, 120)' }}>Donate $100 Today</button>
                </div>
                <div className="w-1/2 p-1">
                  <button className="btn block w-full text-white text-base" style={{ backgroundColor: 'rgb(241, 182, 67)' }}>Donate $100 Monthly</button>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-2xl mx-auto">

            <section className="text-center p-4">
              <h1 className="text-4xl font-black text-gray-700 uppercase">
                You're donating $100 today
              </h1>
            </section>

            <section className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Card Details</label>
                <CardElement className="mt-1 block w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              {/* NAME BLOCK */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Title*</label>
                  <select className="block w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option defaultValue></option>
                    <option>Mr</option>
                    <option>Ms</option>
                    <option>Mrs</option>
                    <option>Dr</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">First Name*</label>
                  <input type="text" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Initial</label>
                  <input type="text" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Last Name*</label>
                  <input type="text" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              </div>
              {/* ADDRESS BLOCK */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 pt-4">
                <div className="md:col-span-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Address*</label>
                  <input type="text" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-gray-700 text-sm font-medium mb-2">City*</label>
                  <input type="text" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Poastal Code*</label>
                  <input type="text" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Prov*</label>
                  <input type="text" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="md:col-span-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email*</label>
                  <input type="text" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="you@email.com"/>
                </div>
              </div>

              {/* Repeat similar blocks for Address, Postal Code, City, Province, etc. */}
              
            </section>

          </section>
        </div>
      </main>

      <footer className='bg-slate-700 h-28'>
            <div className="container mx-auto p-4 h-full">
                <div className="flex flex-col align-middle items-center gap-4 h-full">
                  <div className='flex flex-row align-middle items-center gap-4 h-full'>
                    <div className="order-last order-md-first">
                        <p className='text-gray-400'>©2024 The Cridge Centre for the Family | Registered Canadian Charity #: 108079419RR0001</p>
                    </div>
                    <div className="order-first order-md-last">
                        <a className='text-gray-400' href="/wp-content/uploads/2018/07/The-Cridge-Centre-Privacy-Policy-2018.pdf" target="_blank">Privacy Policy</a>
                    </div>
                  </div>
                </div>
            </div>
            {/*end of container-fluid -->*/}
        </footer>

    </>
  )
}