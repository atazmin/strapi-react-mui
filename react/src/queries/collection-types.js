import { gql } from '@apollo/client';

const PAGE = gql`
  query GetPage($slug: String!) {
    pageBySlug(slug: $slug) {
      id
      slug
      Title
      Content
      published_at
      Seo {
        id
        title
        description
        blockSearchIndexing
      }
      Hero {
        id
        Heading
        Description
        Image {
          id
          smallSize {
            id
            url
            alternativeText
            caption
          }
          largeSize {
            id
            url
            alternativeText
            caption
          }
        }
        Button {
          id
          Text
          Link
        }
      }
    }
  }
`;

const BLOG_POSTS = gql`
  query GetPosts {
    blogPosts {
      id
      slug
      Title
      Content
      published_at
      created_by {
        id
        username
        firstname
        lastname
      }
      featuredImage {
        id
        url
        alternativeText
        caption
      }
    }
  }
`;

const BLOG_POST = gql`
  query GetBlogPost($slug: String!) {
    blogPostBySlug(slug: $slug) {
      id
      slug
      Title
      Content
      published_at
      Seo {
        id
        title
        description
        blockSearchIndexing
      }
      categories {
        id
        slug
        name
      }
    }
  }
`;

const BLOG_POST_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      slug
      name
    }
  }
`;

const BLOG_POST_CATEGORY = gql`
  query GetCategory($slug: String!) {
    categoryBySlug(slug: $slug) {
      id
      slug
      name
      blog_posts {
        id
        slug
        Title
        Content
        categories {
          id
          name
        }
      }
    }
  }
`;

const ARTICLES = gql`
  query GetArticles {
    articles {
      id
      slug
      Title
      Content
      published_at
    }
  }
`;

const ARTICLE = gql`
  query GetArticle($slug: String!) {
    articleBySlug(slug: $slug) {
      id
      slug
      Title
      Content
      published_at
      Seo {
        id
        title
        description
        blockSearchIndexing
      }
    }
  }
`;

export {
  PAGE,
  BLOG_POSTS,
  BLOG_POST,
  BLOG_POST_CATEGORIES,
  BLOG_POST_CATEGORY,
  ARTICLES,
  ARTICLE,
};
