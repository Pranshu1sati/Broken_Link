'use client';
import React, { useState } from 'react';

import axios from 'axios';
import Spinner from './Spinner';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/linkcheck', { url: url });
      console.log(data);
      setResponse(data.message);
    } catch (error) {
      console.error(error);
      setResponse('Error checking URL');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className='font-extrabold text-lg mb-4'>
        This is the Task 1 for internship at Vryse a tool for checking broken links built with NextJS
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="border border-black px-4 py-2 text-black border-gray-600 "
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 ml-2 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {isLoading && <Spinner />}
      {Array.isArray(response) && response.length > 0 && (
  <ul className="bg-gray-800 text-white px-4 py-2 rounded-md text-center pd-4 space-x-4">
    {response.map((item, index) => (
      <li key={index} className="my-2">
        <a href={item}>{item} - has status 404</a>
      </li>
    ))}
  </ul>
)}
{!Array.isArray(response) && (
  <p className="text-white">Response: {response}</p>
)}
    </div>
  );
      }