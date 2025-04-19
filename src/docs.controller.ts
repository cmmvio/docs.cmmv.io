import { ServiceRegistry } from '@cmmv/core';
import {
    Controller, Get, Param, Response,
    CacheControl
} from '@cmmv/http';

const index = require('../docs/index.json');
const indexLinks = require('../docs/indexLinks.json');

@Controller('docs')
export class DocsController {
    @Get()
    @CacheControl({
        maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    async indexHandler(@Response() res) {
        return res.render('views/docs/index', {
            docs: indexLinks['index'].data,
            services: ServiceRegistry.getServicesArr(),
        });
    }

    @Get(':item')
    @CacheControl({
        maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    async getDocHandler(@Param('item') item: string, @Response() res) {
        if (index[item]) this.getDoc(index[item], res, item);
        else res.code(404).end();
    }

    @Get(':dir/:item')
    @CacheControl({
        maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    async getDocSubdirHandler(
        @Param('dir') dir: string,
        @Param('item') item: string,
        @Response() res,
    ) {
        const fullPath = `${dir}/${item}`;
        if (index[fullPath]) this.getDoc(index[fullPath], res, fullPath);
        else res.code(404).end();
    }

    private getDoc(docFilename, res, fullPath) {
        let indexData = { ...indexLinks[fullPath] };
        const data = indexData.data;
        delete indexData.data;
        data.links = indexData;

        return res.render('views/docs/index', {
            docs: data,
            services: ServiceRegistry.getServicesArr(),
        });
    }
}
