import { Application } from "@cmmv/core";
import { ExpressAdapter, ExpressModule } from "@cmmv/http";
import { ViewModule } from "@cmmv/view";
import { ApplicationModule } from "./app.module";

Application.create({
    httpAdapter: ExpressAdapter,
    wsAdapter: null,   
    modules: [
        ExpressModule,
        ViewModule,
        ApplicationModule
    ]
});