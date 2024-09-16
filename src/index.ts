require('dotenv').config();

import { Application } from '@cmmv/core';
import { ExpressAdapter, ExpressModule } from '@cmmv/http';
import { ViewModule } from '@cmmv/view';
import { DocsModule } from './docs.module';

Application.create({
    httpAdapter: ExpressAdapter,
    modules: [ExpressModule, ViewModule, DocsModule],
});
