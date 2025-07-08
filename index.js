export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('url');

  if (!target) {
    return new Response('Missing "url" parameter', { status: 400 });
  }

  try {
    const res = await fetch(target, {
      headers: {
        'user-agent': req.headers.get('user-agent') || '',
        'referer': 'https://www.faselhds.xyz/',
      },
    });

    const contentType = res.headers.get('content-type') || 'text/html';
    const body = await res.text();

    return new Response(body, {
      status: res.status,
      headers: {
        'content-type': contentType,
        'access-control-allow-origin': '*',
        'access-control-allow-headers': '*',
      },
    });
  } catch (err) {
    return new Response(`Error fetching: ${err.message}`, { status: 500 });
  }
}
