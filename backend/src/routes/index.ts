import { Router } from 'express'
import { readdirSync } from 'fs'

const PATH_ROUTER = `${__dirname}`;

const router = Router()

/**
 * 
 * @param filename index.ts item.ts
 * @returns 
 */
const cleanFilename =  (filename:string) => {
    const file = filename.split('.').shift();
    return file;
}

readdirSync(PATH_ROUTER).filter( (filename) => {
    const cleanName = cleanFilename(filename)
    if(cleanName != "index"){
        import(`./${cleanName}`).then( (moduleRouter) => {
            console.log(cleanName);
            router.use(`/${cleanName}`, moduleRouter.router);
        })
    }
})

export { router };