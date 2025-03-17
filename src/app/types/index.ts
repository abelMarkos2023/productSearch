// type SearchResult = {
//     status: string;
//     request_id: string;
//     data: {
//       total_products: number;
//       country: string;
//       domain: string;
//       products: Product[];
//     };
//     parameters: {
//       query: string;
//       country: string;
//       sort_by: string;
//       page: number;
//     };
//   };
  
  export type TSimilarProduct = {
    asin: string;
    climate_pledge_friendly: boolean;
    currency: string;
    delivery: string;
    has_variations: boolean;
    is_amazon_choice: boolean;
    is_best_seller: boolean;
    is_prime: boolean;
    product_minimum_offer_price: string;
    product_num_offers: number;
    product_num_ratings: number;
    product_original_price: string;
    product_photo: string;
    product_price: string;
    product_star_rating: string;
    product_title: string;
    product_url: string;
    sales_volume: string;
  };

  export type TDataSheetResult = {
    displayLink: string;
    fileFormat?: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    htmlSnippet: string;
    htmlTitle: string;
    kind: string;
    link: string;
    mime?: string;
    pagemap?: {
      cse_thumbnail?: { src: string; width: string; height: string }[];
      cse_image?: { src: string }[];
      metatags?: {
        moddate?: string;
        creationdate?: string;
        creator?: string;
        crossmarkdomainexclusive?: string;
        crossmarkdomains_1_?: string;
        crossmarkmajorversiondate?: string;
        doi?: string;
        producer?: string;
        subject?: string;
        title?: string;
        author?: string;
      }[];
    };
    snippet: string;
    title: string;
  };
  
 