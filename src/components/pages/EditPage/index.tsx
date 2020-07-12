import React from 'react';
import SEO from 'src/components/seo';
import Layout from 'src/components/Layout';
import Loading from 'src/components/Loading';
import style from './style.module.scss';

const EditPage: React.FC = () => {
  return (
    <Layout className={style.main}>
      <SEO title="Edit" />
      <Loading />
    </Layout>
  );
};

export default EditPage;
