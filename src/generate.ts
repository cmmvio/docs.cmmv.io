import * as fs from "fs";
import * as path from "path";
import * as MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { glob } from "glob";

class GenerateDocs {
    async convertMarkdownToHTML(){
        hljs.registerLanguage('ts', require('highlight.js/lib/languages/typescript'));

        const markdown = MarkdownIt({
            html: true,
            linkify: true,
            breaks: true,
            typographer: true,
            highlight: (str, lang) => {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return (
                            '<pre><code class="hljs language-' + lang + '" lang="' + lang + '">' +
                            hljs.highlight(str, { language: lang }).value + 
                            '</code></pre>'
                        );
                    } catch (__) {}
                }

                return (
                    `<pre><code class="hljs">${markdown.utils.escapeHtml(str)}</code></pre>`
                );
            }
        });
    
        const docsFiles = await glob(['./docs/**/*.md', './docs/*.md', './packages/**/*.md']);
    
        for(let file of docsFiles){
            if(!file.includes("README") && !file.includes("node_modules")){
                const content = await fs.readFileSync(path.resolve(file), "utf8");
                let rendered = await markdown.render(content);
                rendered = this.fixLinks(rendered);
                rendered = this.addAnchorLinks(rendered);
                await fs.writeFileSync(file.replace(".md", ".html"), rendered, "utf8");
            }
        } 
    }

    async generateIndex(){
        const docsFiles = await glob(['./docs/**/*.html', './docs/*.html', './packages/**/*.html']);
        let index = {};

        for(let file of docsFiles){
            if(!file.includes("README") && !file.includes("node_modules")){
                const pathFile = encodeURIComponent(file.replace(process.cwd(), "").replace("docs/", "").replace(/\\/g, "/"));
                index[this.convertLinkToCleanURL(pathFile)] = "./" + file.replace(process.cwd() + "/", "");
            }
        }

        await fs.writeFileSync("docs/index.json", JSON.stringify(index, null, 4));
    }

    convertLinkToCleanURL(link: string): string {
        const decodedLink = decodeURIComponent(link);  
        const pathParts = decodedLink.split('/');  
    
        const cleanPathParts = pathParts.map(part => {
            const cleanPart = part            
                .replace(".html","")
                .replace(/\d+\s*-\s*/g, '')  
                .replace(/\s+/g, '-')      
                .replace(/[^\w\-]+/g, '')    
                .toLowerCase();           
    
            return cleanPart;
        });
    
        const cleanURL = cleanPathParts.filter(Boolean).join('/');  
        return cleanURL;
    }

    fixLinks(html: string): string {
        const regex = /<a([^>]*)>/gi;
        const replacement = '<a$1 target="_blank" rel="nofollow">';
        const modifiedHtml = html.replace(regex, replacement);
        return modifiedHtml;
    }

    addAnchorLinks(html: string): string {
        const headerTags = ['h1', 'h2'];
        const modifiedHtml = headerTags.reduce((html, tag) => {
        const regex = new RegExp(`(<${tag}[^>]*>)(.*?)(<\/${tag}>)`, 'gi');
        const matches = html.match(regex);
    
        if (matches) {
            matches.forEach(match => {
                const text = match.replace(/<\/?[^>]+(>|$)/g, '');
                const id = text.toLowerCase().replace(/\s/g, '-').replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                const anchorLink = `<a id="${id}" title="${text}"></a>`;
                html = html.replace(match, `${match}${anchorLink}`);
            });
        }
    
        return html;
        }, html);
    
        return modifiedHtml;
    }

    async generateAlgoliaJSON() {
        const docsFiles = await glob(['./docs/**/*.html', './docs/*.html']);
        let algoliaData = [];

        for (let file of docsFiles) {
            if (!file.includes("README") && !file.includes("node_modules")) {
                const content = await fs.readFileSync(file, "utf8");
                const pathFile = encodeURIComponent(file.replace(process.cwd(), "").replace("docs/", "").replace(/\\/g, "/"));
                const url = this.convertLinkToCleanURL(pathFile);
                const hierarchy = this.extractHierarchy(content);  
                const cleanedContent = this.cleanContentForAlgolia(content);

                algoliaData.push({
                    objectID: url,
                    url: `/${url}.html`,
                    content: cleanedContent,
                    hierarchy: hierarchy,
                    anchor: '',
                    type: 'content',
                });
            }
        }

        await fs.writeFileSync("docs/algolia.json", JSON.stringify(algoliaData, null, 4));
    }

    extractHierarchy(htmlContent: string): any {
        const hierarchy = {
            lvl0: '',
            lvl1: '',
            lvl2: '',
            lvl3: '',
            lvl4: '',
            lvl5: '',
            lvl6: ''
        };

        const lvl0Match = htmlContent.match(/<h1>(.*?)<\/h1>/);
        const lvl1Match = htmlContent.match(/<h2>(.*?)<\/h2>/);
        const lvl2Match = htmlContent.match(/<h3>(.*?)<\/h3>/);

        if (lvl0Match) hierarchy.lvl0 = lvl0Match[1];
        if (lvl1Match) hierarchy.lvl1 = lvl1Match[1];
        if (lvl2Match) hierarchy.lvl2 = lvl2Match[1];

        return hierarchy;
    }

    cleanContentForAlgolia(htmlContent: string): string {
        return htmlContent
            .replace(/<\/?[^>]+(>|$)/g, '') 
            .replace(/\s+/g, ' ')           
            .trim();                     
    }
}

(async () => {
    let generator = new GenerateDocs();
    await generator.convertMarkdownToHTML();
    await generator.generateIndex();
    await generator.generateAlgoliaJSON(); 
})();
