import { useState, useRef, useCallback } from 'react'
import './App.css'

const RUN_AWAY_RADIUS = 120
const RUN_AWAY_SPEED = 280
const BUTTON_WIDTH = 100
const BUTTON_HEIGHT = 44

function App() {
  const [saidYes, setSaidYes] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const noButtonRef = useRef(null)

  const handleMouseMove = useCallback(
    (e) => {
      if (saidYes || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      if (!isRunning && noButtonRef.current) {
        const noRect = noButtonRef.current.getBoundingClientRect()
        const btnCenterX = noRect.left - rect.left + noRect.width / 2
        const btnCenterY = noRect.top - rect.top + noRect.height / 2
        const distance = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY)
        if (distance < RUN_AWAY_RADIUS && distance > 0) {
          setNoPos({
            x: noRect.left - rect.left,
            y: noRect.top - rect.top,
          })
          setIsRunning(true)
        }
        return
      }

      if (!isRunning) return

      const btnCenterX = noPos.x + BUTTON_WIDTH / 2
      const btnCenterY = noPos.y + BUTTON_HEIGHT / 2
      const dx = mouseX - btnCenterX
      const dy = mouseY - btnCenterY
      const distance = Math.hypot(dx, dy)
      if (distance < RUN_AWAY_RADIUS && distance > 0) {
        const push = (RUN_AWAY_RADIUS - distance) / RUN_AWAY_RADIUS
        const nx = dx / distance
        const ny = dy / distance
        setNoPos((prev) => {
          const newX = prev.x - nx * RUN_AWAY_SPEED * push
          const newY = prev.y - ny * RUN_AWAY_SPEED * push
          const maxX = rect.width - BUTTON_WIDTH - 20
          const maxY = rect.height - BUTTON_HEIGHT - 20
          return {
            x: Math.max(20, Math.min(maxX, newX)),
            y: Math.max(20, Math.min(maxY, newY)),
          }
        })
      }
    },
    [noPos, saidYes, isRunning]
  )

  return (
    <div
      ref={containerRef}
      className="valentine-page"
      onMouseMove={handleMouseMove}
    >
      <div className="hearts-bg" aria-hidden="true">
        <span className="heart">♥</span>
        <span className="heart">♥</span>
        <span className="heart">♥</span>
        <span className="heart">♥</span>
        <span className="heart">♥</span>
      </div>

      {saidYes ? (
        <div className="success-card">
          <img
            src={`${import.meta.env.BASE_URL}valentine.png`}
            alt="Us"
            className="success-image"
          />
          <p className="success-text">Thanks for making my life soo much better 💕</p>
          <p className="success-sub">Happy Valentine's! I love you !! 🥹</p>
        </div>
      ) : (
        <>
          <h1 className="question">Will you be my Valentine?</h1>
          <div className="buttons">
            <button
              type="button"
              className="btn btn-yes"
              onClick={() => setSaidYes(true)}
            >
              Yes
            </button>
            {!isRunning ? (
              <button
                ref={noButtonRef}
                type="button"
                className="btn btn-no btn-no-inline"
              >
                No
              </button>
            ) : (
              <span className="buttons-spacer" aria-hidden="true" />
            )}
          </div>
          {isRunning && (
            <button
              type="button"
              className="btn btn-no btn-no-absolute"
              style={{ left: noPos.x, top: noPos.y }}
            >
              No
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default App
