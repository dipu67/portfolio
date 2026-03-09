import Database from 'better-sqlite3'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'portfolio.db')

let _db: Database.Database | null = null

function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH)
    _db.pragma('journal_mode = WAL')
    _db.pragma('foreign_keys = ON')
    initTables(_db)
  }
  return _db
}

function initTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS personal (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      data TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS about (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      data TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      value TEXT NOT NULL,
      label TEXT NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL,
      technologies TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      technologies TEXT NOT NULL,
      features TEXT NOT NULL,
      github TEXT,
      live TEXT,
      type TEXT NOT NULL,
      stats TEXT NOT NULL,
      status TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      rating INTEGER NOT NULL,
      image TEXT NOT NULL,
      company TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'unread',
      priority TEXT NOT NULL DEFAULT 'normal',
      submitted_at TEXT NOT NULL,
      read_at TEXT,
      responded_at TEXT,
      notes TEXT DEFAULT ''
    );
  `)
}

// ─── Portfolio Data ───────────────────────────────────────────────

export function getPortfolioData() {
  const db = getDb()

  const personalRow = db.prepare('SELECT data FROM personal WHERE id = 1').get() as { data: string } | undefined
  const aboutRow = db.prepare('SELECT data FROM about WHERE id = 1').get() as { data: string } | undefined

  const statsRows = db.prepare('SELECT value, label, icon, color FROM stats ORDER BY sort_order').all() as Array<{ value: string; label: string; icon: string; color: string }>
  const skillRows = db.prepare('SELECT category, icon, color, technologies FROM skills ORDER BY sort_order').all() as Array<{ category: string; icon: string; color: string; technologies: string }>
  const projectRows = db.prepare('SELECT id, title, description, image, technologies, features, github, live, type, stats, status FROM projects ORDER BY sort_order').all() as Array<any>
  const testimonialRows = db.prepare('SELECT name, role, content, rating, image, company FROM testimonials ORDER BY sort_order').all() as Array<any>

  return {
    personal: personalRow ? JSON.parse(personalRow.data) : {},
    about: aboutRow ? JSON.parse(aboutRow.data) : {},
    stats: statsRows,
    skills: skillRows.map(s => ({
      ...s,
      technologies: JSON.parse(s.technologies),
    })),
    projects: projectRows.map(p => ({
      ...p,
      technologies: JSON.parse(p.technologies),
      features: JSON.parse(p.features),
      stats: JSON.parse(p.stats),
    })),
    testimonials: testimonialRows,
  }
}

export function savePortfolioData(data: any) {
  const db = getDb()

  const saveAll = db.transaction(() => {
    // Personal
    db.prepare('DELETE FROM personal').run()
    db.prepare('INSERT INTO personal (id, data) VALUES (1, ?)').run(JSON.stringify(data.personal))

    // About
    db.prepare('DELETE FROM about').run()
    db.prepare('INSERT INTO about (id, data) VALUES (1, ?)').run(JSON.stringify(data.about))

    // Stats
    db.prepare('DELETE FROM stats').run()
    const insertStat = db.prepare('INSERT INTO stats (value, label, icon, color, sort_order) VALUES (?, ?, ?, ?, ?)')
    ;(data.stats || []).forEach((s: any, i: number) => {
      insertStat.run(s.value, s.label, s.icon, s.color, i)
    })

    // Skills
    db.prepare('DELETE FROM skills').run()
    const insertSkill = db.prepare('INSERT INTO skills (category, icon, color, technologies, sort_order) VALUES (?, ?, ?, ?, ?)')
    ;(data.skills || []).forEach((s: any, i: number) => {
      insertSkill.run(s.category, s.icon, s.color, JSON.stringify(s.technologies), i)
    })

    // Projects
    db.prepare('DELETE FROM projects').run()
    const insertProject = db.prepare('INSERT INTO projects (id, title, description, image, technologies, features, github, live, type, stats, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    ;(data.projects || []).forEach((p: any, i: number) => {
      insertProject.run(
        p.id,
        p.title,
        p.description,
        p.image,
        JSON.stringify(p.technologies),
        JSON.stringify(p.features),
        p.github || null,
        p.live || null,
        p.type,
        JSON.stringify(p.stats),
        p.status,
        i
      )
    })

    // Testimonials
    db.prepare('DELETE FROM testimonials').run()
    const insertTestimonial = db.prepare('INSERT INTO testimonials (name, role, content, rating, image, company, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)')
    ;(data.testimonials || []).forEach((t: any, i: number) => {
      insertTestimonial.run(t.name, t.role, t.content, t.rating, t.image, t.company, i)
    })
  })

  saveAll()
}

// ─── Messages ─────────────────────────────────────────────────────

export interface MessageRow {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: string
  priority: string
  submittedAt: string
  readAt: string | null
  respondedAt: string | null
  notes: string
}

export function getAllMessages(): MessageRow[] {
  const db = getDb()
  const rows = db.prepare('SELECT id, name, email, subject, message, status, priority, submitted_at, read_at, responded_at, notes FROM messages ORDER BY submitted_at DESC').all() as Array<any>
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    email: r.email,
    subject: r.subject,
    message: r.message,
    status: r.status,
    priority: r.priority,
    submittedAt: r.submitted_at,
    readAt: r.read_at,
    respondedAt: r.responded_at,
    notes: r.notes,
  }))
}

export function addMessage(msg: { name: string; email: string; subject: string; message: string }): MessageRow {
  const db = getDb()
  const id = Date.now()
  const now = new Date().toISOString()
  db.prepare(
    'INSERT INTO messages (id, name, email, subject, message, status, priority, submitted_at, read_at, responded_at, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(id, msg.name, msg.email, msg.subject, msg.message, 'unread', 'normal', now, null, null, '')
  return {
    id,
    name: msg.name,
    email: msg.email,
    subject: msg.subject,
    message: msg.message,
    status: 'unread',
    priority: 'normal',
    submittedAt: now,
    readAt: null,
    respondedAt: null,
    notes: '',
  }
}

export function updateMessage(id: number, fields: { status?: string; priority?: string; notes?: string; readAt?: string | null; respondedAt?: string | null }) {
  const db = getDb()
  const sets: string[] = []
  const values: any[] = []

  if (fields.status !== undefined) { sets.push('status = ?'); values.push(fields.status) }
  if (fields.priority !== undefined) { sets.push('priority = ?'); values.push(fields.priority) }
  if (fields.notes !== undefined) { sets.push('notes = ?'); values.push(fields.notes) }
  if (fields.readAt !== undefined) { sets.push('read_at = ?'); values.push(fields.readAt) }
  if (fields.respondedAt !== undefined) { sets.push('responded_at = ?'); values.push(fields.respondedAt) }

  if (sets.length === 0) return

  values.push(id)
  db.prepare(`UPDATE messages SET ${sets.join(', ')} WHERE id = ?`).run(...values)
}

export function deleteMessage(id: number): boolean {
  const db = getDb()
  const result = db.prepare('DELETE FROM messages WHERE id = ?').run(id)
  return result.changes > 0
}

export function bulkUpdateMessages(messages: MessageRow[]) {
  const db = getDb()
  const upsert = db.transaction(() => {
    // Sync full list: delete all, then re-insert
    db.prepare('DELETE FROM messages').run()
    const insert = db.prepare(
      'INSERT INTO messages (id, name, email, subject, message, status, priority, submitted_at, read_at, responded_at, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    for (const m of messages) {
      insert.run(m.id, m.name, m.email, m.subject, m.message, m.status, m.priority, m.submittedAt, m.readAt, m.respondedAt, m.notes)
    }
  })
  upsert()
}

// ─── Seed from JSON ───────────────────────────────────────────────

export function seedFromJson(portfolioJson: any, messagesJson: any[]) {
  const db = getDb()

  const hasData = db.prepare('SELECT COUNT(*) as count FROM personal').get() as { count: number }
  if (hasData.count > 0) return // already seeded

  savePortfolioData(portfolioJson)

  const insertMsg = db.prepare(
    'INSERT OR IGNORE INTO messages (id, name, email, subject, message, status, priority, submitted_at, read_at, responded_at, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  )
  const seedMessages = db.transaction(() => {
    for (const m of messagesJson) {
      insertMsg.run(m.id, m.name, m.email, m.subject, m.message, m.status, m.priority, m.submittedAt, m.readAt, m.respondedAt, m.notes)
    }
  })
  seedMessages()
}
