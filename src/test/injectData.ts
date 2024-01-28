import axios from 'axios';

const books = [
  {
    title: 'Buku A',
    year: 2021,
    author: 'Author A',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae tincidunt ultricies, nunc nisl ultricies nunc, vitae ultri',
    publisher: 'Publisher A',
    pageCount: 100,
    readPage: 25,
    reading: true,
    finished: true,
  },
  {
    title: 'Buku B',
    year: 2010,
    author: 'Author B',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae tincidunt ultricies, nunc nisl ultricies nunc, vitae ultri',
    publisher: 'Publisher B',
    pageCount: 200,
    readPage: 201,
    reading: false,
  },
  {
    title: 'Buku C',
    year: 2021,
    author: 'Author A',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae tincidunt ultricies, nunc nisl ultricies nunc, vitae ultri',
    publisher: 'Publisher B',
    pageCount: 200,
    readPage: 200,
    reading: false,
  },
  {
    title: 'Buku D',
    year: 2023,
    author: 'Author B',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae tincidunt ultricies, nunc nisl ultricies nunc, vitae ultri',
    publisher: 'Publisher A',
    pageCount: 50,
    readPage: 49,
    reading: true,
  },
  {
    title: 'Buku E',
    year: 2020,
    author: 'Author C',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae tincidunt ultricies, nunc nisl ultricies nunc, vitae ultri',
    publisher: 'Publisher B',
    pageCount: 100,
    readPage: 0,
    reading: false,
  },
];

// for (const book of books) {
//   axios.post('http://localhost:9000/books', book, {
//     headers: {
//       Cookie: `Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIzYjA3NmJiNDIxNGU3ZTUyNWI2YTciLCJpYXQiOjE3MDY0NTYzNzAsImV4cCI6MTcwNjQ1OTk3MH0.h1aleY73XfKeiOquVgk4m9TUTyr1LtwrXEX_ZxGNFcM`,
//     },
//   });
// }
