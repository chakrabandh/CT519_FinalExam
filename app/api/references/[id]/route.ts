import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

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
    return []
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

// GET - Get single reference
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const references = await readReferences()
    const reference = references.find(ref => ref.id === params.id)

    if (!reference) {
      return NextResponse.json(
        { error: 'Reference not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(reference)
  } catch (error) {
    console.error('Error reading reference:', error)
    return NextResponse.json(
      { error: 'Failed to read reference', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// PUT - Update reference
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const referenceIndex = references.findIndex(ref => ref.id === params.id)

    if (referenceIndex === -1) {
      return NextResponse.json(
        { error: 'Reference not found' },
        { status: 404 }
      )
    }

    // Update the reference
    references[referenceIndex] = {
      ...references[referenceIndex],
      title,
      url: url || '',
      updatedAt: new Date().toISOString()
    }

    await writeReferences(references)

    return NextResponse.json(references[referenceIndex])
  } catch (error) {
    console.error('Error updating reference:', error)
    return NextResponse.json(
      { error: 'Failed to update reference', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete reference
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Attempting to delete reference with ID:', params.id)
    
    const references = await readReferences()
    console.log('Current references count:', references.length)
    
    const referenceIndex = references.findIndex(ref => ref.id === params.id)
    console.log('Reference index found:', referenceIndex)

    if (referenceIndex === -1) {
      console.log('Reference not found')
      return NextResponse.json(
        { error: 'Reference not found' },
        { status: 404 }
      )
    }

    // Remove the reference
    const deletedReference = references.splice(referenceIndex, 1)[0]
    console.log('Deleted reference:', deletedReference.title)
    
    await writeReferences(references)
    console.log('Successfully updated references file')

    return NextResponse.json(deletedReference)
  } catch (error) {
    console.error('Error deleting reference:', error)
    return NextResponse.json(
      { error: 'Failed to delete reference', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}