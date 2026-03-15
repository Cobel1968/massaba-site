export async function POST(req) {

  const data = await req.json()

  console.log('New inquiry:', data)

  return new Response(
    JSON.stringify({ message: 'Inquiry received' }),
    { status: 200 }
  )
}
