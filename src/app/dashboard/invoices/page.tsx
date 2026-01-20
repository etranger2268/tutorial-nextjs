import type { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { lusitana } from '@/app/lib/fonts';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Pagination from '@/app/ui/invoices/pagination';
import Table from '@/app/ui/invoices/table';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page({ searchParams }: Props) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <PageContent searchParamsPromise={searchParams} />
      </Suspense>
    </div>
  );
}

type PageContentProps = {
  searchParamsPromise: Props['searchParams'];
};

async function PageContent({ searchParamsPromise }: PageContentProps) {
  const { query = '', page = '1' } = (await searchParamsPromise) ?? {};
  const currentPage = Number(page);
  const totalPages = await fetchInvoicesPages(query);

  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search key={query + currentPage} placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
