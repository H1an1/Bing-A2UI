/**
 * 简单的 OpenAI API 代理服务器
 * 用于绕过浏览器 CORS 限制
 * 
 * 使用方法:
 * 1. 在终端运行: node proxy-server.js
 * 2. 代理服务器会在 http://localhost:3001 运行
 * 3. 前端请求会被转发到 OpenAI API
 */

const http = require('http');
const https = require('https');

const PORT = 3001;
// OpenAI API Key - 从环境变量读取
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const server = http.createServer((req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 只处理 POST 请求到 /v1/chat/completions
  if (req.method === 'POST' && req.url === '/v1/chat/completions') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      console.log('📨 Received request, forwarding to OpenAI...');
      
      const options = {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Length': Buffer.byteLength(body)
        }
      };

      const proxyReq = https.request(options, (proxyRes) => {
        console.log('📬 OpenAI response status:', proxyRes.statusCode);
        
        res.writeHead(proxyRes.statusCode, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });

        proxyRes.on('data', (chunk) => {
          res.write(chunk);
        });

        proxyRes.on('end', () => {
          res.end();
          console.log('✅ Response sent to client');
        });
      });

      proxyReq.on('error', (e) => {
        console.error('❌ Proxy error:', e.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      });

      proxyReq.write(body);
      proxyReq.end();
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log('🚀 OpenAI Proxy Server running at http://localhost:' + PORT);
  console.log('📝 Endpoints:');
  console.log('   POST /v1/chat/completions -> OpenAI API');
  console.log('');
  console.log('💡 在前端使用 http://localhost:3001 作为 API 基础地址');
});
