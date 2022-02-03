import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Contact from 'pages/Contact';
import Home from 'pages/Home';
import Page from 'pages/Page';
import Articles from 'pages/Articles';
import Article from 'pages/Article';
import Blog from 'pages/Blog';
import BlogPost from 'pages/BlogPost';
import Category from 'pages/Category';
import Header from 'components/_base/header/Header';
import Footer from 'components/_base/footer/Footer';
import ScrollToTop from 'components/scroll-to-top/ScrollToTop';
import './App.scss';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_ENDPOINT}/graphql`,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <ApolloProvider client={client}>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route path="/:slug" element={<Page />}></Route>{' '}
            <Route exact path="/articles" element={<Articles />}></Route>
            <Route path="/articles/:slug" element={<Article />}></Route>
            <Route exact path="/blog" element={<Blog />}></Route>
            <Route path="/blog/:slug" element={<BlogPost />}></Route>
            <Route path="/category/:slug" element={<Category />}></Route>
          </Routes>
          <Footer />
        </ApolloProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

/*
TODO Required:

Strapi format pages content first in Local then on Prod

Move PageHeading to each page
Setup each component in its own folder with scss

Fix click area of navigations, make link fill all item/button


Responsive:

*/

/*
TODO Optional:

Later I will setup that you will get notifications (to your tazlari email and phone) if someone sends to email or mailing list

Add pagination to Blog and Articles
Contact form add Recaptcha (https://github.com/codebubb/react-contact-form-tutorial/blob/main/src/App.tsx)
Contact form adds entry to Strapi
+Sharing on social media (use from NuxtJs?)

TODO: Refactor:
Newsletter form
*/
/*

xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px

*/
