import "reflect-metadata"
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { createServer, Server } from "http"
import routes from "./routes"
import dataSource from "./config/data-source"

dotenv.config()

class App {
    public port: any
    public host: any
  
    private app: express.Application
    private server: Server

    constructor() {
        this.port = process.env.PORT
        this.host = process.env.HOST
    
        this.app = this.createApp()
        this.server = this.createServer()
    }
    
    private createApp(): express.Application {
        const app = express()
        app.use(cors())
        app.use(express.json())
        app.use('/api', routes)
    
        return app
      }
    
    private createServer(): Server {
        const server = createServer(this.app)
    
        return server
    }

    public start(): void {
        // establish database connection
        dataSource
            .initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            })

        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}

const app = new App()
app.start()
