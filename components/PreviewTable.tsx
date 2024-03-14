"use client";

const PreviewTable = ({schoolsTab}: {schoolsTab: any}) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {schoolsTab ?
        schoolsTab.map((school: any) => (
          <li key={school.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{school.szkola.name}</p>
              </div>
            </div>
          </li>
        )) : ''}
    </ul>
  )
}

export default PreviewTable;
