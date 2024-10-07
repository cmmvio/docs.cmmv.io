import { Module } from '@cmmv/core';

import { IndexController } from './index.controller';
import { DocsController } from './docs.controller';

export let DocsModule = new Module('docs', {
    controllers: [IndexController, DocsController],
});
