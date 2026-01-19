import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';

type EditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditPage({ params }: EditPageProps) {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <EditPageContent params={params} />
      </Suspense>
    </main>
  );
}

async function EditPageContent({ params }: EditPageProps) {
  const { id } = await params;
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

  if (!invoice) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </>
  );
}
