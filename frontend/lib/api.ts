// /lib/api.ts

const mockData = {
    summary: {
      totalOrders: 150,
      activeOrders: 25,
      pendingInvoices: 10,
      totalInventoryItems: 500,
    },
    recentOrders: [
      { orderId: "ORD001", status: "In Transit", expectedDelivery: "2023-06-15", trackingNumber: "TRK123456" },
      { orderId: "ORD002", status: "Delivered", expectedDelivery: "2023-06-10", trackingNumber: "TRK789012" },
      { orderId: "ORD003", status: "Pending", expectedDelivery: "2023-06-20", trackingNumber: "TRK345678" },
      { orderId: "ORD004", status: "In Transit", expectedDelivery: "2023-06-18", trackingNumber: "TRK901234" },
      { orderId: "ORD005", status: "Delivered", expectedDelivery: "2023-06-12", trackingNumber: "TRK567890" },
    ],
    orders: [
      { orderId: "ORD001", customer: "John Doe", date: "2024-02-20", items: 3, status: "In Transit", trackingNumber: "TRK123456" },
      { orderId: "ORD002", customer: "Jane Smith", date: "2024-02-18", items: 2, status: "Delivered", trackingNumber: "TRK789012" },
      { orderId: "ORD003", customer: "Alice Johnson", date: "2024-02-17", items: 5, status: "Pending", trackingNumber: "TRK345678" },
    ],
  };
  
  // ✅ Ensure `fetchDashboardData` is correctly exported
  export async function fetchDashboardData() {
    try {
      return mockData;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return mockData; // fallback
    }
  }
  
  // ✅ Fetch all orders
  export async function fetchOrders() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.orders), 500);
    });
  }
  
  // ✅ Fetch a single order by ID
  export async function fetchOrderById(orderId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const order = mockData.orders.find((o) => o.orderId === orderId);
        order ? resolve(order) : reject(new Error("Order not found"));
      }, 500);
    });
  }
  
  // ✅ Create a new order
  export async function createOrder(orderData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder = {
          ...orderData,
          orderId: `ORD00${mockData.orders.length + 1}`,
          date: new Date().toISOString().split("T")[0],
        };
        mockData.orders.push(newOrder);
        resolve(newOrder);
      }, 500);
    });
  }
  
  // ✅ Update an existing order
  export async function updateOrder(orderId, updatedData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orderIndex = mockData.orders.findIndex((o) => o.orderId === orderId);
        if (orderIndex === -1) return reject(new Error("Order not found"));
  
        mockData.orders[orderIndex] = { ...mockData.orders[orderIndex], ...updatedData };
        resolve(mockData.orders[orderIndex]);
      }, 500);
    });
  }
  
  // ✅ Delete an order
  export async function deleteOrder(orderId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orderIndex = mockData.orders.findIndex((o) => o.orderId === orderId);
        if (orderIndex === -1) return reject(new Error("Order not found"));
  
        mockData.orders.splice(orderIndex, 1);
        resolve({ success: true, message: "Order deleted successfully" });
      }, 500);
    });
  }