import { runStatement, serviceFailure } from '@/lib/platform-db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return Response.json({ ok: false, error: 'Email is required' }, { status: 400 })
    }

    const sql = `SELECT id FROM users WHERE email = ?`
    const result = await runStatement(sql, [email])

    if (result.rows.length > 0) {
      // මෙහිදී Email යවන service එකකට කතා කළ යුතුයි (උදා: Resend, SendGrid)
      console.log(`Sending reset link to ${email}`)
    }

    // Security best practice: Email එක තිබ්බත් නැතත් success message එකක් යවන්න.
    // එතකොට hackers ලට accounts තියෙනවද නැද්ද කියලා හොයාගන්න බෑ.
    return Response.json({ 
      ok: true, 
      message: 'If that email exists, a reset link has been sent.' 
    })
  } catch (reason) {
    return serviceFailure(reason)
  }
}