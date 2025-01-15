import React from 'react';
import { Layout } from 'antd';
import MovieTable from './components/MovieTable';

const App: React.FC = () => {
  return (
    <Layout style={{ padding: '24px' }}>
      <Layout.Content>
        <h1>Best Movies</h1>
        <MovieTable />
      </Layout.Content>
    </Layout>
  );
};

export default App;