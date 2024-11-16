'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import db from '@/lib/db-1.json';
import db3 from '@/lib/db-3.json'
import { parse } from '@vanillaes/csv';
import { removeDuplicates } from '@/lib/utils';

export default function Home() {

  const [ message, setMessage ] = useState('Loading');
  const [ restrictionType, setRestrictionType ] = useState<string | undefined>(undefined);
  const [ category, setCategory ] = useState<string | undefined>(undefined);
  const [ restrictionDetailsList, setRestrictionDetailsList ] = useState<string[]>([]);
  const [ csvDb, setCsvDb ] = useState<any[]>();
  const [ database, setDatabase ] = useState<any>();

  const categories = db3.category.map(cat => cat.name);
  const restrictionTypes = removeDuplicates(db.map(row => row.restriction));

  useEffect(() => {
    fetch('http://localhost:8080/api/python')
    .then((response) => response.json())
    .then((data) => {
      setMessage(data.result);
      setDatabase(data.db);
      console.log(data.db);
    });

    // fetch('./planning-permission.csv')
    // .then((response) => response.text())
    // .then((responseText) => {
    //   setCsvDb(parse(responseText));
    //   console.log(parse(responseText))
    // });
  }, []);
  useEffect(() => {
    const newRestrictionDetailsList = db3.restriction.filter(restr => restr.type === restrictionType).map(el => el.details);
    setRestrictionDetailsList(newRestrictionDetailsList);
  }, [restrictionType]);

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <h1 className='text-4xl font-bold'>Planning permission checker</h1>
        <form className='flex flex-col gap-4 w-full'>
          <div className='flex gap-4 items-center flex-col sm:flex-row'>
            <label htmlFor='Category' className='w-1/2'>Category</label>
            <select name='Restriction Type' 
              className='rounded-full border dark:bg-transparent border-solid border-transparent dark:border-white transition-colors flex items-center justify-center bg-foreground text-background gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
              onChange={(event) => {setCategory(event.target.value)}}
            >
              {categories.map((cat, idx) => {
                return <option value={cat} key={idx}>{cat}</option>
              })}
            </select>
          </div>
          <div className='flex gap-4 items-center flex-col sm:flex-row'>
            <label htmlFor='Restriction Type' className='w-1/2'>Restriction Type</label>
            <select name='Restriction Type' 
              className='rounded-full border dark:bg-transparent border-solid border-transparent dark:border-white transition-colors flex items-center justify-center bg-foreground text-background gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
              onChange={(event) => {setRestrictionType(event.target.value)}}
            >
              {restrictionTypes.map((type, idx) => {
                return <option value={type} key={idx}>{type}</option>
              })}
            </select>
          </div>
          {restrictionDetailsList.length > 0 && 
          <div className='flex gap-4 items-center flex-col sm:flex-row'>
            <label htmlFor='Restriction Details' className='w-1/2'>Restriction Details</label>
            <select name='Restriction Details' 
              className='rounded-full border max-w-60 dark:bg-transparent border-solid border-transparent dark:border-white transition-colors flex items-center justify-center bg-foreground text-background gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
            >
              {restrictionDetailsList.map((type, idx) => {
                return <option value={type} key={idx}>{type}</option>
              })}
            </select>
          </div>}
        </form>
        <div className='flex w-full gap-4 items-center justify-center flex-col sm:flex-row'>
          <a
            className='rounded-full border border-solid border-transparent dark:border-white transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#999] dark:bg-white dark:text-black text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            {/* <Image
              className='dark:invert'
              src='/vercel.svg'
              alt='Vercel logomark'
              width={20}
              height={20}
            /> */}
            Check
          </a>
          <span>{message}</span>
        </div>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://github.com/2d0r'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/window.svg'
            alt='Window icon'
            width={16}
            height={16}
          />
          Built by 2d0r
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://2d0r.github.io'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Portfolio →
        </a>
      </footer>
    </div>
  );
}
