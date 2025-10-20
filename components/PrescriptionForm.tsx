import React from 'react';
import { Medicine } from '../types';
import MedicineInputRow from './MedicineInputRow';
import PlusIcon from './icons/PlusIcon';

interface PrescriptionFormProps {
  bp: string;
  weight: string;
  notes: string;
  medicines: Medicine[];
  onVitalsChange: (field: 'bp' | 'weight', value: string) => void;
  onNotesChange: (value: string) => void;
  onMedicineChange: (index: number, field: keyof Omit<Medicine, 'id'>, value: string) => void;
  onAddMedicine: () => void;
  onRemoveMedicine: (id: string) => void;
  isPdfMode?: boolean;
}

const PrescriptionForm: React.ForwardRefRenderFunction<HTMLDivElement, PrescriptionFormProps> = (
  {
    bp,
    weight,
    notes,
    medicines,
    onVitalsChange,
    onNotesChange,
    onMedicineChange,
    onAddMedicine,
    onRemoveMedicine,
    isPdfMode = false,
  },
  ref
) => {
  const inputStyles = "w-full p-2 bg-gray-100 text-gray-800 placeholder-gray-400 rounded-md border border-gray-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none transition";

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto" ref={ref}>
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-200 pb-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Dr. Syed Meraj Hassan</h1>
        </div>
        <div className="text-right text-slate-600 text-sm">
          <p className="font-semibold">Branch 1: Healths Pharma, Central Street, Hindpiri, Ranchi</p>
          <p className="font-semibold">Branch 2: Sarwar Medical Hall, Lohardagga</p>
          <p>Mobile: 7004219545</p>
        </div>
      </div>
      
      {/* Vitals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-1">Blood Pressure (BP)</label>
          {isPdfMode ? (
            <div className="text-slate-800">{bp}</div>
          ) : (
            <input
              type="text"
              placeholder="e.g., 120/80 mmHg"
              value={bp}
              onChange={(e) => onVitalsChange('bp', e.target.value)}
              className={inputStyles}
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-1">Weight</label>
           {isPdfMode ? (
            <div className="text-slate-800">{weight}</div>
          ) : (
            <input
              type="text"
              placeholder="e.g., 70 kg"
              value={weight}
              onChange={(e) => onVitalsChange('weight', e.target.value)}
              className={inputStyles}
            />
          )}
        </div>
      </div>
      
      {/* Prescription Symbol and Body */}
      <div className="flex mb-8">
        <div className="text-6xl font-serif text-slate-400 mr-8 mt-4">Rx</div>
        <div className="flex-1">
          {/* Medicine Header */}
          <div className="grid grid-cols-12 gap-2 mb-2 font-semibold text-slate-600 text-sm">
            <div className="col-span-4">Medicine</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-3">Timing</div>
            <div className="col-span-3">Instruction</div>
          </div>

          {/* Medicine List */}
          <div className="space-y-3">
            {medicines.map((med, index) => (
              <MedicineInputRow
                key={med.id}
                medicine={med}
                index={index}
                onMedicineChange={onMedicineChange}
                onRemoveMedicine={onRemoveMedicine}
                isPdfMode={isPdfMode}
              />
            ))}
          </div>
          
          {/* Add Medicine Button */}
          {!isPdfMode && (
            <button
              onClick={onAddMedicine}
              className="mt-4 flex items-center text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-1" />
              Add Medicine
            </button>
          )}
        </div>
      </div>

      {/* Notes Section */}
      <div className="mt-8">
        <label className="block text-sm font-bold text-slate-600 mb-1">Other Notes</label>
        {isPdfMode ? (
            <div className={`text-slate-800`}>{notes}</div>
        ) : (
            <textarea
            rows={2}
            placeholder="e.g., Follow up after 1 week."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className={`${inputStyles} h-auto`}
            />
        )}
      </div>

      {/* Signature Section */}
      <div className="flex justify-end mt-20">
        <div className="text-center w-64">
            <div className="border-t border-dotted border-slate-500 mb-2"></div>
            <p className="font-bold text-slate-800">Dr. Syed Meraj Hassan</p>
        </div>
      </div>

    </div>
  );
};

export default React.forwardRef(PrescriptionForm);