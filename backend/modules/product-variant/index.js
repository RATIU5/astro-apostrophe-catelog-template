export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Product Variant',
    pluralLabel: 'Product Variants',
    alias: 'productVariant',
    localized: true,
    autopublish: false,
    searchable: true,
    quickCreate: true,
    sort: { sku: 1 }
  },
  fields: {
    add: {
      sku: {
        type: 'string',
        label: 'SKU',
        help: 'Stock Keeping Unit - must be unique across all variants',
        required: true
      },
      // Option values for this variant
      optionValues: {
        type: 'array',
        label: 'Option Values',
        help: 'Define the option combinations for this variant (e.g., Size: Small, Color: Red)',
        titleField: 'label',
        inline: true,
        style: 'table',
        fields: {
          add: {
            optionName: {
              type: 'string',
              label: 'Option Type',
              help: 'e.g., "Size", "Color", "Material"',
              required: true
            },
            value: {
              type: 'string',
              label: 'Value',
              help: 'e.g., "Small", "Red", "Cotton"',
              required: true
            },
            label: {
              type: 'string',
              label: 'Display Label',
              help: 'Optional custom display label'
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
        label: 'Compare at Price',
        help: 'Original price (for showing discounts)',
        min: 0
      },
      // Inventory
      barcode: {
        type: 'string',
        label: 'Barcode',
        help: 'ISBN, UPC, GTIN, or other barcode'
      },
      quantity: {
        type: 'integer',
        label: 'Stock Quantity',
        help: 'Current inventory level',
        def: 0,
        min: 0
      },
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
        help: 'Weight in pounds for shipping calculations',
        min: 0
      },
      requiresShipping: {
        type: 'boolean',
        label: 'Requires Shipping',
        help: 'Uncheck for digital products',
        def: true
      },
      // Optional image for this specific variant
      image: {
        type: 'area',
        label: 'Variant Image',
        help: 'Optional image specific to this variant',
        max: 1,
        options: {
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['title', 'sku', 'optionValues']
      },
      pricing: {
        label: 'Pricing',
        fields: ['price', 'compareAtPrice']
      },
      inventory: {
        label: 'Inventory',
        fields: ['barcode', 'quantity', 'available']
      },
      shipping: {
        label: 'Shipping',
        fields: ['weight', 'requiresShipping']
      },
      media: {
        label: 'Media',
        fields: ['image']
      }
    }
  },
  // Make all fields available via API
  apiProjection: {
    title: 1,
    sku: 1,
    optionValues: 1,
    price: 1,
    compareAtPrice: 1,
    barcode: 1,
    quantity: 1,
    available: 1,
    weight: 1,
    requiresShipping: 1,
    image: 1
  },
  methods(self) {
    return {
      // Get display name for variant (e.g., "Small / Red")
      getDisplayName(variant) {
        if (!variant.optionValues || variant.optionValues.length === 0) {
          return variant.title || variant.sku;
        }
        return variant.optionValues
          .map(opt => opt.value)
          .join(' / ');
      },

      // Check if variant is in stock
      isInStock(variant) {
        return variant.available !== false && variant.quantity > 0;
      },

      // Get discount percentage
      getDiscountPercentage(variant) {
        if (!variant.compareAtPrice || variant.compareAtPrice <= variant.price) {
          return 0;
        }
        return Math.round((1 - variant.price / variant.compareAtPrice) * 100);
      },

      // Get option value by option name
      getOptionValue(variant, optionName) {
        if (!variant.optionValues) {
          return null;
        }
        const option = variant.optionValues.find(
          opt => opt.optionName.toLowerCase() === optionName.toLowerCase()
        );
        return option ? option.value : null;
      }
    };
  }
};
