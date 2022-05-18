import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | csv-parse stream API example', function (hooks) {
  setupApplicationTest(hooks);

  test('it generates output when button is clicked', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/');
    const preSelector = 'pre[data-test-id="output-area"]';
    assert.dom(preSelector).hasNoText();
    await click('[data-test-id="run-example-button"]');
    assert.dom(preSelector).hasText(/record\s+\d+:/i);
    assert.dom(preSelector).includesText('root,x,0,0,root,/root,/bin/bash');
  });
});
