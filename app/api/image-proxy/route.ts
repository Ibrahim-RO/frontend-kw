import { NextRequest, NextResponse } from 'next/server'

// Hosts de fotos que no mandan CORS abierto y por eso necesitan pasar por
// aquí para poder incrustarse en el PDF generado en el navegador (ej. fotos
// de agente en avatar.kwconnect.com). Los hosts de fotos de propiedad ya
// mandan Access-Control-Allow-Origin: * y no necesitan este proxy.
const ALLOWED_HOSTS = new Set(['avatar.kwconnect.com'])

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) {
    return NextResponse.json({ message: 'Falta el parámetro url' }, { status: 400 })
  }

  let target: URL
  try {
    target = new URL(url)
  } catch {
    return NextResponse.json({ message: 'URL inválida' }, { status: 400 })
  }

  if (target.protocol !== 'https:' || !ALLOWED_HOSTS.has(target.hostname)) {
    return NextResponse.json({ message: 'Host no permitido' }, { status: 400 })
  }

  try {
    const upstream = await fetch(target, { headers: { Accept: 'image/*' } })
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ message: 'No se pudo obtener la imagen' }, { status: 502 })
    }

    return new NextResponse(upstream.body, {
      headers: {
        'Content-Type': upstream.headers.get('content-type') ?? 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return NextResponse.json({ message: 'No se pudo obtener la imagen' }, { status: 502 })
  }
}
