export default {
  options: {
    groups: [
      {
        name: 'products',
        label: 'Products',
        items: [
          'product',
          'product-category'
        ]
      },
      {
        name: 'media',
        label: 'Media',
        items: [
          '@apostrophecms/image',
          '@apostrophecms/file',
          '@apostrophecms/image-tag',
          '@apostrophecms/file-tag'
        ]
      }
    ]
  }
};
