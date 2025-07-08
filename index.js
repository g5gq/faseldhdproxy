export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('url');

  if (!target) {
    return new Response('Missing URL param', { status: 400 });
  }

  try {
    const res = await fetch(target, {
      headers: {
        'user-agent': req.headers.get('user-agent') || '',
        'referer': 'https://www.faselhds.xyz/'
      }
    });
    const text = await res.text();

    return new Response(text, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'access-control-allow-origin': '*'
      }
    });
  } catch (e) {
    return new Response('Proxy failed: ' + e.message, { status: 500 });
  }
}
