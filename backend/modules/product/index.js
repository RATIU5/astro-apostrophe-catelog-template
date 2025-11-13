export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Product',
    pluralLabel: 'Products',
    localized: true,  // Enables draft/publish workflow
    autopublish: false,  // Requires explicit publish
    publicApiProjection: {
      title: 1,
      slug: 1,
      _url: 1,
      description: 1,
      images: 1,
      specifications: 1,
      informationTable: 1,
      features: 1,
      variants: 1,
      _category: 1,
      sections: 1
    }
  },
  fields: {
    add: {
      // Rich text description
      description: {
        type: 'area',
        label: 'Product Description',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: ['bold', 'italic', 'link', 'bulletList', 'orderedList']
            }
          }
        }
      },

      // Image array (max 15)
      images: {
        type: 'array',
        label: 'Product Images',
        titleField: 'altText',
        max: 15,
        fields: {
          add: {
            image: {
              type: 'area',
              label: 'Image',
              options: {
                max: 1,
                widgets: {
                  '@apostrophecms/image': {}
                }
              }
            },
            altText: {
              type: 'string',
              label: 'Alt Text',
              required: true
            },
            isPrimary: {
              type: 'boolean',
              label: 'Primary Image',
              def: false
            }
          }
        }
      },

      // Specifications (key-value pairs)
      specifications: {
        type: 'array',
        label: 'Product Specifications',
        titleField: 'key',
        inline: true,
        style: 'table',
        fields: {
          add: {
            key: {
              type: 'string',
              label: 'Specification Name',
              required: true
            },
            value: {
              type: 'string',
              label: 'Value',
              required: true
            }
          }
        }
      },

      // Information Table (complex structure)
      informationTable: {
        type: 'object',
        label: 'Information Table',
        fields: {
          add: {
            tableTitle: {
              type: 'string',
              label: 'Table Title'
            },
            columnNames: {
              type: 'array',
              label: 'Column Names',
              titleField: 'name',
              inline: true,
              fields: {
                add: {
                  name: {
                    type: 'string',
                    label: 'Column Name',
                    required: true
                  }
                }
              }
            },
            rowNames: {
              type: 'array',
              label: 'Row Names',
              titleField: 'name',
              inline: true,
              fields: {
                add: {
                  name: {
                    type: 'string',
                    label: 'Row Name',
                    required: true
                  }
                }
              }
            },
            cellData: {
              type: 'array',
              label: 'Cell Values',
              titleField: 'cellLabel',
              fields: {
                add: {
                  rowIndex: {
                    type: 'integer',
                    label: 'Row Number',
                    required: true,
                    min: 0
                  },
                  columnIndex: {
                    type: 'integer',
                    label: 'Column Number',
                    required: true,
                    min: 0
                  },
                  value: {
                    type: 'string',
                    label: 'Cell Value',
                    textarea: true
                  },
                  cellLabel: {
                    type: 'string',
                    label: 'Label (for UI)',
                    def: 'Cell'
                  }
                }
              }
            }
          }
        }
      },

      // Features (rich text)
      features: {
        type: 'area',
        label: 'Product Features',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: ['bold', 'italic', 'bulletList']
            }
          }
        }
      },

      // Variants array
      variants: {
        type: 'array',
        label: 'Product Variants',
        titleField: 'sku',
        fields: {
          add: {
            size: {
              type: 'string',
              label: 'Size'
            },
            color: {
              type: 'string',
              label: 'Color'
            },
            thickness: {
              type: 'string',
              label: 'Thickness'
            },
            otherOptions: {
              type: 'string',
              label: 'Other Options',
              textarea: true
            },
            price: {
              type: 'float',
              label: 'Price',
              required: true,
              min: 0
            },
            sku: {
              type: 'string',
              label: 'SKU',
              required: true
            },
            optionValues: {
              type: 'string',
              label: 'Option Values',
              textarea: true,
              help: 'Comma-separated option values'
            }
          }
        }
      },

      // Category relationship (one category per product)
      _category: {
        type: 'relationship',
        label: 'Category',
        withType: 'category',
        max: 1,
        required: true,
        builders: {
          project: {
            title: 1,
            slug: 1,
            _url: 1
          }
        }
      },

      // Area for dynamic sections
      sections: {
        type: 'area',
        label: 'Page Sections',
        options: {
          expanded: true,
          groups: {
            content: {
              label: 'Content Sections',
              widgets: {
                'hero-section': {},
                'testimonials-section': {},
                'faq-section': {},
                'specifications-display': {},
                'image-gallery-section': {},
                'cta-section': {},
                'related-products': {}
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
        fields: ['title', 'description', '_category']
      },
      media: {
        label: 'Images',
        fields: ['images']
      },
      details: {
        label: 'Product Details',
        fields: ['specifications', 'informationTable', 'features', 'variants']
      },
      layout: {
        label: 'Page Layout',
        fields: ['sections']
      }
    }
  }
};
