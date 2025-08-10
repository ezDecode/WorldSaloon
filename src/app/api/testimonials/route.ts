import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

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

export async function GET(request: Request) {
  const headers = {
    'Cache-Control': 'public, max-age=300, s-maxage=300', // 5 minutes cache
    'Content-Type': 'application/json',
  };

  try {
    initializeFirebaseAdmin();

    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const cursor = searchParams.get('cursor');

    const DEFAULT_LIMIT = 6; // Reduced for better performance
    const MAX_LIMIT = 20;    // Reduced max limit
    const limit = Math.min(
      Math.max(parseInt(limitParam || `${DEFAULT_LIMIT}`, 10) || DEFAULT_LIMIT, 1),
      MAX_LIMIT
    );

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
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch testimonials',
        testimonials: [],
        nextCursor: null,
        hasMore: false,
        total: 0
      }, 
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
        }
      }
    );
  }
}