import React, { useState } from 'react';

// 1. Define Strict TypeScript Interfaces
interface TrackingMilestone {
  status: 'processing' | 'shipped' | 'in_transit' | 'delivered';
  title: string;
  description: string;
  date?: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface OrderDetails {
  orderId: string;
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  milestones: TrackingMilestone[];
}

export const TrackOrderPage: React.FC = () => {
  // Form input states
  const [orderIdInput, setOrderIdInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  
  // App UI state management
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<OrderDetails | null>(null);

  // 2. Simulated Mock API Tracking Handler
  const handleTrackingLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim() || !emailInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate network request delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Mock response payload data matching the input schema
      const mockResult: OrderDetails = {
        orderId: orderIdInput.toUpperCase(),
        carrier: 'FedEx Express',
        trackingNumber: 'FX-98234-7110',
        estimatedDelivery: 'Wednesday, June 24, 2026',
        milestones: [
          { status: 'processing', title: 'Order Confirmed', description: 'Your payment was cleared and order sent to fulfillment.', date: 'June 18, 2026 - 10:30 AM', isCompleted: true, isActive: false },
          { status: 'shipped', title: 'Shipped From Facility', description: 'The parcel left our central warehouse distribution center.', date: 'June 19, 2026 - 02:15 PM', isCompleted: true, isActive: false },
          { status: 'in_transit', title: 'In Transit', description: 'Package is arriving at your local delivery sorting terminal.', date: 'In Progress', isCompleted: false, isActive: true },
          { status: 'delivered', title: 'Delivered', description: 'Handed directly to resident or secure porch dropbox destination.', isCompleted: false, isActive: false },
        ]
      };

      setOrderData(mockResult);
    } catch (err) {
      setError('Could not find an order matching that ID and email combination. Please check details and retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSearch = () => {
    setOrderData(null);
    setOrderIdInput('');
    setEmailInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Phase A: Initial Lookup Search Form */}
        {!orderData ? (
          <div className="p-8 sm:p-12">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Track Your Order</h1>
              <p className="mt-2 text-sm text-gray-500">Enter your dispatch details below to monitor shipping milestones live.</p>
            </header>

            <form onSubmit={handleTrackingLookup} className="space-y-6">
              <div>
                <label htmlFor="order-id" className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
                <input
                  id="order-id"
                  type="text"
                  required
                  placeholder="e.g. #ORD-12345"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Billing Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>

              {error && <p className="text-sm text-red-600 font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200 disabled:bg-indigo-400 cursor-pointer flex justify-center items-center"
              >
                {loading ? 'Searching Ledger...' : 'Track Package'}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 sm:p-10">
            {/* Upper Metadata Block */}
            <div className="border-b border-gray-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Order Profile Found</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">{orderData.orderId}</h2>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-gray-400 font-medium">Estimated Delivery</p>
                <p className="text-sm font-bold text-gray-800">{orderData.estimatedDelivery}</p>
              </div>
            </div>

            {/* Courier Meta Cards */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl mb-8 border border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Shipping Carrier</p>
                <p className="text-sm font-semibold text-gray-800">{orderData.carrier}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Tracking Code</p>
                <p className="text-sm font-mono font-semibold text-indigo-600 truncate">{orderData.trackingNumber}</p>
              </div>
            </div>

            {/* Step-by-Step Interactive Timeline */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200">
              {orderData!.milestones.map((milestone, idx) => (
                <div key={idx} className="relative flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 group">
                  
                  {/* Visual Node Anchor indicator */}
                  <div className={`absolute -left-[21px] mt-1.5 h-4 w-4 rounded-full border-4 bg-white transition-all duration-300 z-10 ${
                    milestone.isCompleted ? 'border-indigo-600 bg-indigo-600 shadow' : 
                    milestone.isActive ? 'border-indigo-600 animate-pulse bg-white scale-125' : 'border-gray-300'
                  }`} />

                  {/* Text Meta Fields */}
                  <div className="flex-1">
                    <h4 className={`text-base font-bold transition-colors ${milestone.isActive || milestone.isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{milestone.description}</p>
                  </div>

                  {milestone.date && (
                    <div className="text-xs font-semibold text-gray-400 whitespace-nowrap bg-gray-50 px-2.5 py-1 border border-gray-100 rounded-md self-start">
                      {milestone.date}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Return Button Footer */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleResetSearch}
                className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors bg-gray-100 hover:bg-indigo-50 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-indigo-100"
              >
                Track Another Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
