// modules/product/index.js
export default {
  extend: '@apostrophecms/piece-type',

  options: {
    label: 'Product',
    pluralLabel: 'Products',
    shortcut: 'Shift+Alt+P'
  },

  fields: {
    add: {
      // BASIC INFO
      description: {
        type: 'area',
        label: 'Product Description',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                'bold',
                'italic',
                'link',
                'bulletList',
                'orderedList'
              ]
            }
          }
        }
      },

      _images: {
        type: 'relationship',
        label: 'Product Images',
        withType: '@apostrophecms/image',
        max: 20,
        help: 'Product gallery images'
      },

      // FEATURES
      features: {
        type: 'array',
        label: 'Features',
        help: 'Bullet point features displayed on product page',
        titleField: 'text',
        inline: true,
        fields: {
          add: {
            text: {
              type: 'string',
              label: 'Feature',
              textarea: true,
              required: true
            }
          }
        }
      },

      // PRICING
      basePrice: {
        type: 'float',
        label: 'Base Price',
        help: 'Default price (can be overridden per variant)',
        required: true,
        min: 0
      },

      // STEP 1: Define product option types (Size, Color, etc.)
      options: {
        type: 'array',
        label: 'Product Options',
        help: 'Define the types of options (Size, Color, Thickness, etc.)',
        titleField: 'name',
        inline: true,
        style: 'table',
        fields: {
          add: {
            name: {
              type: 'string',
              label: 'Option Name',
              help: 'e.g., "Size", "Color", "Thickness"',
              required: true
            },
            values: {
              type: 'string',
              label: 'Values',
              help: 'Comma-separated. e.g., "Twin, Full, Queen, King" or "Red, Blue, Green"',
              required: true,
              textarea: true
            }
          }
        }
      },

      // STEP 2: Define actual variants
      variants: {
        type: 'array',
        label: 'Product Variants',
        help: 'Individual product variations with their specific options',
        titleField: 'name',
        fields: {
          add: {
            name: {
              type: 'string',
              label: 'Variant Name',
              help: 'e.g., "Cal King", "Queen - Blue"',
              required: true
            },

            sku: {
              type: 'string',
              label: 'SKU',
              help: 'Unique identifier for this variant',
              required: true
            },

            // Dynamic option values
            optionValues: {
              type: 'array',
              label: 'Option Values',
              help: 'Select the specific values for each option',
              inline: true,
              style: 'table',
              titleField: 'optionName',
              fields: {
                add: {
                  optionName: {
                    type: 'string',
                    label: 'Option',
                    help: 'e.g., "Size", "Color" (must match option name above)'
                  },
                  value: {
                    type: 'string',
                    label: 'Value',
                    help: 'e.g., "Queen", "Blue"'
                  }
                }
              }
            },

            price: {
              type: 'float',
              label: 'Price',
              help: 'Price for this specific variant',
              required: true,
              min: 0
            },

            // Flexible dimensions per variant
            dimensions: {
              type: 'array',
              label: 'Dimensions',
              help: 'Dimension specifications for this variant',
              inline: true,
              style: 'table',
              titleField: 'name',
              fields: {
                add: {
                  name: {
                    type: 'string',
                    label: 'Dimension Name',
                    help: 'e.g., "Length", "Width", "Height", "Diameter"',
                    required: true
                  },
                  value: {
                    type: 'string',
                    label: 'Value',
                    help: 'e.g., 83", 6", 52.5"',
                    required: true
                  }
                }
              }
            },

            available: {
              type: 'boolean',
              label: 'Available for Purchase',
              def: true,
              help: 'Uncheck to temporarily disable this variant'
            }
          }
        }
      },

      // ORGANIZATION
      _categories: {
        type: 'relationship',
        label: 'Categories',
        withType: 'product-category',
        builders: {
          project: {
            title: 1,
            slug: 1
          }
        }
      },

      tags: {
        type: 'array',
        label: 'Tags',
        inline: true,
        style: 'table',
        titleField: 'name',
        fields: {
          add: {
            name: {
              type: 'string',
              label: 'Tag'
            }
          }
        }
      },

      // SPECIFICATIONS - Flexible groups
      specifications: {
        type: 'array',
        label: 'Specifications',
        help: 'Product specification groups (Materials, Certifications, Warranty, etc.)',
        titleField: 'groupName',
        fields: {
          add: {
            groupName: {
              type: 'string',
              label: 'Group Name',
              help: 'e.g., "MATERIALS", "CERTIFICATIONS", "WARRANTY"',
              required: true
            },
            value: {
              type: 'string',
              label: 'Value',
              textarea: true,
              required: true
            }
          }
        }
      },

      // SEO
      seoDescription: {
        type: 'string',
        label: 'Meta Description',
        textarea: true,
        max: 160,
        help: 'Description for search engines (160 characters max)'
      }
    },

    group: {
      basics: {
        label: 'Basic Information',
        fields: [ 'title', '_images', 'description', 'features', 'basePrice' ]
      },
      options: {
        label: 'Options & Variants',
        fields: [ 'options', 'variants' ]
      },
      organization: {
        label: 'Categories & Tags',
        fields: [ '_categories', 'tags' ]
      },
      specifications: {
        label: 'Specifications',
        fields: [ 'specifications' ]
      },
      seo: {
        label: 'SEO',
        fields: [ 'seoDescription' ]
      }
    }
  },

  methods(self) {
    return {
      // Get available variants
      getAvailableVariants(product) {
        return (product.variants || []).filter(v => v.available !== false);
      },

      // Get variant by SKU
      findVariantBySku(product, sku) {
        return (product.variants || []).find(v => v.sku === sku);
      },

      // Get effective price for a variant
      getVariantPrice(product, variant) {
        return variant.price || product.basePrice;
      },

      // Get price range string
      getPriceRange(product) {
        const variants = self.getAvailableVariants(product);
        if (!variants.length) {
          return {
            min: product.basePrice,
            max: product.basePrice,
            formatted: `$${product.basePrice.toFixed(2)}`
          };
        }

        const prices = variants.map(v => self.getVariantPrice(product, v));
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

      // Parse option values into structured format
      getOptionsStructured(product) {
        if (!product.options) {
          return [];
        }

        return product.options.map(option => ({
          name: option.name,
          values: option.values
            .split(',')
            .map(v => v.trim())
            .filter(v => v)
        }));
      },

      // Get variant options as object for easier access
      getVariantOptions(variant) {
        if (!variant.optionValues) {
          return {};
        }

        return variant.optionValues.reduce((acc, opt) => {
          acc[opt.optionName] = opt.value;
          return acc;
        }, {});
      },

      // Format variant display name with options
      getVariantDisplayName(variant) {
        const options = self.getVariantOptions(variant);
        const optionStr = Object.entries(options)
          .map(([ key, val ]) => val)
          .join(' / ');

        return optionStr ? `${variant.name} (${optionStr})` : variant.name;
      },

      // Get dimensions as object for easier access
      getVariantDimensions(variant) {
        if (!variant.dimensions) {
          return {};
        }

        return variant.dimensions.reduce((acc, dim) => {
          acc[dim.name] = dim.value;
          return acc;
        }, {});
      },

      // Get all unique dimension names across variants
      getDimensionColumns(product) {
        const variants = product.variants || [];
        const columnSet = new Set();

        variants.forEach(variant => {
          if (variant.dimensions) {
            variant.dimensions.forEach(dim => {
              columnSet.add(dim.name);
            });
          }
        });

        return Array.from(columnSet);
      }
    };
  },

  // API routes for frontend
  apiRoutes(self) {
    return {
      get: {
        // Get variant details
        async ':id/variant/:sku'(req) {
          const product = await self.find(req, { _id: req.params.id }).toObject();
          if (!product) {
            throw self.apos.error('notfound');
          }

          const variant = self.findVariantBySku(product, req.params.sku);
          if (!variant) {
            throw self.apos.error('notfound');
          }

          return {
            variant: {
              ...variant,
              price: self.getVariantPrice(product, variant),
              displayName: self.getVariantDisplayName(variant),
              options: self.getVariantOptions(variant),
              dimensions: self.getVariantDimensions(variant)
            },
            product: {
              title: product.title,
              slug: product.slug,
              images: product._images
            }
          };
        }
      }
    };
  }
};
