export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Category',
    pluralLabel: 'Categories',
    localized: true,
    publicApiProjection: {
      title: 1,
      slug: 1,
      _url: 1,
      description: 1,
      image: 1,
      _parentCategory: 1,
      sections: 1
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

      // Slug field (auto-generated from title)
      slug: {
        type: 'slug',
        label: 'URL Slug',
        following: 'title',
        required: true
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
            slug: 1,
            _url: 1
          }
        },
        help: 'Leave empty for top-level category. Maximum 2 levels deep.'
      },

      // Area for dynamic sections
      sections: {
        type: 'area',
        label: 'Page Sections',
        options: {
          expanded: true,
          groups: {
            global: {
              label: 'Global Sections',
              widgets: {
                'cta-section': {},
                'testimonials-section': {}
              },
              columns: 2
            },
            unique: {
              label: 'Category-Specific',
              widgets: {
                'product-grid': {},
                'hero-section': {},
                'featured-content': {}
              },
              columns: 2
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'slug', 'description', 'image']
      },
      hierarchy: {
        label: 'Category Hierarchy',
        fields: ['_parentCategory']
      },
      layout: {
        label: 'Page Layout',
        fields: ['sections']
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
