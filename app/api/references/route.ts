import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const DATA_FILE = path.join(process.cwd(), 'data', 'references.json')

interface Reference {
  id: string
  title: string
  url: string
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    try {
      await fs.mkdir(dataDir, { recursive: true })
      console.log('Created data directory:', dataDir)
    } catch (error) {
      console.error('Failed to create data directory:', error)
    }
  }
}

// Read references from JSON file
async function readReferences(): Promise<Reference[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.log('No references file found, returning empty array')
    // If file doesn't exist, return empty array and create file
    const emptyData: Reference[] = []
    try {
      await writeReferences(emptyData)
    } catch (writeError) {
      console.error('Failed to create empty references file:', writeError)
    }
    return emptyData
  }
}

// Write references to JSON file
async function writeReferences(references: Reference[]) {
  try {
    await ensureDataDir()
    await fs.writeFile(DATA_FILE, JSON.stringify(references, null, 2), 'utf8')
    console.log('Successfully wrote references to file')
  } catch (error) {
    console.error('Failed to write references file:', error)
    throw error
  }
}

// GET - Get all references
export async function GET() {
  try {
    const references = await readReferences()
    return NextResponse.json(references)
  } catch (error) {
    console.error('Error reading references:', error)
    return NextResponse.json(
      { error: 'Failed to read references', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// POST - Create new reference
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, url } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const references = await readReferences()
    const newReference: Reference = {
      id: uuidv4(),
      title,
      url: url || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    references.push(newReference)
    await writeReferences(references)

    return NextResponse.json(newReference, { status: 201 })
  } catch (error) {
    console.error('Error creating reference:', error)
    return NextResponse.json(
      { error: 'Failed to create reference', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}