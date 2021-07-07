import React from "react";
import tinytime from "tinytime";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Header from "../components/Header";
import SectionContainer from "../components/SectionContainer";
import PageTitle from "../components/PageTitle";

const postDateTemplate = tinytime("{dddd}, {MMMM} {DD}, {YYYY}");

export default function PostTemplate(props) {
  const { frontmatter, body } = props.data.post || {};
  const { previous, next } = props.pageContext;

  return (
    <React.Fragment>
      <Helmet>
        <title>{frontmatter.title} - Varun Dev</title>
        <meta name="description" content={frontmatter.description} />
      </Helmet>
      <SectionContainer>
        <Header />
      </SectionContainer>
      <SectionContainer>
        <article className="xl:divide-y xl:divide-gray-200">
          <header className="pt-6 xl:pb-10">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500">
                    <time dateTime={frontmatter.date}>
                      {postDateTemplate.render(new Date(frontmatter.date))}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{frontmatter.title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y xl:divide-y-0 divide-gray-200 xl:grid xl:grid-cols-4 xl:gap-x-6 pb-16 xl:pb-20"
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <div className="divide-y divide-gray-200 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="prose max-w-none pt-10 pb-8">
                <MDXRenderer>{body}</MDXRenderer>
              </div>
              {/* Comments area */}
            </div>

            <aside className="text-sm font-medium divide-y divide-gray-200 xl:col-start-1 xl:row-start-2">
              <div className="space-y-8 py-8">
                {next.slug && (
                  <div>
                    <h2 className="text-xs leading-5 tracking-wide uppercase text-gray-500">
                      Next Post
                    </h2>
                    <div className="text-green-600 hover:text-green-700">
                      <Link to={next.slug}>{next.title}</Link>
                    </div>
                  </div>
                )}
                {previous.slug && (
                  <div>
                    <h2 className="text-xs leading-5 tracking-wide uppercase text-gray-500">
                      Previous Post
                    </h2>
                    <div className="text-green-600 hover:text-green-700">
                      <Link to={previous.slug}>{previous.title}</Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-8">
                <Link to="/" className="text-green-600 hover:text-green-700">
                  &larr; All Posts
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </SectionContainer>
    </React.Fragment>
  );
}

// can be named anything pageQuery(or)query, etc.,
export const query = graphql`
  query ($slug: String!) {
    post: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        date
        title
        description
      }
      body
    }
  }
`;
