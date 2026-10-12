import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div
        className="ui-loader term"
        role="status"
        aria-label="Getting things ready"
      >
        <div className="term-bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <div className="term-title">a-little-magic.exe</div>
        </div>

        <div className="term-body">
          <div className="line">
            <b>$</b> hello, stranger 👋
          </div>

          <div className="line muted">
            › Warming up my little corner of the internet...
          </div>

          <div className="line">
            <span className="tag ok">✓</span>
            Coffee levels: sufficient ☕
          </div>

          <div className="line">
            <span className="tag run">●</span>
            Making things look awesome
            <span className="cursor" aria-hidden="true" />
          </div>

          <div className="progress">
            <span className="fill" />
            <span className="glint" aria-hidden="true" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .ui-loader {
    width: min(340px, calc(100vw - 40px));
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55);
    overflow: hidden;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    position: relative;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco,
      Consolas, "Liberation Mono", "Courier New", monospace;
  }

  .term-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.06),
      rgba(255, 255, 255, 0.03)
    );
  }

  .term-bar .dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
  }

  .term-title {
    margin-left: auto;
    font: 700 12px/1 ui-sans-serif, system-ui;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.2px;
  }

  .term-body {
    padding: 14px 14px 16px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 12px;
    line-height: 1.7;
  }

  .line {
    margin: 8px 0;
  }

  .line b {
    color: rgba(255, 255, 255, 0.92);
  }

  .muted {
    color: rgba(255, 255, 255, 0.6);
  }

  .tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 6px;
    margin-right: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    font-weight: 800;
    font-size: 11px;
  }

  .tag.ok {
    box-shadow: 0 0 22px rgba(110, 231, 255, 0.12);
  }

  .tag.run {
    box-shadow: 0 0 22px rgba(176, 140, 255, 0.12);
  }

  .cursor {
    display: inline-block;
    width: 8px;
    height: 14px;
    margin-left: 8px;
    border-radius: 3px;
    background: linear-gradient(
      135deg,
      #C084FC,
      #B08CFF
    );
    vertical-align: middle;
    opacity: 0.65;
    animation: blink 1s steps(2, end) infinite;
  }

  .progress {
    margin-top: 14px;
    height: 8px;
    border-radius: 999px;
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.09);
  }

  .fill {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(110, 231, 255, 0),
      rgb(192, 132, 252),
      rgba(176, 140, 255, 0.55),
      rgba(110, 231, 255, 0)
    );
    transform: translateX(-70%);
    animation: flow 1.05s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  }

  .glint {
    position: absolute;
    inset: -30% -40%;
    background: linear-gradient(
      110deg,
      transparent 0%,
      rgba(255, 255, 255, 0.12) 22%,
      rgba(255, 255, 255, 0.28) 28%,
      transparent 40%
    );
    transform: translateX(-55%);
    animation: glint 1.05s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
    mix-blend-mode: screen;
  }

  @keyframes flow {
    0% {
      transform: translateX(-75%);
      opacity: 0.55;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateX(75%);
      opacity: 0.55;
    }
  }

  @keyframes glint {
    0% {
      transform: translateX(-60%);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translateX(60%);
      opacity: 0;
    }
  }

  @keyframes blink {
    0%, 100% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.85;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fill,
    .glint,
    .cursor {
      animation: none;
    }
  }
`;

export default Loader;