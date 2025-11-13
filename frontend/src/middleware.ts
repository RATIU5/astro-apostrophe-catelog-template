import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url } = context;

  // Redirect /categories and /products index pages to home
  // These are the piece-page-type index pages we want to disable
  // Show pages like /categories/meals or /products/laptop will still work
  if (url.pathname === '/categories' || url.pathname === '/products') {
    return context.redirect('/', 301);
  }

  return next();
});
