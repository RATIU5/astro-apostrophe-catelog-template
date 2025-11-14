// Core Apostrophe widgets
import RichTextWidget from './RichTextWidget.astro';
import ImageWidget from './ImageWidget.astro';
import VideoWidget from './VideoWidget.astro';

// Custom widgets
import TestWidget from './TestWidget.astro';

const widgetComponents = {
  // Core widgets
  '@apostrophecms/rich-text': RichTextWidget,
  '@apostrophecms/image': ImageWidget,
  '@apostrophecms/video': VideoWidget,

  // Custom widgets
  'test': TestWidget
};

export default widgetComponents;
