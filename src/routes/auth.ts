import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default async function authRoutes(fastify: FastifyInstance) {
  
  // Registration
  fastify.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password, fullName, role } = request.body as any;
    
    // Hash password (using placeholder for now)
    const passwordHash = `hashed_${password}`; 

    try {
      const user = await fastify.prisma.user.create({
        data: {
          email,
          passwordHash,
          fullName,
          role: role || 'HOTEL_OWNER'
        }
      });

      const token = fastify.jwt.sign({ id: user.id, role: user.role, email: user.email });
      return { token, user: { id: user.id, email: user.email, role: user.role } };
    } catch (e) {
      return reply.status(400).send({ error: 'User already exists' });
    }
  });

  // Login
  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as any;
    
    const user = await fastify.prisma.user.findUnique({ where: { email } });
    
    if (!user || user.passwordHash !== `hashed_${password}`) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const token = fastify.jwt.sign({ id: user.id, role: user.role, email: user.email });
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  });

  // OTP Request (Placeholder)
  fastify.post('/otp/request', async (request) => {
    return { message: 'OTP sent to registered mobile/email' };
  });
}
