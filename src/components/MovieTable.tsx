import React, { useEffect, useState } from 'react';
import { Table, Tag, Pagination } from 'antd';
import { fetchMovies, fetchMovies2, fetchMoviesTable } from '../api'
import { Movie } from '../type';

const MovieTable: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number>(10); // Default page size

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      //const moviesData = await fetchMovies2(currentPage, selectedGenre);
      const moviesData = await fetchMoviesTable(currentPage, pageSize, selectedGenre);
      //const moviesData = await fetchMovies();
      console.log("moviesData data : ", moviesData);
      console.log("currentPage : ", currentPage);
      console.log("selectedGenre : ", selectedGenre);
      setMovies(moviesData.movies);
      setTotalMovies(moviesData.total);
      setLoading(false);
    };

    loadMovies();
  }, [currentPage, selectedGenre, pageSize]);

  const handleGenreFilter = (genre: string) => {
    setSelectedGenre(selectedGenre === genre ? undefined : genre);
    setCurrentPage(1);
    console.log("genre : ", genre );
    console.log("selectedGenre : ", selectedGenre );
  };

  const columns = [
    {
      title: 'Poster',
      dataIndex: 'posterUrl',
      render: (posterUrl: string) => <img src={posterUrl} alt="poster" style={{ width: 100 }} />,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a: Movie, b: Movie) => a.rating - b.rating,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text: string, record: Movie) => (
        <a onClick={() => handleGenreFilter(record.genres[0])}>{text}</a>
      ),
    },
    {
      title: 'Year of Release',
      dataIndex: 'year',
    },
    {
      title: 'Duration',
      dataIndex: 'runtime',
      render: (runtime: string) => {
        const hours = Math.floor(Number(runtime) / 60);
        const minutes = Number(runtime) % 60;
        return `${hours}h ${minutes}m`;
      },
    },
    {
      title: 'Plot',
      dataIndex: 'plot',
      ellipsis: true,
    },
    {
      title: 'Genre',
      dataIndex: 'genres',
      render: (genres: string[]) => (
        <>
          {genres.map((genre) => (
            <Tag key={genre} onClick={() => handleGenreFilter(genre)}>{genre}</Tag>
          ))}
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={movies}
        loading={loading}
        pagination={false}
        rowKey="id"
      />
      <p>total movies : {totalMovies}</p>
      <Pagination
        current={currentPage}
        total={totalMovies}
        onChange={(page) => setCurrentPage(page)}
        pageSize={pageSize}
        onShowSizeChange={(current, size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        showSizeChanger
        pageSizeOptions={[5, 10, 20, 50]}
      />
    </>
  );

};

export default MovieTable;