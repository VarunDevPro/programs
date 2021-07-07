import React from "react";
import tinytime from "tinytime";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";

import SectionContainer from "../components/SectionContainer";
import PageTitle from "../components/PageTitle";

const postDateTemplate = tinytime("{dddd}, {MMMM} {DD}, {YYYY}");

const PostLink = ({ title, date, slug }) => {
  return (
    <div className="my-8">
      <Link
        to={slug}
        className="text-green-600 hover:text-green-700 text-2xl font-bold"
      >
        {title}
      </Link>
      <dl className="space-y-10">
        <div>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base leading-6 font-medium text-gray-500">
            <time dateTime={date}>
              {postDateTemplate.render(new Date(date))}
            </time>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default function PaginationTemplate(props) {
  const { currentPage, numPages } = props.pageContext;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const prevPage = `/explore/${currentPage - 1}`;
  const nextPage = `/explore/${currentPage + 1}/`;

  const { posts } = props.data.allMdx;
  const links = posts.map((x) => ({ ...x.node.frontmatter, ...x.node.fields }));

  return (
    <main className="pt-6 xl:pb-10 divide-y">
      <Helmet>
        <title>Explore Programs - Varun Dev</title>
        <meta
          name="description"
          content="Pagtinated list of programs in various programming languages"
        />
      </Helmet>
      <SectionContainer>
        <div className="py-8">
          <PageTitle>All Posts</PageTitle>
        </div>
      </SectionContainer>
      <SectionContainer>
        {links.map((x) => (
          <PostLink {...x} />
        ))}
      </SectionContainer>
      <SectionContainer>
        {!isFirst && (
          <Link
            to={prevPage}
            rel="next"
            className="inline-block text-green-600 hover:text-green-700 pt-8 pr-8"
          >
            &larr; Previous
          </Link>
        )}
        {!isLast && (
          <Link
            to={nextPage}
            rel="next"
            className="inline-block text-green-600 hover:text-green-700 pt-8 pr-8"
          >
            Next &rarr;
          </Link>
        )}
      </SectionContainer>
    </main>
  );
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//src/posts//" }
        frontmatter: { published: { ne: false } }
      }
      limit: $limit
      skip: $skip
    ) {
      posts: edges {
        node {
          frontmatter {
            date
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
