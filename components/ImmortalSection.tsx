'use client';

import { useState } from 'react';
import Image from 'next/image';
import './immortal-section.css';

type ImmortalSectionProps = {
  /** Path to a transparent cutout portrait, for example /assets/immortal/fajri-cutout.webp. */
  portraitSrc?: string;
};

const HEROES = [
  { name: 'Ling', role: 'Assassin', winRate: '72.4%', theme: 'ling' },
  { name: 'Joy', role: 'Assassin', winRate: '69.1%', theme: 'joy' },
  { name: 'Melissa', role: 'Marksman', winRate: '66.8%', theme: 'melissa' },
  { name: 'Yu Zhong', role: 'Fighter', winRate: '63.6%', theme: 'yuzhong' },
];

function DummyPortrait() {
  return (
    <svg
      className="imo-dummy-portrait"
      viewBox="0 0 520 720"
      role="img"
      aria-label="Ilustrasi sementara untuk placeholder foto cutout"
    >
      <defs>
        <linearGradient id="imo-hoodie" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#30233e" />
          <stop offset="0.55" stopColor="#17121f" />
          <stop offset="1" stopColor="#08070c" />
        </linearGradient>
        <linearGradient id="imo-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1c9a8" />
          <stop offset="1" stopColor="#bb806c" />
        </linearGradient>
        <filter id="imo-paper-shadow" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#ba76ff" floodOpacity="0.45" />
        </filter>
      </defs>
      <path d="M102 720 L120 548 Q133 472 200 450 L211 422 L313 414 L339 451 Q398 467 420 527 L465 720 Z" fill="url(#imo-hoodie)" stroke="#eee3ff" strokeWidth="5" strokeLinejoin="round" filter="url(#imo-paper-shadow)" />
      <path d="M190 455 Q260 520 343 452 L378 720 L145 720 Z" fill="#100d16" />
      <path d="M211 404 L211 456 Q254 493 313 449 L309 395 Z" fill="url(#imo-skin)" />
      <path d="M174 208 Q169 124 251 110 Q333 111 337 214 L321 306 Q300 356 254 357 Q206 349 185 302 Z" fill="url(#imo-skin)" stroke="#211723" strokeWidth="5" />
      <path d="M171 231 Q137 169 183 113 Q213 66 284 86 Q343 95 352 155 L336 220 L315 173 L289 144 Q249 183 192 169 L184 235 Z" fill="#17131b" stroke="#eee3ff" strokeWidth="5" strokeLinejoin="round" />
      <path d="M184 193 Q211 167 239 185 L236 218 Q208 231 188 215 Z" fill="#0b0910" stroke="#a96be4" strokeWidth="4" />
      <path d="M245 184 Q282 164 315 184 L311 214 Q278 231 249 216 Z" fill="#0b0910" stroke="#a96be4" strokeWidth="4" />
      <path d="M236 199 L250 199" stroke="#a96be4" strokeWidth="5" />
      <path d="M237 280 Q260 290 282 278" stroke="#7e4d48" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M191 462 Q152 478 119 523 L57 407 Q45 378 68 365 Q91 352 109 379 L151 432 L185 416 Z" fill="url(#imo-hoodie)" stroke="#eee3ff" strokeWidth="5" strokeLinejoin="round" />
      <path d="M70 365 Q50 351 43 333 L29 315 Q21 302 33 294 Q43 288 52 301 L65 314 L59 286 Q57 271 70 270 Q83 270 85 287 L91 311 L98 293 Q104 282 114 290 Q121 297 114 314 L101 346 Q91 364 70 365 Z" fill="url(#imo-skin)" stroke="#211723" strokeWidth="4" strokeLinejoin="round" />
      <path d="M324 462 Q369 470 397 519 L447 390 Q460 364 482 377 Q499 387 485 416 L444 536 Q425 574 390 580 L341 553 Z" fill="url(#imo-hoodie)" stroke="#eee3ff" strokeWidth="5" strokeLinejoin="round" />
      <path d="M455 387 Q473 369 490 359 L503 340 Q511 329 521 338 Q527 347 516 361 L509 371 L528 363 Q541 358 545 370 Q548 382 532 390 L511 402 Q491 415 474 407 Z" fill="url(#imo-skin)" stroke="#211723" strokeWidth="4" strokeLinejoin="round" />
      <path d="M210 476 L255 529 L301 475" fill="none" stroke="#665074" strokeWidth="5" />
      <path d="M248 512 L250 665" stroke="#3f304b" strokeWidth="4" />
      <text x="261" y="604" textAnchor="middle" fill="#b77af0" fontSize="17" fontFamily="monospace" letterSpacing="4" transform="rotate(-7 261 604)">SIDE QUEST</text>
    </svg>
  );
}

function RankProof() {
  return (
    <div className="imo-proof-art" aria-hidden="true">
      <div className="imo-proof-orbit" />
      <div className="imo-proof-crown">♛</div>
      <div className="imo-proof-stars">✦ ✧ ✦</div>
      <span className="imo-proof-rank">MYTHICAL</span>
      <strong>IMMORTAL</strong>
      <span className="imo-proof-points">✦ 1028</span>
    </div>
  );
}

export default function ImmortalSection({ portraitSrc }: ImmortalSectionProps) {
  const [proofOpen, setProofOpen] = useState(false);

  return (
    <section className="imo-section" id="immortal" aria-labelledby="imo-heading">
      <div className="imo-stage">
        <header className="imo-topline">
          <span>ACHMAT FAJRI <b>/</b> SIDE QUEST 001</span>
          <span className="imo-topline-right">CODE <i>•</i> BUILD <i>•</i> PLAY <i>•</i> REPEAT</span>
        </header>

        <div className="imo-heading-wrap">
          <p className="imo-eyebrow">AN UNOFFICIAL ADDITION TO MY CV</p>
          <h2 className="imo-heading" id="imo-heading">
            <span className="imo-heading-row"><span>IMO</span><i aria-hidden="true">&gt;</i><span className="imo-all">ALL</span></span>
            <span className="imo-prestasi">PRESTASI<span>.</span></span>
          </h2>
        </div>

        <p className="imo-margin-note imo-note-left">Some achievements<br />deserve a whole section.<br /><b>Apparently, this one too.</b> ↘</p>
        <p className="imo-margin-note imo-note-top">Game? Yes.<br />Serious? Also yes. ↗</p>
        <div className="imo-doodle imo-doodle-crown" aria-hidden="true">♛</div>
        <div className="imo-doodle imo-doodle-star" aria-hidden="true">✳</div>
        <div className="imo-doodle imo-doodle-spark" aria-hidden="true">✧</div>

        <div className="imo-portrait" aria-label={portraitSrc ? 'Foto pemain' : 'Placeholder ilustrasi foto pemain'}>
          <div className="imo-portrait-outline" />
          {portraitSrc ? (
            <Image
              src={portraitSrc}
              alt="Potret cutout pemain Mobile Legends"
              width={640}
              height={880}
              className="imo-portrait-image"
              sizes="(max-width: 760px) 88vw, 36vw"
            />
          ) : (
            <DummyPortrait />
          )}
          <span className="imo-portrait-label">MAIN CHARACTER ENERGY</span>
        </div>

        <div className="imo-rank-paper">
          <span className="imo-tape imo-tape-purple" />
          <span className="imo-paper-label">RANK ACHIEVEMENT</span>
          <RankProof />
          <div className="imo-rank-meta">
            <span>SEASON <b>32</b></span>
            <span>PEAK <b>1028 PTS</b></span>
            <span>ROLE <b>EXP LANE</b></span>
          </div>
          <button className="imo-proof-link" type="button" onClick={() => setProofOpen(true)}>
            Inspect evidence <span aria-hidden="true">↗</span>
          </button>
          <span className="imo-paper-footnote">SAMPLE DATA · REPLACE WITH REAL PROOF</span>
        </div>

        <div className="imo-stats-paper">
          <span className="imo-tape imo-tape-white" />
          <p className="imo-handwritten">“Bro really put this<br />on his CV.”</p>
          <div className="imo-stat-line"><span>WIN RATE</span><strong>68.4%</strong></div>
          <div className="imo-stat-line"><span>TOTAL MATCHES</span><strong>487</strong></div>
          <div className="imo-stat-line"><span>PEAK POINTS</span><strong>1028</strong></div>
          <span className="imo-stats-star" aria-hidden="true">✳</span>
        </div>

        <div className="imo-hero-pool">
          <div className="imo-hero-pool-heading"><span>FAVOURITE HERO POOL</span><span aria-hidden="true">✧</span></div>
          <div className="imo-hero-list">
            {HEROES.map((hero, index) => (
              <div className={`imo-hero-tile imo-${hero.theme}`} key={hero.name}>
                <div className="imo-hero-art" aria-hidden="true">
                  <span>{['L', 'J', 'M', 'YZ'][index]}</span>
                </div>
                <div className="imo-hero-label">
                  <strong>{hero.name}</strong>
                  <small>{hero.role}</small>
                  <small>{hero.winRate} WR*</small>
                </div>
              </div>
            ))}
          </div>
          <p className="imo-hero-disclaimer">*DUMMY HERO STATS · JUST FOR THE LAYOUT</p>
        </div>

        <p className="imo-side-quote">Same energy.<br />Different platform.<br /><span>Still grinding. :)</span></p>
        <div className="imo-brush-note">GAME ON.<br />CODE ON.<br />LIFE ON.</div>

        <footer className="imo-bottomline">
          <span><b>✳</b> MLBB / MYTHICAL IMMORTAL / SAMPLE SEASON</span>
          <span>NOT JUST A PLAYER. A CONSISTENT GRINDER. <i>↗</i></span>
        </footer>
      </div>

      {proofOpen && (
        <div className="imo-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setProofOpen(false);
        }}>
          <div className="imo-modal" role="dialog" aria-modal="true" aria-labelledby="imo-modal-title">
            <button className="imo-modal-close" type="button" onClick={() => setProofOpen(false)} aria-label="Close rank proof">×</button>
            <p className="imo-eyebrow">EVIDENCE A / MOCKUP</p>
            <h3 id="imo-modal-title">Proof of Immortality</h3>
            <RankProof />
            <p className="imo-modal-copy">This is a visual placeholder, not a real game record. Replace it with your own rank screenshot before publishing.</p>
            <button className="imo-proof-link" type="button" onClick={() => setProofOpen(false)}>Got it <span aria-hidden="true">↗</span></button>
          </div>
        </div>
      )}
    </section>
  );
}
