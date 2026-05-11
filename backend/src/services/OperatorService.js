// src/services/OperatorService.js

/**
 * Simulates PNR verification via major bus operator APIs (e.g., RedBus, AbhiBus, Zingbus).
 * In a real-world scenario, this would make HTTP requests to the respective operator's B2B API.
 */
class OperatorService {
  constructor() {
    this.supportedOperators = ['RedBus', 'AbhiBus', 'Zingbus', 'IntrCity', 'SRS Travels', 'VRL Travels'];
  }

  /**
   * Simulates verifying a PNR with the operator.
   * @param {string} pnr - The Booking Reference or PNR
   * @param {string} operatorName - The name of the bus operator
   * @param {object} ticketDetails - Details of the ticket (source, destination, date)
   * @returns {Promise<object>} Verification result
   */
  async verifyPNR(pnr, operatorName, ticketDetails) {
    return new Promise((resolve) => {
      // Simulate API latency (500ms to 1500ms)
      setTimeout(() => {
        // 1. Basic format validation
        if (!pnr || pnr.length < 5) {
          return resolve({ isValid: false, reason: 'INVALID_PNR_FORMAT' });
        }

        // 2. Operator matching
        const normalizedOperator = operatorName ? operatorName.toLowerCase() : '';
        const isSupported = this.supportedOperators.some(op => normalizedOperator.includes(op.toLowerCase()));
        
        // If not a recognized major operator, we still "try" to verify but it has a higher chance of manual review
        
        // 3. Simulated Business Logic for Verification
        // To make testing predictable:
        // PNRs ending in "000" are treated as cancelled by operator
        // PNRs ending in "999" are treated as fraudulent (mismatched route)
        // Everything else is considered valid.
        
        if (pnr.endsWith('000')) {
          return resolve({ isValid: false, reason: 'TICKET_CANCELLED_BY_OPERATOR' });
        }

        if (pnr.endsWith('999')) {
          return resolve({ 
            isValid: false, 
            reason: 'ROUTE_MISMATCH',
            operatorData: {
              source: 'FakeCity A',
              destination: 'FakeCity B',
              status: 'CONFIRMED'
            }
          });
        }

        // Success Case
        resolve({
          isValid: true,
          operatorData: {
            pnr: pnr,
            status: 'CONFIRMED',
            passengerName: 'VERIFIED_USER',
            source: ticketDetails.source,
            destination: ticketDetails.destination,
            travelDate: ticketDetails.travelDate,
            operator: operatorName || 'Unknown Operator'
          }
        });

      }, Math.floor(Math.random() * 1000) + 500);
    });
  }

  /**
   * Simulates fetching real-time bus tracking/status.
   */
  async getTripStatus(pnr) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'ON_TIME',
          lastLocation: 'Highway Checkpoint 4',
          estimatedDelayMinutes: 0
        });
      }, 500);
    });
  }
}

module.exports = new OperatorService();
