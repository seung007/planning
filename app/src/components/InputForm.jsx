import { useState, useRef } from 'react'

const MAX_KEYWORDS = 5

export default function InputForm() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [keywords, setKeywords] = useState(Array(MAX_KEYWORDS).fill(''))
  const [isDragging, setIsDragging] = useState(false)
  const fileRef = useRef(null)

  const applyImage = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    applyImage(e.dataTransfer.files[0])
  }

  const handleKeyword = (i, value) => {
    const next = [...keywords]
    next[i] = value
    setKeywords(next)
  }

  const handleSubmit = () => {
    console.log({
      image,
      keywords: keywords.filter(Boolean),
    })
  }

  const canSubmit = image && keywords.some(Boolean)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-lg p-8 space-y-7">

        <div>
          <h1 className="text-xl font-bold text-gray-900">카피 생성</h1>
          <p className="text-sm text-gray-400 mt-1">사진과 키워드를 입력하면 카피 3개를 만들어드립니다</p>
        </div>

        {/* 사진 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상품 사진
          </label>
          <div
            role="button"
            tabIndex={0}
            className={`relative border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-colors
              ${isDragging
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-gray-50'
              }`}
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="업로드한 상품 사진"
                  className="h-full w-full object-contain rounded-xl"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    setImage(null)
                    setPreview(null)
                  }}
                >
                  ✕
                </button>
              </>
            ) : (
              <>
                <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4-4a3 3 0 014.243 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-400">클릭하거나 파일을 여기에 끌어다 놓으세요</p>
                <p className="text-xs text-gray-300 mt-1">JPG, PNG, WEBP · 최대 10MB</p>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => applyImage(e.target.files?.[0])}
          />
        </div>

        {/* 키워드 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            검색 키워드
            <span className="text-gray-400 font-normal ml-1">최대 {MAX_KEYWORDS}개</span>
          </label>
          <div className="space-y-2">
            {keywords.map((kw, i) => (
              <input
                key={i}
                type="text"
                value={kw}
                placeholder={`키워드 ${i + 1}`}
                onChange={(e) => handleKeyword(i, e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-300
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-colors
            bg-blue-500 text-white hover:bg-blue-600
            disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          카피 생성
        </button>

      </div>
    </div>
  )
}
