// modules/product-category/index.js
export default {
  extend: '@apostrophecms/piece-type',

  options: {
    label: 'Category',
    pluralLabel: 'Categories'
  },

  fields: {
    add: {
      description: {
        type: 'string',
        label: 'Description',
        textarea: true
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'title', 'description' ]
      }
    }
  }
};
