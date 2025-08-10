import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

if (!getApps().length) {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\n/g, '\n');
  if (process.env.GOOGLE_CLIENT_EMAIL && privateKey) {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } else {
    initializeApp({ projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const cursor = searchParams.get('cursor');

    const DEFAULT_LIMIT = 12;
    const MAX_LIMIT = 50;
    const limit = Math.min(
      Math.max(parseInt(limitParam || `${DEFAULT_LIMIT}`, 10) || DEFAULT_LIMIT, 1),
      MAX_LIMIT
    );

    const db = getFirestore();
    let query = db.collection('testimonials').orderBy('createdAt', 'desc').limit(limit);

    if (cursor) {
      // Expect cursor to be a document ID to start after
      const docSnap = await db.collection('testimonials').doc(cursor).get();
      if (docSnap.exists) {
        query = query.startAfter(docSnap);
      }
    }

    const snapshot = await query.get();

    const testimonials = snapshot.docs.map((doc) => {
      const data = doc.data() as Record<string, unknown>;
      return {
        id: doc.id,
        name: data.name,
        quote: data.quote,
        avatarUrl: data.avatarUrl,
        createdAt: (data.createdAt as any) ?? null,
      };
    });

    const nextCursor = snapshot.docs.length === limit ? snapshot.docs[snapshot.docs.length - 1].id : null;

    return NextResponse.json({ testimonials, nextCursor }, { status: 200 });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}