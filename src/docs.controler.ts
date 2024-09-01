import * as fs from 'fs';
import * as path from "path";

import { Controller, Get, Param, Response, Request } from '@cmmv/http';
import { DocsService } from './docs.service';

@Controller("docs")
export class DocsController {
    constructor(private docsService: DocsService){}

	@Get()
	async index(@Response() res) {		
		return res.render("views/docs.html", {
			nonce: res.locals.nonce,
			...await this.docsService.getDocsStrutucture()
		});
	}

	@Get("json")
	async indexJson(@Request() req, @Response() res) {
		return await this.docsService.getDocsStrutucture();
	}

	@Get("/:item")
	async getDoc(@Param("item") item: string, @Response() res) {
		const file = path.resolve("./docs/" + item);
		return await this.docsService.getDocsStrutucture(file);
	}
}