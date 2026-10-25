import test from 'node:test';
import assert from 'node:assert/strict';
import { dateInZone, eventsForYear, eventsOnDate, moodForDate, moods, nepaliEvents, usEvents } from '../src/lib/calendar.ts';
import { applyDecision, flipMemoryCard, launchOutcome, launchRounds, newMemoryGame } from '../src/lib/arcade.ts';

test('all eleven federal holidays match the published 2026 OPM observed schedule', () => {
  const events = usEvents(2026).filter(event => event.kind === 'Federal holiday');
  const actual = events.filter(event => !event.observed);
  assert.equal(actual.length, 11);
  const observed = actual.map(event => events.find(item => item.id === `${event.id}-observed`)?.date ?? event.date);
  assert.deepEqual(observed, ['2026-01-01', '2026-01-19', '2026-02-16', '2026-05-25', '2026-06-19', '2026-07-03', '2026-09-07', '2026-10-12', '2026-11-11', '2026-11-26', '2026-12-25']);
  assert.equal(actual.find(event => event.id === 'independence-2026').date, '2026-07-04');
});

test('weekend observances work across years and Thanksgiving stays on the fourth Thursday', () => {
  assert.ok(eventsOnDate('2027-12-31').some(event => event.id === 'new-year-2028-observed'));
  assert.equal(usEvents(2027).find(event => event.id === 'independence-2027-observed').date, '2027-07-05');
  assert.equal(usEvents(2027).find(event => event.id === 'thanksgiving-2027').date, '2027-11-25');
  for (let year = 2026; year <= 2036; year++) {
    const thanksgiving = usEvents(year).find(event => event.id === `thanksgiving-${year}`);
    const date = new Date(`${thanksgiving.date}T12:00:00Z`);
    assert.equal(date.getUTCDay(), 4);
    assert.ok(date.getUTCDate() >= 22 && date.getUTCDate() <= 28);
    assert.equal(new Set(eventsForYear(year).map(event => event.id)).size, eventsForYear(year).length);
  }
});

test('the automatic theme changes at Kathmandu midnight rather than UTC midnight', () => {
  assert.equal(dateInZone(new Date('2026-07-03T18:14:59Z')), '2026-07-03');
  assert.equal(dateInZone(new Date('2026-07-03T18:15:00Z')), '2026-07-04');
  assert.equal(moodForDate(dateInZone(new Date('2026-07-03T18:15:00Z'))), 'independence');
  assert.equal(dateInZone(new Date('2026-07-03T18:15:00Z'), 'America/New_York'), '2026-07-03');
});

test('major US celebrations have distinct themes, separate from observed weekdays', () => {
  const cases = { '2026-01-01': 'newyear', '2026-01-19': 'mlk', '2026-05-25': 'memorial', '2026-06-19': 'juneteenth', '2026-07-04': 'independence', '2026-09-07': 'labor', '2026-10-31': 'halloween', '2026-11-26': 'thanksgiving', '2026-12-25': 'christmas' };
  for (const [date, mood] of Object.entries(cases)) assert.equal(moodForDate(date), mood, date);
  assert.equal(moodForDate('2026-07-03'), 'monsoon');
  assert.equal(eventsOnDate('2026-10-31')[0].kind, 'Cultural day');
});

test('Nepali themes follow festival dates and respect the full Dashain period', () => {
  const cases = { '2026-04-14': 'nepalnewyear', '2026-05-01': 'buddha', '2026-09-14': 'teej', '2026-09-25': 'jatra', '2026-10-11': 'dashain', '2026-10-21': 'dashain', '2026-10-25': 'dashain', '2026-11-08': 'tihar', '2026-11-15': 'chhath', '2026-12-30': 'lhosar', '2027-03-06': 'shivaratri', '2027-03-21': 'holi', '2027-03-22': 'holi' };
  for (const [date, mood] of Object.entries(cases)) assert.equal(moodForDate(date), mood, date);
  assert.equal(moodForDate('2026-10-26'), 'autumn');
  assert.ok(eventsOnDate('2026-11-08').some(event => event.name.includes('Laxmi Puja')));
  assert.ok(eventsOnDate('2026-11-09').some(event => event.name === 'Gai Tihar'));
});

test('coinciding Nepal and US events are retained; future lunar dates are not invented', () => {
  const events = eventsOnDate('2026-11-11');
  assert.ok(events.some(event => event.id === 'tihar-bhai-2026'));
  assert.ok(events.some(event => event.id === 'veterans-2026'));
  assert.equal(eventsForYear(2028).filter(event => event.region === 'NP').length, 0);
  assert.equal(moodForDate('2028-11-08'), 'autumn');
  for (const event of nepaliEvents) {
    assert.ok(moods[event.mood], event.id);
    assert.match(event.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(!event.end || event.end >= event.date);
  }
});

test('memory decks always have six pairs, block duplicate taps, and lock mismatches', () => {
  const game = newMemoryGame(() => 0.37);
  for (let symbol = 0; symbol < 6; symbol++) assert.equal(game.deck.filter(value => value === symbol).length, 2);
  const first = flipMemoryCard(game, 0);
  assert.equal(flipMemoryCard(first, 0), first);
  assert.equal(flipMemoryCard(first, -1), first);
  assert.equal(flipMemoryCard(first, 12), first);
  const mismatch = game.deck.findIndex(value => value !== game.deck[0]);
  const openPair = flipMemoryCard(first, mismatch);
  assert.equal(openPair.moves, 1);
  assert.equal(flipMemoryCard(openPair, 5), openPair);
});

test('six correct pairs finish a memory game in six moves and cannot be counted again', () => {
  let game = newMemoryGame();
  for (let symbol = 0; symbol < 6; symbol++) {
    const indices = game.deck.flatMap((value, index) => value === symbol ? [index] : []);
    game = flipMemoryCard(flipMemoryCard(game, indices[0]), indices[1]);
  }
  assert.equal(game.moves, 6);
  assert.equal(game.matched.length, 6);
  assert.equal(flipMemoryCard(game, 0), game);
});

test('every Launch Lab path terminates with bounded scores and useful feedback', () => {
  const outcomes = new Set();
  let paths = 0;
  function explore(round, metrics) {
    if (round === launchRounds.length) { paths++; outcomes.add(launchOutcome(metrics).title); return; }
    for (const decision of launchRounds[round].options) {
      const next = applyDecision(metrics, decision);
      assert.ok(Object.values(next).every(value => Number.isFinite(value) && value >= 0 && value <= 100));
      assert.ok(decision.lesson.length > 20);
      explore(round + 1, next);
    }
  }
  explore(0, { clarity: 35, trust: 35, momentum: 45 });
  assert.equal(paths, 81);
  assert.equal(outcomes.size, 3);
});
