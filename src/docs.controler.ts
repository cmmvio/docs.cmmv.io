import * as path from "path";
import { Controller, Get, Param, Response } from '@cmmv/http';
import { DocsService } from './docs.service';

@Controller("docs")
export class DocsController {
    constructor(
        private docsService: DocsService
    ){}

	@Get()
	async index(@Response() res) {
		return res.render('docs/index', await this.docsService.getDocsStrutucture());
	}

	@Get("/:item")
	async getDoc(@Param("item") item: string, @Response() res) {
		const file = path.resolve("./docs/" + item);
		return res.render('docs/index', await this.docsService.getDocsStrutucture(file));
	}
}