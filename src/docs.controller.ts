import * as fs from 'fs';
import * as path from 'path';

import { ServiceRegistry } from '@cmmv/core';
import { Controller, Get, Param, Response } from '@cmmv/http';
import { DocsService } from './docs.service';

const index = require('../docs/index.json');

@Controller('docs')
export class DocsController {
    constructor(private docsService: DocsService) {}

    @Get()
    async indexHandler(@Response() res) {
        return res.render('views/docs/index', {
            docs: await this.docsService.getDocsStrutucture(),
            services: ServiceRegistry.getServicesArr(),
        });
    }

    @Get(':item')
    async getDocHandler(@Param('item') item: string, @Response() res) {
        if (index[item]) this.getDoc(index[item], res);
        else res.status(404).end();
    }

    @Get(':dir/:item')
    async getDocSubdirHandler(
        @Param('dir') dir: string,
        @Param('item') item: string,
        @Response() res,
    ) {
        const fullPath = `${dir}/${item}`;

        if (index[fullPath]) this.getDoc(index[fullPath], res);
        else res.status(404).end();

        return false;
    }

    async getDoc(docFilename: string, @Response() res) {
        const file = path.resolve(docFilename);
        const data = await this.docsService.getDocsStrutucture(file);

        return res.render('views/docs/index', {
            docs: data,
            services: ServiceRegistry.getServicesArr(),
        });
    }
}
