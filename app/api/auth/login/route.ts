import { runStatement, serviceFailure } from '@/lib/platform-db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return Response.json({ ok: false, error: 'Email and password are required' }, { status: 400 })
    }

    const sql = `SELECT id, full_name, email FROM users WHERE email = ? AND password = ?`
    const result = await runStatement(sql, [email, password])

    if (result.rows.length === 0) {
      return Response.json({ ok: false, error: 'Invalid email or password' }, { status: 401 })
    }

    const user = result.rows[0]
    
    // මෙහිදී සාමාන්‍යයෙන් JWT Token එකක් හෝ Session එකක් හදලා යවනවා
    return Response.json({ ok: true, message: 'Login successful', user })
  } catch (reason) {
    return serviceFailure(reason)
  }
}