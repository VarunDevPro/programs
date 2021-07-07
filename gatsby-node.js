const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

const POSTS_BASE_PATH = `allPosts`;
const POSTS_PATH_REGEX = "/src/posts/";
const POSTS_PER_PAGE = 15;

const templates = {
  post: path.resolve(__dirname, "src/templates/post.jsx"),
  pagination: path.resolve(__dirname, "src/templates/pagination.jsx"),
};

// Create slug field
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === `Mdx`) {
    if (node.fileAbsolutePath.includes(POSTS_PATH_REGEX)) {
      slug =
        "/post" + createFilePath({ node, getNode, basePath: POSTS_BASE_PATH });
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

// Create Pages
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data, errors } = await graphql(`
    query {
      posts: allMdx(
        filter: {           
        frontmatter: {published: {ne: false}}
        fileAbsolutePath: { regex: "/${POSTS_PATH_REGEX}/" } }
      ) {
        edges {
          node {
            frontmatter {
              title
              description
            }
            fields {
              slug
            }
            excerpt
          }
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          previous {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (errors) {
    return Promise.reject(errors);
  }

  const { posts } = data;

  // create single post pages
  posts.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: templates.post,
      context: {
        slug: node.fields.slug,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
        next: {
          slug: next?.fields?.slug,
          title: next?.frontmatter?.title,
        },
        previous: {
          slug: previous?.fields?.slug,
          title: previous?.frontmatter?.title,
        },
      },
    });
  });

  // create posts pagination
  const numPages = Math.ceil(posts.edges.length / POSTS_PER_PAGE);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/explore/${i + 1}` : `/explore/${i + 1}`,
      component: templates.pagination,
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
