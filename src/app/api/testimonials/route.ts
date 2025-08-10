import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Fallback testimonials for development
const FALLBACK_TESTIMONIALS = [
  {
    id: 'dev-1',
    name: 'Rajinder Singh',
    quote: 'Excellent service! The barber really knows how to style Punjabi beards perfectly.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajinder',
    rating: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'dev-2',
    name: 'Manpreet Kaur',
    quote: 'My husband always comes back looking amazing. Great attention to detail!',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manpreet',
    rating: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'dev-3',
    name: 'Hardeep Sharma',
    quote: 'Best barbershop in Kapurthala! Professional service and great atmosphere.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hardeep',
    rating: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'dev-4',
    name: 'Gurpreet Singh',
    quote: 'Traditional techniques with modern style. Highly recommend!',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gurpreet',
    rating: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'dev-5',
    name: 'Simran Kaur',
    quote: 'My family has been coming here for years. Always satisfied with the service.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=simran',
    rating: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'dev-6',
    name: 'Jasbir Singh',
    quote: 'Perfect beard trim every time. The barber understands Sikh grooming traditions.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jasbir',
    rating: 5,
    createdAt: new Date().toISOString(),
  },
];

// Initialize Firebase Admin with error handling
function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    return;
  }

  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    if (process.env.GOOGLE_CLIENT_EMAIL && privateKey && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
    } else {
      // Fallback for development
      initializeApp({ 
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID 
      });
    }
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error;
  }
}

function isFirebaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== 'your-project-id' &&
    process.env.GOOGLE_CLIENT_EMAIL &&
    process.env.GOOGLE_CLIENT_EMAIL !== 'your-client-email@your-project-id.iam.gserviceaccount.com'
  );
}

export async function GET(request: Request) {
  const headers = {
    'Cache-Control': 'public, max-age=300, s-maxage=300', // 5 minutes cache
    'Content-Type': 'application/json',
  };

  try {
    // Check if Firebase is properly configured
    if (!isFirebaseConfigured()) {
      console.log('Firebase not configured, using fallback testimonials for development');
      
      const { searchParams } = new URL(request.url);
      const limitParam = searchParams.get('limit');
      const limit = Math.min(parseInt(limitParam || '6', 10) || 6, 20);
      
      // Return fallback testimonials
      const testimonials = FALLBACK_TESTIMONIALS.slice(0, limit);
      
      return NextResponse.json({ 
        testimonials,
        nextCursor: null,
        hasMore: false,
        total: testimonials.length 
      }, { 
        status: 200,
        headers 
      });
    }

    initializeFirebaseAdmin();

    const { searchParams } = new URL(request.url);
    const paramsSchema = z.object({
      limit: z
        .string()
        .regex(/^\d+$/)
        .transform((v) => parseInt(v, 10))
        .refine((v) => v >= 1 && v <= 20, 'limit must be between 1 and 20')
        .optional(),
      cursor: z.string().min(1).optional(),
    });
    const parsed = paramsSchema.safeParse({
      limit: searchParams.get('limit') ?? undefined,
      cursor: searchParams.get('cursor') ?? undefined,
    });
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: parsed.error.issues },
        { status: 400, headers }
      );
    }
    const DEFAULT_LIMIT = 6;
    const limit = parsed.data.limit ?? DEFAULT_LIMIT;
    const cursor = parsed.data.cursor;

    const db = getFirestore();
    let query = db
      .collection('testimonials')
      .where('approved', '==', true) // Only get approved testimonials
      .orderBy('createdAt', 'desc')
      .limit(limit);

    if (cursor) {
      try {
        const docSnap = await db.collection('testimonials').doc(cursor).get();
        if (docSnap.exists) {
          query = query.startAfter(docSnap);
        }
      } catch (cursorError) {
        console.warn('Invalid cursor provided:', cursor);
        // Continue without cursor
      }
    }

    const snapshot = await query.get();

    const testimonials = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || 'Anonymous',
        quote: data.quote || '',
        avatarUrl: data.avatarUrl || null,
        rating: data.rating || 5,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    });

    const nextCursor = snapshot.docs.length === limit 
      ? snapshot.docs[snapshot.docs.length - 1].id 
      : null;

    const hasMore = snapshot.docs.length === limit;

    return NextResponse.json({ 
      testimonials, 
      nextCursor,
      hasMore,
      total: testimonials.length 
    }, { 
      status: 200,
      headers 
    });

  } catch (error) {
    console.error('Error fetching testimonials:', error);
    
    // Return fallback testimonials even on error
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = Math.min(parseInt(limitParam || '6', 10) || 6, 20);
    const testimonials = FALLBACK_TESTIMONIALS.slice(0, limit);
    
    return NextResponse.json(
      { 
        testimonials,
        nextCursor: null,
        hasMore: false,
        total: testimonials.length
      }, 
      { 
        status: 200, // Return 200 instead of 500 for fallback
        headers 
      }
    );
  }
}