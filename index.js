// api/index.js
export const config = { runtime: 'edge' };

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('url');
  if (!target) {
    return new Response('Missing `url` parameter', { status: 400 });
  }
  // Forward user-agent and referer
  const headers = {
    'User-Agent': request.headers.get('user-agent') || '',
    'Referer':   request.headers.get('referer')   || ''
  };
  try {
    const res = await fetch(target, { headers });
    const body = await res.text();
    // Return fetched HTML with CORS header
    return new Response(body, {
      headers: {
        'content-type': 'text/html',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(`Error fetching target: ${err}`, { status: 500 });
  }
}
