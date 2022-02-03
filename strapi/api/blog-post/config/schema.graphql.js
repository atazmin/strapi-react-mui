module.exports = {
  query: "blogPostBySlug(slug: String!): BlogPost",
  resolver: {
    Query: {
      blogPostBySlug: {
        description: "Return blog post with a given slug",
        resolver: "application::blog-post.blog-post.findOne",
      },
    },
  },
};
