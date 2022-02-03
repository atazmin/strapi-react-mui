import { gql } from '@apollo/client';

const PRIMARY_NAVIGATION = gql`
  query GetPrimaryNavigation {
    primaryNavigation {
      id
      created_at
      __typename
      primaryNavigationComponents {
        ... on ComponentNavigationLink {
          __typename
          id
          label
          url
        }
        ... on ComponentNavigationDropdown {
          __typename
          id
          dropdownName
          links {
            id
            label
            url
          }
        }
      }
    }
  }
`;

const HOME_PAGE = gql`
  query GetHomePage {
    homepage {
      id
      created_at
      __typename
      name
      content
      Seo {
        id
        title
        description
        blockSearchIndexing
      }
      homepageCarousel {
        __typename
        ... on ComponentCarouselSlides {
          id
          carouselSlides {
            id
            imageLink
            imageAttributesLargeSize {
              id
              url
              alternativeText
              caption
            }
            imageAttributesSmallSize {
              id
              url
              alternativeText
              caption
            }
          }
        }
      }
      Cards {
        id
        ... on ComponentCardCard {
          id
          Heading
          Description
          Image {
            id
            url
            alternativeText
            caption
          }
          Button {
            id
            Text
            Link
          }
        }
      }
    }
  }
`;

const CONTACT_PAGE = gql`
  query GetContactPage {
    contact {
      __typename
      id
      slug
      created_at
      name
      content
      Seo {
        id
        title
        description
        blockSearchIndexing
      }
    }
  }
`;

export { PRIMARY_NAVIGATION, HOME_PAGE, CONTACT_PAGE };
