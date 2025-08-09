import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readdir, unlink, rename } from 'fs/promises'
import path from 'path'

// GET - List all uploaded images
export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public/images')
    
    // Ensure the images directory exists
    try {
      await readdir(imagesDirectory)
    } catch {
      return NextResponse.json({ images: [] })
    }

    const files = await readdir(imagesDirectory)
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    )

    const images = imageFiles.map(file => ({
      name: file,
      url: `/images/${file}`,
      path: file
    }))

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error listing images:', error)
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    )
  }
}

// POST - Upload new image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 5MB allowed.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${originalName}`
    
    const imagesDirectory = path.join(process.cwd(), 'public/images')
    const filePath = path.join(imagesDirectory, fileName)

    // Ensure directory exists
    try {
      await readdir(imagesDirectory)
    } catch {
      // Directory doesn't exist, but it should be created manually or handled by the file system
    }

    await writeFile(filePath, buffer)

    const imageInfo = {
      name: fileName,
      originalName: file.name,
      url: `/images/${fileName}`,
      path: fileName,
      size: file.size,
      type: file.type
    }

    return NextResponse.json({
      message: 'Image uploaded successfully',
      image: imageInfo
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}

// DELETE - Delete image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      )
    }

    const filePath = path.join(process.cwd(), 'public/images', filename)
    
    try {
      await unlink(filePath)
      return NextResponse.json({ message: 'Image deleted successfully' })
    } catch (error) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}

// PUT - Rename image
export async function PUT(request: NextRequest) {
  try {
    const { oldName, newName } = await request.json()

    if (!oldName || !newName) {
      return NextResponse.json(
        { error: 'Both old name and new name are required' },
        { status: 400 }
      )
    }

    // Sanitize the new name
    const sanitizedNewName = newName.replace(/[^a-zA-Z0-9.-]/g, '_')
    
    // Ensure the file extension is preserved
    const oldExtension = path.extname(oldName)
    const newNameWithExtension = sanitizedNewName.endsWith(oldExtension) 
      ? sanitizedNewName 
      : sanitizedNewName + oldExtension

    const oldPath = path.join(process.cwd(), 'public/images', oldName)
    const newPath = path.join(process.cwd(), 'public/images', newNameWithExtension)

    try {
      await rename(oldPath, newPath)
      
      const updatedImage = {
        name: newNameWithExtension,
        url: `/images/${newNameWithExtension}`,
        path: newNameWithExtension
      }

      return NextResponse.json({
        message: 'Image renamed successfully',
        image: updatedImage
      })
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to rename image. File may not exist or new name already exists.' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error renaming image:', error)
    return NextResponse.json(
      { error: 'Failed to rename image' },
      { status: 500 }
    )
  }
}
