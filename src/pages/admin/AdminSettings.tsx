import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="bg-card rounded-2xl p-6 shadow-warm-sm space-y-6">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-4">Restaurant Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Restaurant Name</label>
              <input
                type="text"
                defaultValue="PetPuja"
                className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Address</label>
              <textarea
                defaultValue="123 Food Street, Sector 18, Noida, UP - 201301"
                className="w-full h-24 px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="hello@petpuja.com"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Logo</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Click to upload logo</p>
              </div>
            </div>
          </div>

          <Button variant="warm" size="lg">Save Changes</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
