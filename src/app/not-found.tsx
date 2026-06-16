'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState({ player: 0, cpu: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    // Game dimensions
    const width = canvas.width;
    const height = canvas.height;

    // Paddle settings
    const paddleWidth = 12;
    const paddleHeight = 80;
    const paddleSpeed = 5;

    // Ball settings
    const ballSize = 12;
    let ballX = width / 2;
    let ballY = height / 2;
    let ballSpeedX = 5;
    let ballSpeedY = 3;

    // Paddle positions
    let playerY = height / 2 - paddleHeight / 2;
    let cpuY = height / 2 - paddleHeight / 2;

    // Mouse/touch position
    let targetY = playerY;

    // Score
    let playerScore = 0;
    let cpuScore = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetY = e.clientY - rect.top - paddleHeight / 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      targetY = e.touches[0].clientY - rect.top - paddleHeight / 2;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    let animationId: number;

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#006769';
      ctx.fillRect(0, 0, width, height);

      // Draw center line
      ctx.setLineDash([10, 10]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw court boundaries
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, width - 4, height - 4);

      // Update player paddle (smooth follow)
      const diff = targetY - playerY;
      playerY += diff * 0.15;
      playerY = Math.max(0, Math.min(height - paddleHeight, playerY));

      // Update CPU paddle (AI)
      const cpuCenter = cpuY + paddleHeight / 2;
      const cpuTarget = ballY;
      if (cpuCenter < cpuTarget - 20) {
        cpuY += paddleSpeed * 0.7;
      } else if (cpuCenter > cpuTarget + 20) {
        cpuY -= paddleSpeed * 0.7;
      }
      cpuY = Math.max(0, Math.min(height - paddleHeight, cpuY));

      // Update ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Ball collision with top/bottom
      if (ballY <= 0 || ballY >= height - ballSize) {
        ballSpeedY = -ballSpeedY;
        ballY = ballY <= 0 ? 0 : height - ballSize;
      }

      // Ball collision with player paddle
      if (
        ballX <= 30 + paddleWidth &&
        ballX >= 30 &&
        ballY + ballSize >= playerY &&
        ballY <= playerY + paddleHeight
      ) {
        ballSpeedX = Math.abs(ballSpeedX) * 1.05;
        const hitPos = (ballY - playerY) / paddleHeight;
        ballSpeedY = (hitPos - 0.5) * 10;
        ballX = 30 + paddleWidth;
      }

      // Ball collision with CPU paddle
      if (
        ballX + ballSize >= width - 30 - paddleWidth &&
        ballX + ballSize <= width - 30 &&
        ballY + ballSize >= cpuY &&
        ballY <= cpuY + paddleHeight
      ) {
        ballSpeedX = -Math.abs(ballSpeedX) * 1.05;
        const hitPos = (ballY - cpuY) / paddleHeight;
        ballSpeedY = (hitPos - 0.5) * 10;
        ballX = width - 30 - paddleWidth - ballSize;
      }

      // Score
      if (ballX < 0) {
        cpuScore++;
        setScore({ player: playerScore, cpu: cpuScore });
        resetBall();
      } else if (ballX > width) {
        playerScore++;
        setScore({ player: playerScore, cpu: cpuScore });
        resetBall();
      }

      // Check game over
      if (playerScore >= 5 || cpuScore >= 5) {
        setGameOver(true);
        setScore({ player: playerScore, cpu: cpuScore });
        return;
      }

      function resetBall() {
        ballX = width / 2;
        ballY = height / 2;
        ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 5;
        ballSpeedY = (Math.random() - 0.5) * 6;
      }

      // Draw paddles
      ctx.fillStyle = '#BFFF00';
      ctx.shadowColor = '#BFFF00';
      ctx.shadowBlur = 15;

      // Player paddle (left)
      ctx.beginPath();
      ctx.roundRect(30, playerY, paddleWidth, paddleHeight, 6);
      ctx.fill();

      // CPU paddle (right)
      ctx.beginPath();
      ctx.roundRect(width - 30 - paddleWidth, cpuY, paddleWidth, paddleHeight, 6);
      ctx.fill();

      ctx.shadowBlur = 0;

      // Draw ball (padel ball style)
      ctx.fillStyle = '#BFFF00';
      ctx.shadowColor = '#BFFF00';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(ballX + ballSize / 2, ballY + ballSize / 2, ballSize, 0, Math.PI * 2);
      ctx.fill();

      // Ball seam
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#9ACC00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ballX + ballSize / 2, ballY + ballSize / 2, ballSize * 0.7, -0.5, 1.5);
      ctx.stroke();

      // Draw scores
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = 'bold 48px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(playerScore.toString(), width / 4, 60);
      ctx.fillText(cpuScore.toString(), (width / 4) * 3, 60);

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameStarted]);

  const resetGame = () => {
    setScore({ player: 0, cpu: 0 });
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <html lang="hr">
      <body style={{ margin: 0, padding: 0 }}>
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '#006769',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '42rem', width: '100%' }}>
            {/* 404 text */}
            <h1
              style={{
                fontSize: '5rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '0.5rem',
                lineHeight: 1,
              }}
            >
              404
            </h1>

            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#BFFF00',
                marginBottom: '1rem',
              }}
            >
              Loptica je izvan terena!
            </h2>

            {!gameStarted && !gameOver && (
              <>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '1rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  Stranica ne postoji, ali možeš odigrati partiju padela dok čekaš!
                </p>

                <button
                  onClick={() => setGameStarted(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem 2rem',
                    fontSize: '1.125rem',
                    borderRadius: '9999px',
                    fontWeight: '600',
                    backgroundColor: '#BFFF00',
                    color: '#004d4d',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                  }}
                >
                  🎾 Igraj Padel Pong
                </button>

                <div style={{ marginTop: '1rem' }}>
                  <Link
                    href="/"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'underline',
                      fontSize: '0.875rem',
                    }}
                  >
                    ili se vrati na početnu
                  </Link>
                </div>
              </>
            )}

            {(gameStarted || gameOver) && (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    color: 'white',
                  }}
                >
                  <span>Ti: {score.player}</span>
                  <span>CPU: {score.cpu}</span>
                </div>

                {!gameOver && (
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    style={{
                      borderRadius: '12px',
                      maxWidth: '100%',
                      touchAction: 'none',
                      cursor: 'none',
                    }}
                  />
                )}

                {gameOver && (
                  <div style={{ marginTop: '2rem' }}>
                    <h3
                      style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: score.player >= 5 ? '#BFFF00' : 'white',
                        marginBottom: '1rem',
                      }}
                    >
                      {score.player >= 5 ? '🏆 Pobjeda!' : '😢 Izgubio si!'}
                    </h3>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <button
                        onClick={resetGame}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '1rem 2rem',
                          fontSize: '1.125rem',
                          borderRadius: '9999px',
                          fontWeight: '600',
                          backgroundColor: '#BFFF00',
                          color: '#004d4d',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Igraj ponovo
                      </button>

                      <Link
                        href="/"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '1rem 2rem',
                          fontSize: '1rem',
                          borderRadius: '9999px',
                          fontWeight: '500',
                          border: '2px solid rgba(255,255,255,0.3)',
                          color: 'white',
                          textDecoration: 'none',
                        }}
                      >
                        Natrag na početnu
                      </Link>
                    </div>
                  </div>
                )}

                {!gameOver && (
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '0.75rem',
                      marginTop: '0.75rem',
                    }}
                  >
                    Pomiči miša gore-dolje za kontrolu • Prvi do 5 poena
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
