const POSTS_BASE_PATH = `allPosts`;

module.exports = {
  pathPrefix: `/programs`,
  siteMetadata: {
    siteUrl: "https://varundevpro.com",
    title: "Programs",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: POSTS_BASE_PATH,
        path: `${__dirname}/src/posts/`,
      },
      __key: "posts",
    },
  ],
};
