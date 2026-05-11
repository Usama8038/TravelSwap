// src/services/SocketService.js

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Live connection established: ${socket.id}`);

    // Join a specific room based on user ID for direct notifications
    socket.on('join_user_room', (userId) => {
      socket.join(`user_${userId}`);
      console.log(`Socket ${socket.id} joined room user_${userId}`);
    });

    // Listen for live market updates (e.g. ticket viewed, price updated)
    socket.on('ticket_viewed', (data) => {
      // Broadcast to everyone else that a ticket is hot
      socket.broadcast.emit('market_activity', {
        type: 'VIEW',
        ticketId: data.ticketId,
        message: 'Someone is currently viewing this asset'
      });
    });

    socket.on('disconnect', () => {
      console.log(`Live connection dropped: ${socket.id}`);
    });
  });
};
