import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import { POST } from './api/chat'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };

  return {
    base: './',
    plugins: [
      inspectAttr(),
      react(),
      {
        name: 'api-handler',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              try {
                // Read body manually as Vite doesn't parse POST bodies by default
                let body = '';
                for await (const chunk of req) {
                  body += chunk;
                }

                // Mock a Request object for the handler
                const mockReq = new Request('http://localhost/api/chat', {
                  method: 'POST',
                  headers: req.headers as any,
                  body: body
                });

                const response = await POST(mockReq);

                // Stream the response back
                res.setHeader('Content-Type', response.headers.get('Content-Type') || 'text/plain');

                const reader = response.body?.getReader();
                if (reader) {
                  while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    res.write(value);
                  }
                }
                res.end();
                return;
              } catch (error) {
                console.error('API Error:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
              }
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
