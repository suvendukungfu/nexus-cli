import si from 'systeminformation';

/**
 * System Service: Hardware and OS metrics.
 */
export class SystemService {
  async getMetrics() {
    return {
      os: await si.osInfo(),
      cpu: await si.cpu(),
      mem: await si.mem(),
      disk: await si.fsSize(),
    };
  }
}
