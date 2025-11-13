import HomePage from './HomePage.astro';
import DefaultPage from './DefaultPage.astro';
import ProductIndexPage from './ProductIndexPage.astro';
import ProductShowPage from './ProductShowPage.astro';
import CategoryIndexPage from './CategoryIndexPage.astro';
import CategoryShowPage from './CategoryShowPage.astro';

const templateComponents = {
  '@apostrophecms/home-page': HomePage,
  'default-page': DefaultPage,
  'product-page:index': ProductIndexPage,
  'product-page:show': ProductShowPage,
  'category-page:index': CategoryIndexPage,
  'category-page:show': CategoryShowPage
};

export default templateComponents;
