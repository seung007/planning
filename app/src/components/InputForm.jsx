import { useState, useRef } from 'react'

const MAX_KEYWORDS = 5

export default function InputForm() {
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [keywords, setKeywords] = useState(Array(MAX_KEYWORDS).fill(''))
  const [isDragging, setIsDragging] = useState(false)
  const fileRef = useRef(null)

  const applyImages = (fileList) => {
    const valid = Array.from(fileList).filter(f => f.type.startsWith('image/'))
    if (!valid.length) return
    setImages(prev => [...prev, ...valid])
    setPreviews(prev => [...prev, ...valid.map(f => URL.createObjectURL(f))])
  }

  const removeImage = (i) => {
    setImages(prev => prev.filter((_, idx) => idx !== i))
    setPreviews(prev => prev.filter((_, idx) => idx !== i))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    applyImages(e.dataTransfer.files)
  }

  const handleKeyword = (i, value) => {
    const next = [...keywords]
    next[i] = value
    setKeywords(next)
  }

  const handleSubmit = () => {
    console.log({
      images,
      keywords: keywords.filter(Boolean),
    })
  }

  const canSubmit = images.length > 0 && keywords.some(Boolean)

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
            {previews.length > 0 ? (
              <div className="flex flex-wrap gap-2 p-3 w-full h-full overflow-y-auto items-start content-start">
                {previews.map((src, i) => (
                  <div key={i} className="relative w-20 h-20 shrink-0">
                    <img src={src} alt={`상품 사진 ${i + 1}`} className="w-full h-full object-cover rounded-lg" />
                    <button
                      type="button"
                      className="absolute -top-1.5 -right-1.5 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow text-gray-400 hover:text-gray-600 text-xs"
                      onClick={(e) => { e.stopPropagation(); removeImage(i) }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <div className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-300 text-2xl hover:border-gray-300">
                  +
                </div>
              </div>
            ) : (
              <>
                <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4-4a3 3 0 014.243 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-400">클릭하거나 파일을 여기에 끌어다 놓으세요</p>
                <p className="text-xs text-gray-300 mt-1">JPG, PNG, WEBP · 여러 장 가능</p>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => applyImages(e.target.files)}
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
