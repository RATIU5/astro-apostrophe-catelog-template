export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Category',
    pluralLabel: 'Categories',
    localized: true,
    publicApiProjection: {
      title: 1,
      _url: 1,
      description: 1,
      image: 1,
      _parentCategory: 1
    }
  },
  fields: {
    add: {
      // Category description
      description: {
        type: 'area',
        label: 'Category Description',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: ['bold', 'italic', 'link', 'bulletList']
            }
          }
        }
      },
      // Single image
      image: {
        type: 'area',
        label: 'Category Image',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },

      // Self-referencing relationship for hierarchy
      _parentCategory: {
        type: 'relationship',
        label: 'Parent Category',
        withType: 'category',
        max: 1,
        builders: {
          project: {
            title: 1,
            _url: 1
          }
        },
        help: 'Leave empty for top-level category. Maximum 2 levels deep.'
      }
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'description', 'image']
      },
      hierarchy: {
        label: 'Category Hierarchy',
        fields: ['_parentCategory']
      }
    }
  },

  // Add reverse relationship for products
  columns: {
    add: {
      productCount: {
        label: 'Products',
        component: 'AposCellBasic'
      }
    }
  }
};
