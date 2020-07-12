/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Required } from 'utility-types';
import { SiteMetadata } from 'src/types';
import Header from 'src/components/header';
import './layout.scss';

type Props = Required<React.Props<unknown>, 'children'>;

interface Query {
  site: {
    siteMetadata: Pick<SiteMetadata, 'title'>;
  };
}

const Layout: React.FC<Props> = ({ children }) => {
  const data = useStaticQuery<Query>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  );
};

export default Layout;
