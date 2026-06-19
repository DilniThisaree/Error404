import { runStatement, serviceFailure } from '@/lib/platform-db'

// ==========================================
// 1. GET FUNCTION (ගිණුම් බැලීම සඳහා)
// ==========================================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userIdRaw = searchParams.get('userId')
    
    if (!userIdRaw) {
      return Response.json({ ok: false, error: 'userId is required' }, { status: 400 })
    }

    const userId = parseInt(userIdRaw, 10)
    if (isNaN(userId)) {
      return Response.json({ ok: false, error: 'Invalid userId' }, { status: 400 })
    }

    const sql = `
      SELECT id, account_number, account_name, balance 
      FROM accounts 
      WHERE user_id = ? 
      ORDER BY id
    `
    const result = await runStatement(sql, [userId])

    return Response.json({ ok: true, accounts: result.rows })
  } catch (reason) {
    return serviceFailure(reason)
  }
}

// ==========================================
// 2. POST FUNCTION (නව ගිණුමක් සෑදීම සඳහා)
// ==========================================
export async function POST(request: Request) {
  try {
    // Frontend එකෙන් එවන දත්ත ලබා ගැනීම
    const body = await request.json()
    const { userId, accountNumber, accountName, accountType } = body

    if (!userId || !accountNumber || !accountName) {
      return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    // අලුත් ගිණුම Database එකට ඇතුලත් කිරීම (0 balance එකකින් ආරම්භ වේ)
    const sql = `
      INSERT INTO accounts (user_id, account_number, account_name, type, balance) 
      VALUES (?, ?, ?, ?, 0)
    `
    await runStatement(sql, [userId, accountNumber, accountName, accountType || 'Savings'])

    return Response.json({ ok: true, message: 'Account created successfully' }, { status: 201 })
  } catch (reason) {
    return serviceFailure(reason)
  }
}

// ==========================================
// 3. DELETE FUNCTION (ගිණුමක් ඉවත් කිරීම සඳහා)
// ==========================================
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accountIdRaw = searchParams.get('accountId')
    
    if (!accountIdRaw) {
      return Response.json({ ok: false, error: 'accountId is required' }, { status: 400 })
    }

    const accountId = parseInt(accountIdRaw, 10)
    if (isNaN(accountId)) {
      return Response.json({ ok: false, error: 'Invalid accountId' }, { status: 400 })
    }

    const sql = `DELETE FROM accounts WHERE id = ?`
    await runStatement(sql, [accountId])

    return Response.json({ ok: true, message: 'Account deleted successfully' })
  } catch (reason) {
    return serviceFailure(reason)
  }
}