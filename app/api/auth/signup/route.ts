import { runStatement, serviceFailure } from '@/lib/platform-db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return Response.json({ ok: false, error: 'All fields are required' }, { status: 400 })
    }

    const sql = `INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)`
    await runStatement(sql, [name, email, password])

    return Response.json({ ok: true, message: 'Account created successfully' }, { status: 201 })
  } catch (reason) {
    return serviceFailure(reason)
  }
}