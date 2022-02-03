module.exports = {
  query: "articleBySlug(slug: String!): Article",
  resolver: {
    Query: {
      articleBySlug: {
        description: "Return article with a given slug",
        resolver: "application::article.article.findOne",
      },
    },
  },
};
