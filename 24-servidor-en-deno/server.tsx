// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { Application, Router, Context } from "./deps.ts"

const app = new Application();
const router = new Router();
const port = 8080; 

app.use(router.routes())
app.use(router.allowedMethods());

const colorsArr: any[] = []

router.get("/", (ctx: Context) => {
    ctx.response.body = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title> Deno </title>
        </head>
        <body >
            ${ReactDOMServer.renderToString(
                <>  
                    <form action="/colors" method="POST">
                        <input type="text" name="color" placeholder="Ingresar un color" />
                        <button type="submit">Enviar</button>
                    </form>
                    <div>
                        <ul>
                            {colorsArr.map(el =>
                                <li key={el} style={{color: el}}>
                                    {el}
                                </li>
                            )}
                        </ul>
                    </div>
                </>          
            )}
        </body>
    </html>`;
});

router.post("/colors", async (ctx: Context) => {
    const body = await ctx.request.body({type: "form"});
    const value = await body.value
    colorsArr.push(value.get("color"))
    ctx.response.redirect("/")
})

await app.listen({port});
console.log(`Server escuchando en el puerto ${port}`);