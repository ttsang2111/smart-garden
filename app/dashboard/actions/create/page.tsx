import Form from '@/app/ui/actions/create-form';
import Breadcrumbs from '@/app/ui/actions/breadcrumbs';
 
export default async function Page() { 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Actions', href: '/dashboard/actions' },
          {
            label: 'Create Action',
            href: '/dashboard/actions/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}