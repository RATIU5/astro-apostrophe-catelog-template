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
      productOptions: 1,
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

      // STEP 1: Define product options (Shopify-style)
      productOptions: {
        type: 'array',
        label: 'Product Options',
        help: 'Define option types like Size, Color, Material. Each variant will use combinations of these options.',
        titleField: 'name',
        inline: true,
        style: 'table',
        max: 3,  // Most products have 2-3 option types
        fields: {
          add: {
            name: {
              type: 'string',
              label: 'Option Name',
              help: 'e.g., "Size", "Color", "Material"',
              required: true
            },
            values: {
              type: 'string',
              label: 'Option Values',
              help: 'Comma-separated values. e.g., "Small, Medium, Large" or "Red, Blue, Green"',
              required: true,
              textarea: true
            }
          }
        }
      },

      // STEP 2: Create product variants
      variants: {
        type: 'array',
        label: 'Product Variants',
        help: 'Create a variant for each combination of options. Example: Size=Small + Color=Red',
        titleField: 'sku',
        fields: {
          add: {
            // Structured option values
            optionValues: {
              type: 'array',
              label: 'Option Values',
              help: 'Select the option and enter its value for this variant',
              titleField: 'label',
              inline: true,
              style: 'table',
              fields: {
                add: {
                  optionName: {
                    type: 'string',
                    label: 'Option',
                    help: 'Must match an option name defined above (e.g., "Size", "Color")',
                    required: true
                  },
                  value: {
                    type: 'string',
                    label: 'Value',
                    help: 'Must match a value from the option above (e.g., "Small", "Red")',
                    required: true
                  },
                  label: {
                    type: 'string',
                    label: 'Display Label',
                    help: 'Auto-generated for UI: e.g., "Size: Small"'
                  }
                }
              }
            },

            // Pricing
            price: {
              type: 'float',
              label: 'Price',
              help: 'Selling price for this variant',
              required: true,
              min: 0
            },

            compareAtPrice: {
              type: 'float',
              label: 'Compare At Price',
              help: 'Original price (for showing discounts)',
              min: 0
            },

            // SKU and inventory
            sku: {
              type: 'string',
              label: 'SKU',
              help: 'Unique identifier for this variant. Example: PROD-SM-RED',
              required: true
            },

            barcode: {
              type: 'string',
              label: 'Barcode (ISBN, UPC, GTIN)',
              help: 'Product barcode for inventory management'
            },

            quantity: {
              type: 'integer',
              label: 'Stock Quantity',
              help: 'Current inventory level',
              def: 0,
              min: 0
            },

            // Availability
            available: {
              type: 'boolean',
              label: 'Available for Purchase',
              help: 'Uncheck to hide this variant from customers',
              def: true
            },

            // Shipping
            weight: {
              type: 'float',
              label: 'Weight (lbs)',
              help: 'Used for shipping calculations',
              min: 0
            },

            requiresShipping: {
              type: 'boolean',
              label: 'Requires Shipping',
              def: true,
              help: 'Uncheck for digital products'
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
        fields: ['specifications', 'informationTable', 'features']
      },
      options: {
        label: 'Options & Variants',
        fields: ['productOptions', 'variants']
      },
      layout: {
        label: 'Page Layout',
        fields: ['sections']
      }
    }
  },

  // Helper methods for working with options and variants
  methods(self) {
    return {
      // Parse comma-separated option values into array
      getOptionValues(option) {
        if (!option || !option.values) {
          return [];
        }
        return option.values
          .split(',')
          .map(v => v.trim())
          .filter(v => v);
      },

      // Get all options structured as objects
      getOptionsStructured(product) {
        if (!product.productOptions) {
          return [];
        }
        return product.productOptions.map(option => ({
          name: option.name,
          values: self.getOptionValues(option)
        }));
      },

      // Get variant options as an object for easier access
      getVariantOptions(variant) {
        if (!variant.optionValues) {
          return {};
        }
        return variant.optionValues.reduce((acc, opt) => {
          acc[opt.optionName] = opt.value;
          return acc;
        }, {});
      },

      // Format variant display name
      getVariantDisplayName(variant) {
        if (!variant.optionValues || variant.optionValues.length === 0) {
          return variant.sku;
        }
        const optionStr = variant.optionValues
          .map(opt => opt.value)
          .join(' / ');
        return optionStr;
      },

      // Calculate price range for a product
      getPriceRange(product) {
        const variants = (product.variants || []).filter(v => v.available !== false);

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

      // Validate that variant option values match defined product options
      validateVariantOptions(product, variant) {
        if (!variant.optionValues || variant.optionValues.length === 0) {
          return { valid: true };
        }

        const productOptions = self.getOptionsStructured(product);
        const errors = [];

        variant.optionValues.forEach(optionValue => {
          // Check if option name exists
          const productOption = productOptions.find(
            opt => opt.name === optionValue.optionName
          );

          if (!productOption) {
            errors.push(
              `Option "${optionValue.optionName}" is not defined in Product Options`
            );
            return;
          }

          // Check if value is valid for this option
          const validValues = productOption.values;
          if (!validValues.includes(optionValue.value)) {
            errors.push(
              `Value "${optionValue.value}" is not valid for option "${optionValue.optionName}". ` +
              `Valid values are: ${validValues.join(', ')}`
            );
          }
        });

        return {
          valid: errors.length === 0,
          errors
        };
      },

      // Get available variants (not hidden)
      getAvailableVariants(product) {
        return (product.variants || []).filter(v => v.available !== false);
      },

      // Find variant by SKU
      findVariantBySku(product, sku) {
        return (product.variants || []).find(v => v.sku === sku);
      },

      // Check if product has any in-stock variants
      hasInStockVariants(product) {
        return (product.variants || []).some(
          v => v.available !== false && v.quantity > 0
        );
      }
    };
  }
};
