import { useState } from 'react';
import { saveAction } from '../lib/tracking.js';
import './CardActivity.css';
import ExplanationModal from './ExplanationModal.jsx';
import StartButtons from './StartButtons.jsx';

// Draws a random card that hasn't been drawn yet.
export function drawUnusedCard(total, drawn) {
  while (true) {
    const card = Math.floor(Math.random() * total);
    if (!drawn.includes(card)) {
      return card;
    }
  }
}

// The shared flow of the activity pages: start/explanation buttons, then one card at a time (with a
// "3 / 24" progress pill) and previous/next buttons below it. Cards are drawn in random order and remembered, so "previous" goes back
// through the same cards.
//
// - trackingName: page name for saveAction (e.g. "jokes")
// - total: number of cards
// - drawCard(turn, drawn): index of the card for a new turn; defaults to a random unused card
// - renderCard(card, turn): the card's content (rendered inside the activity layout)
// - trackingParams(turnBefore, turnAfter): params logged with getNext/getPrev; defaults to { cur: turnAfter }
// - explanation: { he, ar } paragraphs; if given, the explanation button opens it in a modal
// - startTiles: show the start/explanation buttons as big tiles
export default function CardActivity({
  trackingName,
  total,
  drawCard,
  renderCard,
  trackingParams = (turnBefore, turnAfter) => ({ cur: turnAfter }),
  explanation,
  startTiles,
}) {
  const [explanationOpen, setExplanationOpen] = useState(false);
  const [turn, setTurn] = useState(-1); // -1: not started yet
  const [drawn, setDrawn] = useState([]); // cards drawn so far, in order

  function next() {
    const nextTurn = turn + 1;
    saveAction(trackingName, 'getNext', trackingParams(turn, nextTurn));
    if (nextTurn === drawn.length) {
      const card = drawCard ? drawCard(nextTurn, drawn) : drawUnusedCard(total, drawn);
      setDrawn([...drawn, card]);
    }
    setTurn(nextTurn);
  }

  function prev() {
    const prevTurn = turn - 1;
    saveAction(trackingName, 'getPrev', trackingParams(turn, prevTurn));
    setTurn(prevTurn);
  }

  if (turn === -1) {
    return (
      <div className="activity-content rtl" id="button-and-text">
        <StartButtons onStart={next} onExplain={explanation && (() => setExplanationOpen(true))} tiles={startTiles} />
        {explanation && (
          <ExplanationModal open={explanationOpen} onClose={() => setExplanationOpen(false)} explanation={explanation} />
        )}
      </div>
    );
  }

  const isFirst = turn === 0;
  const isLast = turn === total - 1;

  return (
    <div className="activity-content rtl" id="button-and-text">
      <div className="activity-stage">
        <div className="activity-progress" dir="ltr" aria-live="polite">
          {turn + 1} / {total}
        </div>
        {/* keyed by turn so each new card fades in */}
        <div className="activity-card" key={turn}>
          {renderCard(drawn[turn], turn)}
        </div>
        <div className="activity-nav">
          {/* In RTL the first button is on the right: "previous" (invisible but keeping its place on the first card), then "next". */}
          <button
            type="button"
            className={'activity-nav__button activity-nav__prev' + (isFirst ? ' is-hidden' : '')}
            onClick={prev}
            aria-hidden={isFirst}
            tabIndex={isFirst ? -1 : undefined}
          >
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span>הקודם - <span lang="ar">السابق</span></span>
          </button>
          <button type="button" className="activity-nav__button activity-nav__next" onClick={next} disabled={isLast}>
            <span>הבא - <span lang="ar">التالي</span></span>
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
