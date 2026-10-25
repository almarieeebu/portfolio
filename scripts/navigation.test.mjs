import assert from 'node:assert/strict';
import test from 'node:test';
import { readPortfolioLocation, panelHref } from '../src/lib/navigation.ts';

test('home survives a reload and invalid sections fall back safely', () => {
  assert.equal(readPortfolioLocation('', '').panel, 'home');
  assert.equal(readPortfolioLocation('?panel=invalid', '').panel, 'home');
  assert.equal(readPortfolioLocation(panelHref('home', null, 'overview'), '').panel, 'home');
});
test('project query links and legacy anchors retain their destination', () => {
  assert.deepEqual(readPortfolioLocation('?panel=work&study=college-enrollment&part=result', ''), {
    panel: 'work', study: 'college-enrollment', part: 'result',
  });
  assert.deepEqual(readPortfolioLocation('', '#work/basic-ed-enrollment'), {
    panel: 'work', study: 'basic-ed-enrollment', part: 'overview',
  });
  assert.equal(readPortfolioLocation('', '#what-i-do').panel, 'practice');
  assert.equal(readPortfolioLocation('?panel=about&part=invalid', '').part, 'overview');
});
