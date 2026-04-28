import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildCodePath,
  isAllowedCodePath,
} from '../src/services/repo-resource/common.js';

test('code allowlist accepts only delta system resource layout under systems/delta', () => {
  assert.equal(isAllowedCodePath('systems/delta/docs/00_delta_index.md'), true);
  assert.equal(
    buildCodePath('systems/delta/operations/active_operations.md'),
    'systems/delta/operations/active_operations.md'
  );

  assert.equal(isAllowedCodePath('systems/other/docs/index.md'), false);
  assert.equal(isAllowedCodePath('systems/delta/../secret.md'), false);
  assert.equal(isAllowedCodePath('docs/10_repo_resource_api.md'), false);
  assert.equal(isAllowedCodePath('notes/04_operations/active_operations.md'), false);
});
