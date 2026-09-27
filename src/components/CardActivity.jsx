import { useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import { saveAction } from '../lib/tracking.js';
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

function CircleButton({ direction, onClick, invisible }) {
  return (
    <a className={invisible ? 'circle-button invisible' : 'circle-button'} onClick={onClick} role="button">
      <span className={`glyphicon glyphicon glyphicon-chevron-${direction} my-activity-button-single`}></span>
    </a>
  );
}

// The shared flow of the activity pages: start/explanation buttons, then one card at a time with
// previous/next buttons. Cards are drawn in random order and remembered, so "previous" goes back
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
  const smallScreen = useMediaQuery('(max-width: 600px)');

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

  const card = renderCard(drawn[turn], turn);
  const nextButton = <CircleButton direction="left" onClick={next} invisible={turn === total - 1} />;
  // On the first card there's no "previous": hidden on small screens, an invisible placeholder otherwise.
  const prevButton = turn === 0 && smallScreen ? null : <CircleButton direction="right" onClick={prev} invisible={turn === 0} />;

  return (
    <div className="activity-content rtl" id="button-and-text">
      {smallScreen ? (
        <>
          <div className="row">{card}</div>
          <div className="row">
            {prevButton}
            {nextButton}
          </div>
        </>
      ) : (
        <>
          {prevButton}
          {card}
          {nextButton}
        </>
      )}
    </div>
  );
}
