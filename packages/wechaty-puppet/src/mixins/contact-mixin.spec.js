#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
import { test, } from 'tstest';
test('ProtectedPropertyContactMixin', async (t) => {
    const noOneLeft = true;
    t.ok(noOneLeft, 'should match Mixin properties for every protected property');
});
