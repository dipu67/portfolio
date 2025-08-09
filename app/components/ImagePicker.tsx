'use client'

import React, { useState, useEffect } from 'react'
import { Upload, X, Image as ImageIcon, Trash2, Copy, Check, Edit2, Save } from 'lucide-react'
import { motion } from 'framer-motion'

interface ImagePickerProps {
  selectedImage?: string
  onImageSelect: (imageUrl: string) => void
  onClose: () => void
  isOpen: boolean
}

interface UploadedImage {
  name: string
  url: string
  path: string
  size?: number
  type?: string
}

export default function ImagePicker({ selectedImage, onImageSelect, onClose, isOpen }: ImagePickerProps) {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editingImage, setEditingImage] = useState<string | null>(null)
  const [newImageName, setNewImageName] = useState('')

  useEffect(() => {
    if (isOpen) {
      loadImages()
    }
  }, [isOpen])

  const loadImages = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/images')
      const data = await response.json()
      setImages(data.images || [])
    } catch (error) {
      console.error('Failed to load images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setImages(prev => [data.image, ...prev])
        setUploadProgress(100)
      } else {
        alert(data.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setIsUploading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (imageFiles.length > 0) {
      handleFileUpload(imageFiles[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const deleteImage = async (filename: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const response = await fetch(`/api/images?filename=${filename}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setImages(prev => prev.filter(img => img.path !== filename))
      } else {
        alert('Failed to delete image')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete image')
    }
  }

  const startRename = (image: UploadedImage) => {
    setEditingImage(image.path)
    // Remove timestamp prefix and extension for editing
    const nameWithoutExtension = image.name.replace(/^\d+_/, '').replace(/\.[^/.]+$/, '')
    setNewImageName(nameWithoutExtension)
  }

  const saveRename = async (oldName: string) => {
    if (!newImageName.trim()) {
      alert('Please enter a valid name')
      return
    }

    try {
      const response = await fetch('/api/images', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldName,
          newName: newImageName.trim()
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Update the images list with the new name
        setImages(prev => prev.map(img => 
          img.path === oldName 
            ? { ...img, name: data.image.name, url: data.image.url, path: data.image.path }
            : img
        ))
        setEditingImage(null)
        setNewImageName('')
      } else {
        alert(data.error || 'Failed to rename image')
      }
    } catch (error) {
      console.error('Rename error:', error)
      alert('Failed to rename image')
    }
  }

  const cancelRename = () => {
    setEditingImage(null)
    setNewImageName('')
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <ImageIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Image Manager</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragOver
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Drag and drop an image here, or click to browse
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Supports: JPG, PNG, GIF, WebP, SVG (Max: 5MB)
                </p>
              </div>
            </div>

            {isUploading && (
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-blue-600 h-2 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* Images Grid */}
        <div className="p-6 overflow-y-auto max-h-96">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading images...</span>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No images uploaded</h3>
              <p className="text-gray-600 dark:text-gray-400">Upload your first image to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={image.name}
                  className={`group relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    selectedImage === image.url
                      ? 'border-blue-500 ring-2 ring-blue-500/20'
                      : 'border-transparent hover:border-blue-300'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onImageSelect(image.url)}
                >
                  <div className="aspect-square relative">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(image.url)
                        }}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                        title="Copy URL"
                      >
                        {copiedUrl === image.url ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-white" />
                        )}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          startRename(image)
                        }}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                        title="Rename"
                      >
                        <Edit2 className="w-4 h-4 text-blue-400" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteImage(image.path)
                        }}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>

                    {/* Selected indicator */}
                    {selectedImage === image.url && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3">
                    {editingImage === image.path ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={newImageName}
                          onChange={(e) => setNewImageName(e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-500 dark:text-white"
                          placeholder="Enter new name"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              saveRename(image.path)
                            } else if (e.key === 'Escape') {
                              cancelRename()
                            }
                          }}
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => saveRename(image.path)}
                            className="flex items-center space-x-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                          >
                            <Save className="w-3 h-3" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={cancelRename}
                            className="flex items-center space-x-1 px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded transition-colors"
                          >
                            <X className="w-3 h-3" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate flex-1">
                            {image.name}
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              startRename(image)
                            }}
                            className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Rename image"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                        {image.size && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatFileSize(image.size)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {images.length} image{images.length !== 1 ? 's' : ''} available
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            {selectedImage && (
              <button
                onClick={() => {
                  onImageSelect(selectedImage)
                  onClose()
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Use Selected Image
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
