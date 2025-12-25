import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/menuData';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminCategories = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">{categories.length} categories</p>
        <Button variant="warm">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.filter(c => c.id !== 'all').map((category) => (
          <div key={category.id} className="bg-card rounded-2xl p-6 shadow-warm-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                <span className="font-semibold text-foreground">{category.name}</span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
