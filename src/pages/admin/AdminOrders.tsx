import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const orders = [
  { id: 'PP12345678', customer: 'Rahul Sharma', amount: 549, payment: 'COD', status: 'Delivered', date: '25 Dec 2024' },
  { id: 'PP12345677', customer: 'Priya Patel', amount: 899, payment: 'UPI', status: 'In Transit', date: '25 Dec 2024' },
  { id: 'PP12345676', customer: 'Amit Kumar', amount: 320, payment: 'Card', status: 'Preparing', date: '25 Dec 2024' },
  { id: 'PP12345675', customer: 'Sneha Gupta', amount: 720, payment: 'COD', status: 'Delivered', date: '24 Dec 2024' },
  { id: 'PP12345674', customer: 'Vikram Singh', amount: 450, payment: 'UPI', status: 'Cancelled', date: '24 Dec 2024' },
];

const AdminOrders = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-fresh/10 text-green-fresh';
      case 'In Transit': return 'bg-primary/10 text-primary';
      case 'Preparing': return 'bg-gold/10 text-gold';
      case 'Cancelled': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <AdminLayout>
      <div className="bg-card rounded-2xl shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Order ID</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Payment</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                  <td className="px-6 py-4 text-foreground">{order.customer}</td>
                  <td className="px-6 py-4 text-foreground">₹{order.amount}</td>
                  <td className="px-6 py-4 text-foreground">{order.payment}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
