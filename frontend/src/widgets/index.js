import RichTextWidget from './RichTextWidget.astro';
import ImageWidget from './ImageWidget.astro';
import VideoWidget from './VideoWidget.astro';
import GridLayoutWidget from './GridLayoutWidget.astro';
import AccordionWidget from './AccordionWidget.astro';
import CardWidget from './CardWidget.astro';
import HeroWidget from './HeroWidget.astro';
import LinkWidget from './LinkWidget.astro';
import SlideshowWidget from './SlideshowWidget.astro';
import RowsWidget from './RowsWidget.astro';
// New section widgets
import HeroSectionWidget from './HeroSectionWidget.astro';
import CtaSectionWidget from './CtaSectionWidget.astro';
import TestimonialsSectionWidget from './TestimonialsSectionWidget.astro';
import FaqSectionWidget from './FaqSectionWidget.astro';
import SpecificationsDisplayWidget from './SpecificationsDisplayWidget.astro';
import ImageGallerySectionWidget from './ImageGallerySectionWidget.astro';
import RelatedProductsWidget from './RelatedProductsWidget.astro';
import ProductGridWidget from './ProductGridWidget.astro';
import FeaturedContentWidget from './FeaturedContentWidget.astro';

const widgetComponents = {
  '@apostrophecms/rich-text': RichTextWidget,
  '@apostrophecms/image': ImageWidget,
  '@apostrophecms/video': VideoWidget,
  'grid-layout': GridLayoutWidget,
  'accordion': AccordionWidget,
  'card': CardWidget,
  'hero': HeroWidget,
  'link': LinkWidget,
  'slideshow': SlideshowWidget,
  'rows': RowsWidget,
  // New section widgets
  'hero-section': HeroSectionWidget,
  'cta-section': CtaSectionWidget,
  'testimonials-section': TestimonialsSectionWidget,
  'faq-section': FaqSectionWidget,
  'specifications-display': SpecificationsDisplayWidget,
  'image-gallery-section': ImageGallerySectionWidget,
  'related-products': RelatedProductsWidget,
  'product-grid': ProductGridWidget,
  'featured-content': FeaturedContentWidget
};

export default widgetComponents;
