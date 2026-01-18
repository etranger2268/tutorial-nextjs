import { Suspense } from 'react';
import { fetchCustomers } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/create-form';

export default function CreatePage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Suspense fallback={<p>Loading...</p>}>
        <CreatePageContent />
      </Suspense>
    </main>
  );
}

async function CreatePageContent() {
  const customers = await fetchCustomers();
  return <Form customers={customers} />;
}
