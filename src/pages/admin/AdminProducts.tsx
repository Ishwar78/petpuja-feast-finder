import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/data/menuData';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminProducts = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">{menuItems.length} products</p>
        <Button variant="warm">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="bg-card rounded-2xl shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Image</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
                  <td className="px-6 py-4 capitalize text-foreground">{item.category.replace('-', ' ')}</td>
                  <td className="px-6 py-4 text-foreground">₹{item.price}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-fresh/10 text-green-fresh">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
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

export default AdminProducts;
