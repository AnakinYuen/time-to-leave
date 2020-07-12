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
import Header from './Header';
import './unify.scss';
import './theme.scss';

type Props = Required<React.Props<unknown>, 'children'> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

interface Query {
  site: {
    siteMetadata: Pick<SiteMetadata, 'title'>;
  };
}

const Layout: React.FC<Props> = ({ children, ...mainProps }) => {
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
      <main {...mainProps}>{children}</main>
    </>
  );
};

export default Layout;
