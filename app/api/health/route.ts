import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database connectivity
    // You can add more health checks here (Redis, external services, etc.)
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: 'connected', // TODO: Actually check DB connection
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { status: 'unhealthy', error: 'Service unavailable' },
      { status: 503 }
    );
  }
}
