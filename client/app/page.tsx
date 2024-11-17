'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import './globals.css';

type FormDataType = {
  category: string,
  restrictionType: string,
  restrictionDetails: string,
}

export default function Home() {

  const [ message, setMessage ] = useState('');
  const [ formData, setFormData ] = useState<FormDataType>({category: '', restrictionType: '', restrictionDetails: ''});
  const [ categories, setCategories ] = useState<string[]>([]);
  const [ restrictionDetailsList, setRestrictionDetailsList ] = useState<string[]>([]);
  const [ restrictionTypes, setRestrictionTypes ] = useState<string[]>([]);

  // Sending formData to server and updating result display
  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!formData.category) {
      return;
    }

    const response = await fetch('http://localhost:8080/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setMessage(result.result === 'Yes' ? '⚠️  Permission Required  ⚠️' : result.result === 'No' ? '🟢  Permission not required  🟢' : '');
  };

  // Fetch categories on load
  useEffect(() => {
    fetch('http://localhost:8080/api/get-categories')
    .then((response) => response.json())
    .then((data) => {
      setCategories(data.body);
    });
  }, []);

  // Fetch restrictionTypes on selecting category
  useEffect(() => {
    if (formData.category) {
      fetch('http://localhost:8080/api/get-restrictionTypes')
      .then((response) => response.json())
      .then((data) => {
        setRestrictionTypes(data.body);
      });
    }
  }, [formData.category]);

  // Fetch filtered restrictions based on selected restrictionType
  useEffect(() => {
    if (formData.restrictionType) {
      fetch(`http://localhost:8080/api/get-restrictionDetailsList?filter=${formData.restrictionType}`)
      .then((response) => response.json())
      .then((data) => {
        setRestrictionDetailsList(data.body);
      });
    }
    
  }, [formData.restrictionType]);

  // Update result everytime form is updated
  useEffect(() => {
    setMessage('');
    handleSubmit();
  }, [formData])

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 sm:gap-12 row-start-2 items-center sm:items-start'>
        <h1 className='text-4xl font-bold text-center sm:text-left'>Planning permission checker</h1>
        <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
          <div className='flex gap-4 items-center flex-col sm:flex-row'>
            <label htmlFor='Category' className='sm:w-1/2'>Category</label>
            <select name='Restriction Type' 
              className='w-60 flex items-center justify-center gap-2 h-10 sm:h-12 px-4 sm:px-5
              bg-transparent rounded-full border border-solid border-foreground text-foreground text-sm sm:text-base transition-colors
              dark:border-foreground dark:text-foreground disabled:opacity-40'
              onChange={(event) => {
                const newCategory = event.target.value
                setFormData(prevData => ({ 
                  ...prevData,
                  category: newCategory,
                  restrictionType: newCategory ? prevData.restrictionType : '',
                  restrictionDetails: newCategory ? prevData.restrictionDetails : '',
                }))
              }}
            >
              <option value=''>Select category</option>
              {categories?.map((cat, idx) => {
                return <option value={cat} key={idx}>{cat}</option>
              })}
            </select>
          </div>
          <div className='flex gap-4 items-center justify-between flex-col sm:flex-row'>
            <label htmlFor='Restriction Type' className='sm:w-1/2'>Restriction Type</label>
            <select name='Restriction Type' 
              className='w-60 flex items-center justify-center gap-2 h-10 sm:h-12 px-4 sm:px-5
              bg-transparent rounded-full border border-solid border-foreground text-foreground text-sm sm:text-base transition-colors
              dark:border-foreground dark:text-foreground disabled:opacity-40'
              onChange={(event) => {
                setFormData(prevData => ({...prevData, restrictionType: event.target.value, restrictionDetails: ''}))
              }}
              disabled={!formData.category}
              value={formData.restrictionType}
            >
              <option value=''>Select type</option>
              {restrictionTypes.map((type, idx) => {
                return <option value={type} key={idx}>{type}</option>
              })}
            </select>
          </div>
          <div className='flex gap-4 items-center flex-col sm:flex-row'>
            <label htmlFor='Restriction Details' className='sm:w-1/2'>Restriction Details</label>
            <select name='Restriction Details' 
              className='w-60 flex items-center justify-center gap-2 h-10 sm:h-12 px-4 sm:px-5
              bg-transparent rounded-full border border-solid border-foreground text-foreground text-sm sm:text-base transition-colors
              dark:border-foreground dark:text-foreground disabled:opacity-40'
              onChange={(event) => {
                setFormData(prevData => ({...prevData, restrictionDetails: event.target.value}))
              }}
              value={formData.restrictionDetails}
              disabled={!formData.restrictionType || !formData.category}
            >
              <option value=''>Select restriction</option>
              {restrictionDetailsList.map((type, idx) => {
                return <option value={type} key={idx}>{type}</option>
              })}
            </select>
          </div>
          <div className='flex flex-col w-full gap-4 items-center justify-center pt-6'>
          { message ? 
            <span className='text-xl mt-4 animate-bounce'>{message}</span>
            : <span className='text-black/40 dark:text-white/40 mt-4'>Add more info to check</span>
          }
          </div>
        </form>
      </main>

      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://github.com/2d0r/planning-permission-checker-2'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image aria-hidden src='/window.svg' alt='Window icon' width={16} height={16} />
          Built by 2d0r
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://2d0r.github.io'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image aria-hidden src='/globe.svg' alt='Globe icon' width={16} height={16} />
          Portfolio →
        </a>
      </footer>
    </div>
  );
}
