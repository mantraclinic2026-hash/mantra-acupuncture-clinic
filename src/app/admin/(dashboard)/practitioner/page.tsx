import React from 'react';
import { getPractitioner } from '@/lib/queries/site';
import { UserCheck } from 'lucide-react';
import AdminPractitionerForm from '@/components/admin/AdminPractitionerForm';

export default async function AdminPractitionerPage() {
  const practitioner = await getPractitioner();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1B3B2B] flex items-center gap-2">
          <UserCheck className="w-7 h-7 text-[#C5A059]" />
          <span>Practitioner Profile CMS</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#586962] mt-1">
          Manage Dr. Nikku Thomas profile details, BNYS/MD qualifications, bio, and photograph.
        </p>
      </div>

      <AdminPractitionerForm practitioner={practitioner} />
    </div>
  );
}
