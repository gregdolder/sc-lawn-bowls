import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  token: import.meta.env.VITE_SANITY_TOKEN // Only if you want to update content with the client
});

// Set up a helper function for generating image URLs with the image pipeline
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to fetch events
export async function getEvents() {
  return sanityClient.fetch(`
    *[_type == "event"] | order(startDate asc) {
      _id,
      title,
      slug,
      eventType,
      startDate,
      endDate,
      location,
      description,
      image,
      isFeatured,
      registrationUrl,
      registrationRequired
    }
  `);
}

// Helper function to fetch featured events
export async function getFeaturedEvents() {
  return sanityClient.fetch(`
    *[_type == "event" && isFeatured == true] | order(startDate asc) {
      _id,
      title,
      slug,
      eventType,
      startDate,
      endDate,
      location,
      description,
      image,
      registrationUrl,
      registrationRequired
    }
  `);
}

// Helper function to fetch blog posts
export async function getPosts() {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author,
      mainImage,
      categories[]->{
        _id,
        title
      },
      publishedAt,
      excerpt,
      content
    }
  `);
}

// Helper function to fetch gallery albums
export async function getGalleryAlbums() {
  return sanityClient.fetch(`
    *[_type == "galleryAlbum"] | order(date desc) {
      _id,
      title,
      slug,
      description,
      date,
      coverImage,
      "photoCount": count(photos)
    }
  `);
}

// Helper function to fetch photos from an album
export async function getGalleryPhotos(albumId: string) {
  return sanityClient.fetch(`
    *[_type == "galleryAlbum" && _id == $albumId][0] {
      photos[] {
        _key,
        image,
        caption
      }
    }
  `, { albumId });
}

// Define types for Sanity gallery photo
interface SanityGalleryPhoto {
  _id?: string;
  _key?: string;
  title?: string;
  caption?: string;
  image?: any;
  imageUrl?: string;
  albumTitle?: string;
  albumId?: string;
}

interface SanityGalleryAlbum {
  _id: string;
  title: string;
  description?: string;
  publishedAt?: string;
  coverImage?: any;
  coverImageUrl?: string;
  photos?: SanityGalleryPhoto[];
}

// Function to test basic Sanity connectivity
export async function testSanityConnection() {
  try {
    console.log("Testing Sanity connection...");
    // Try to fetch a single document from Sanity to verify connectivity
    const result = await sanityClient.fetch(`*[_type == "galleryAlbum"][0...1]`);
    console.log("Sanity connection test result:", result);
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error("Sanity connection test failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

// Helper function to fetch albums with their photos
export async function getGalleryAlbumsWithPhotos(): Promise<SanityGalleryAlbum[]> {
  try {
    // First we need to check if we can connect to Sanity
    const connectionTest = await testSanityConnection();
    if (!connectionTest.success) {
      console.error("Cannot fetch gallery albums - Sanity connection failed");
      return [];
    }
    
    console.log("Fetching gallery albums and photos...");

    // First get all albums
    const basicAlbumsQuery = `*[_type == "galleryAlbum"] | order(publishedAt desc) {
      _id,
      title,
      description,
      publishedAt,
      featured,
      "coverImage": coverImage.asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      }
    }`;
    
    // Get basic album data
    const basicAlbums = await sanityClient.fetch(basicAlbumsQuery);
    console.log('Basic albums data:', basicAlbums);
    
    if (!basicAlbums || basicAlbums.length === 0) {
      console.warn("No gallery albums returned from Sanity query");
      return [];
    }
    
    // Inspect one album to understand structure
    if (basicAlbums.length > 0) {
      console.log('Sample album inspection:', basicAlbums[0]);
    }
    
    // Get all photos in a separate query
    const allPhotosQuery = `*[_type == "galleryPhoto"] {
      _id,
      title,
      description,
      "album": album->{ _id, title },
      "image": image.asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      }
    }`;
    
    const allPhotos = await sanityClient.fetch(allPhotosQuery);
    console.log('All photos:', allPhotos);
    
    // Now build albums with their photos
    const processedAlbums = basicAlbums.map((album: any) => {
      // Find photos for this album
      const albumPhotos = allPhotos.filter((photo: any) => 
        photo.album && photo.album._id === album._id
      );
      
      console.log(`Album "${album.title}" has ${albumPhotos.length} matching photos`);
      
      // Process cover image URL
      let coverImageUrl = null;
      if (album.coverImage && album.coverImage.url) {
        coverImageUrl = album.coverImage.url;
      }
      
      // Map photos to expected format
      const mappedPhotos = albumPhotos.map((photo: any) => ({
        _id: photo._id,
        title: photo.title,
        caption: photo.description,
        image: photo.image,
        imageUrl: photo.image?.url || null
      }));
      
      return {
        _id: album._id,
        title: album.title,
        description: album.description || '',
        coverImage: album.coverImage,
        coverImageUrl: coverImageUrl,
        photos: mappedPhotos
      };
    });
    
    console.log('Final processed albums:', processedAlbums);
    return processedAlbums;
  } catch (error) {
    console.error('Error fetching gallery albums:', error);
    return [];
  }
}

// Keep the original function for backward compatibility
export async function getRecentGalleryPhotos(limit = 8): Promise<SanityGalleryPhoto[]> {
  try {
    // First test the connection
    const connectionTest = await testSanityConnection();
    if (!connectionTest.success) {
      console.error("Cannot fetch gallery photos - Sanity connection failed");
      return [];
    }

    console.log("Fetching gallery photos with correct schema structure...");
    
    // Correct query based on the actual schema - galleryPhoto documents reference albums
    const galleryPhotos: SanityGalleryPhoto[] = await sanityClient.fetch(`
      *[_type == "galleryPhoto"] | order(publishedAt desc) [0...$limit] {
        _id,
        _key,
        title,
        "caption": description,
        "imageUrl": image.asset->url,
        image,
        "albumTitle": album->title,
        "albumId": album->_id
      }
    `, { limit });
    
    console.log(`Received ${galleryPhotos?.length || 0} gallery photos from Sanity`);
    
    if (!galleryPhotos || galleryPhotos.length === 0) {
      console.warn("No gallery photos returned from Sanity query");
      return [];
    }
    
    // Log the first photo to diagnose structure issues
    if (galleryPhotos.length > 0) {
      console.log(`Total photos found: ${galleryPhotos.length}`);
      console.log("First photo structure:", JSON.stringify(galleryPhotos[0]));
    }
    
    return galleryPhotos;
  } catch (err) {
    console.error("Error fetching gallery photos:", err);
    return [];
  }
} 