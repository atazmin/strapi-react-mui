module.exports = {
  query: "categoryBySlug(slug: String!): Category",
  resolver: {
    Query: {
      categoryBySlug: {
        description: "Return category with a given slug",
        resolver: "application::category.category.findOne",
      },
    },
  },
};
