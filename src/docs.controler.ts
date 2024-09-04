import * as fs from 'fs';
import * as path from "path";

import { Controller, Get, Param, Response, ServiceRegistry } from '@cmmv/http';
import { DocsService } from './docs.service';

@Controller("docs")
export class DocsController {
    constructor(private docsService: DocsService){}

	@Get()
	async index(@Response() res) {		
		return res.render("views/docs/index", {
			docs: await this.docsService.getDocsStrutucture(),
			services: ServiceRegistry.getServicesArr()
		});
	}

	@Get(":item")
	async getDoc(@Param("item") item: string, @Response() res) {
		const file = path.resolve("./docs/" + item + ".html");
		const data = await this.docsService.getDocsStrutucture(file);

		return res.render("views/docs/index", {
			docs: data,
			services: ServiceRegistry.getServicesArr()
		});
	}
}