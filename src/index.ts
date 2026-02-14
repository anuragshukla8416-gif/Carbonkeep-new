import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import auditRoutes from './routes/audit';
import vendorRoutes from './routes/vendor';
import adminRoutes from './routes/admin';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// Register Plugins
fastify.register(cors);
fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'supersecret-carbon-keep-key'
});

// Decorate fastify with prisma
fastify.decorate('prisma', prisma);

// Health Check
fastify.get('/health', async () => ({ status: 'CarbonKeep System Operational' }));

// Register Routes
fastify.register(authRoutes, { prefix: '/api/auth' });
fastify.register(auditRoutes, { prefix: '/api/audits' });
fastify.register(vendorRoutes, { prefix: '/api/vendors' });
fastify.register(adminRoutes, { prefix: '/api/admin' });

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('SCOPE Backend running on port 3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
