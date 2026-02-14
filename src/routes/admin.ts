import { FastifyInstance } from 'fastify';

export default async function adminRoutes(fastify: FastifyInstance) {
  
  // Admin Global Stats
  fastify.get('/stats', {
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const user = request.user as any;
      if (user.role !== 'ADMIN') return reply.status(403).send({ error: 'Access denied' });

      return {
        totalHotels: 1250,
        totalVendors: 450,
        globalCarbonSaved: '4,200 Tons',
        pendingAudits: 24,
        revenueMonthly: '$84,000'
      };
    }
  });

  // Approve a Vendor
  fastify.post('/vendors/approve/:id', {
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      // Approval logic...
      return { success: true };
    }
  });
}
