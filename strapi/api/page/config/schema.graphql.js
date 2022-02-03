module.exports = {
  query: "pageBySlug(slug: String!): Page",
  resolver: {
    Query: {
      pageBySlug: {
        description: "Return page with a given slug",
        resolver: "application::page.page.findOne",
      },
    },
  },
};
