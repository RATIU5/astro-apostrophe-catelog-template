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
      _variants: 1,
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
        type: 'area',
        label: 'Product Images',
        options: {
          max: 15,
          widgets: {
            '@apostrophecms/image': {}
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

      // Product variants (relationship to centralized variants)
      _variants: {
        type: 'relationship',
        label: 'Product Variants',
        help: 'Select pre-defined variants for this product. Create variants in the "Product Variants" section first.',
        withType: 'product-variant',
        builders: {
          project: {
            title: 1,
            sku: 1,
            optionValues: 1,
            price: 1
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
        fields: ['specifications', 'informationTable', 'features']
      },
      variants: {
        label: 'Product Variants',
        fields: ['_variants']
      }
    }
  },

  // Helper methods for working with variants
  methods(self) {
    return {
      // Calculate price range for a product
      getPriceRange(product) {
        const variants = (product._variants || []).filter(v => v.available !== false);

        if (variants.length === 0) {
          return null;
        }

        const prices = variants.map(v => v.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        return {
          min,
          max,
          formatted: min === max
            ? `$${min.toFixed(2)}`
            : `$${min.toFixed(2)} - $${max.toFixed(2)}`
        };
      },

      // Get available variants (not hidden)
      getAvailableVariants(product) {
        return (product._variants || []).filter(v => v.available !== false);
      },

      // Find variant by SKU
      findVariantBySku(product, sku) {
        return (product._variants || []).find(v => v.sku === sku);
      },

      // Get lowest price from variants
      getStartingPrice(product) {
        const variants = self.getAvailableVariants(product);
        if (variants.length === 0) {
          return null;
        }
        return Math.min(...variants.map(v => v.price));
      }
    };
  }
};
