import { AdminLayout } from '@/components/admin/AdminLayout';
import { DollarSign, ShoppingBag, Package, Users } from 'lucide-react';

const stats = [
  { label: 'Total Orders', value: '1,234', icon: ShoppingBag, change: '+12%', color: 'bg-primary' },
  { label: 'Total Revenue', value: '₹4,56,789', icon: DollarSign, change: '+8%', color: 'bg-green-fresh' },
  { label: 'Total Products', value: '48', icon: Package, change: '+3', color: 'bg-accent' },
  { label: 'Total Users', value: '5,678', icon: Users, change: '+18%', color: 'bg-gold' },
];

const recentOrders = [
  { id: 'PP12345678', customer: 'Rahul Sharma', amount: 549, status: 'Delivered', date: '25 Dec 2024' },
  { id: 'PP12345677', customer: 'Priya Patel', amount: 899, status: 'In Transit', date: '25 Dec 2024' },
  { id: 'PP12345676', customer: 'Amit Kumar', amount: 320, status: 'Preparing', date: '25 Dec 2024' },
  { id: 'PP12345675', customer: 'Sneha Gupta', amount: 720, status: 'Delivered', date: '24 Dec 2024' },
  { id: 'PP12345674', customer: 'Vikram Singh', amount: 450, status: 'Cancelled', date: '24 Dec 2024' },
];

const AdminDashboard = () => {
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
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl p-6 shadow-warm-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-green-fresh text-sm font-medium">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-2xl shadow-warm-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Order ID</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                  <td className="px-6 py-4 text-foreground">{order.customer}</td>
                  <td className="px-6 py-4 text-foreground">₹{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
