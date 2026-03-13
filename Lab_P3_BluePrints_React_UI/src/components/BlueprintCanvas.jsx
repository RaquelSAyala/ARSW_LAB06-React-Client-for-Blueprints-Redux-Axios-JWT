import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addPoint } from '../features/blueprints/blueprintsSlice'

export default function BlueprintCanvas({ points = [], width = 520, height = 360, interactive = false }) {
  const ref = useRef(null)
  const dispatch = useDispatch()

  const handleCanvasClick = (e) => {
    if (!interactive) return
    const canvas = ref.current
    const rect = canvas.getBoundingClientRect()
    const x = Math.round(e.clientX - rect.left)
    const y = Math.round(e.clientY - rect.top)
    dispatch(addPoint({ x, y }))
  }

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#0b1220'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Grid
    ctx.strokeStyle = 'rgba(148,163,184,0.15)'
    ctx.lineWidth = 1
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
    }

    if (points.length > 1) {
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 3
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
      }
      ctx.stroke()
    }

    // Points
    ctx.fillStyle = '#f59e0b'
    for (const p of points) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }, [points])

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      onClick={handleCanvasClick}
      style={{
        background: '#0b1220',
        border: '1px solid #334155',
        borderRadius: 12,
        width: '100%',
        maxWidth: width,
        cursor: interactive ? 'crosshair' : 'default',
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
      }}
    />
  )
}
