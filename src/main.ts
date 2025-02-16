import { Application } from '@cmmv/core';
import { DefaultAdapter, DefaultHTTPModule } from '@cmmv/http';
import { ViewModule } from '@cmmv/view';
import { DocsModule } from './docs.module';

Application.create({
    httpAdapter: DefaultAdapter,
    modules: [DefaultHTTPModule, ViewModule, DocsModule],
});
