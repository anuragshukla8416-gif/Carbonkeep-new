import { FastifyInstance } from 'fastify';

export default async function auditRoutes(fastify: FastifyInstance) {
  
  // Submit an audit (Videos/Images)
  fastify.post('/', {
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { hotelId, mediaUrls } = request.body as any;
      const user = request.user as any;

      // Ensure user owns the hotel
      const hotel = await fastify.prisma.hotel.findFirst({
        where: { id: hotelId, ownerId: user.id }
      });

      if (!hotel) return reply.status(403).send({ error: 'Unauthorized' });

      const audit = await fastify.prisma.audit.create({
        data: {
          hotelId,
          mediaUrls,
          status: 'PENDING'
        }
      });

      // Trigger AI Async Processing (Mocked)
      fastify.log.info(`Triggering AI processing for audit ${audit.id}`);
      
      return reply.status(201).send(audit);
    }
  });

  // Get audit results
  fastify.get('/:id', {
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { id } = request.params as any;
      const audit = await fastify.prisma.audit.findUnique({
        where: { id },
        include: { carbonMetric: true }
      });

      if (!audit) return reply.status(404).send({ error: 'Audit not found' });
      return audit;
    }
  });

  // Get interactive dashboard stats
  fastify.get('/stats/:hotelId', {
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { hotelId } = request.params as any;
      
      const metrics = await fastify.prisma.carbonMetric.findMany({
        where: { hotelId },
        orderBy: { timestamp: 'desc' },
        take: 10
      });

      return {
        metrics,
        totalSaved: metrics.reduce((acc, m) => acc + m.totalCarbonSaved, 0),
        avgEfficiency: metrics.length > 0 ? metrics[0].efficiencyPerRoom : 0
      };
    }
  });
}
